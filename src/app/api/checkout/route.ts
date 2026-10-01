import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { productConfig, storeConfig } from "@/config/product";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bundleId, variantId, withBump, customerEmail } = body;

    const bundle = productConfig.bundles.find((b) => b.id === bundleId) || productConfig.bundles[1];
    const variant = productConfig.variants.find((v) => v.id === variantId) || productConfig.variants[0];

    // Construir línea de productos para Stripe
    const lineItems: Array<{
      price_data: {
        currency: string;
        product_data: {
          name: string;
          description?: string;
          images?: string[];
        };
        unit_amount: number;
      };
      quantity: number;
    }> = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${productConfig.name} (${bundle.title})`,
            description: `Variant: ${variant.name} | ${bundle.quantity} units pack`,
            images: [variant.image],
          },
          unit_amount: Math.round(bundle.totalPrice * 100),
        },
        quantity: 1,
      },
    ];

    // Si el usuario marcó el Order Bump (Garantía VIP)
    if (withBump) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: productConfig.orderBump.title,
            description: productConfig.orderBump.description,
          },
          unit_amount: Math.round(productConfig.orderBump.price * 100),
        },
        quantity: 1,
      });
    }

    const origin = req.headers.get("origin") || storeConfig.domain;

    // Crear sesión de Stripe Checkout optimizada para Post-Purchase Upsell
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail || undefined,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU"],
      },
      // Guardar el método de pago para el 1-Click Upsell post-compra
      payment_intent_data: {
        setup_future_usage: "off_session",
        metadata: {
          bundleId: bundle.id,
          variantId: variant.id,
          withBump: withBump ? "true" : "false",
          sku: variant.sku,
          cjSku: productConfig.dropshipping.cjSku,
          teemdropSku: productConfig.dropshipping.teemdropSku,
        },
      },
      metadata: {
        bundleId: bundle.id,
        variantId: variant.id,
        withBump: withBump ? "true" : "false",
        sku: variant.sku,
      },
      // Redirigir a la página de Post-Purchase Upsell con el session_id
      success_url: `${origin}/upsell?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?cancelled=true`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error("[Stripe Checkout Error]", error);
    return NextResponse.json(
      { error: "Error initiating checkout session" },
      { status: 500 }
    );
  }
}

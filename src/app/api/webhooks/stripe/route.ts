import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dispatchFulfillmentOrder } from "@/lib/dropshipping";
import { sendMetaCapiEvent } from "@/lib/tracking/capi";
import { sendKlaviyoEvent } from "@/lib/klaviyo";
import { productConfig } from "@/config/product";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: import("stripe").Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // En modo desarrollo / demo si no se ha configurado el webhook secret
      event = JSON.parse(body) as import("stripe").Stripe.Event;
    }
  } catch (err) {
    console.error("[Stripe Webhook Verification Failed]", err);
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as import("stripe").Stripe.Checkout.Session;

    const customerDetails = session.customer_details;
    const shippingDetails = session.shipping_cost ? session.customer_details : session.customer_details;
    const address = customerDetails?.address;

    // 1. Preparar Orden para Dropshipping (CJ Dropshipping / Teemdrop)
    const fulfillmentPayload = {
      orderId: session.id,
      customer: {
        fullName: customerDetails?.name || "Customer",
        email: customerDetails?.email || "",
        phone: customerDetails?.phone || "0000000000",
        addressLine1: address?.line1 || "123 Main St",
        addressLine2: address?.line2 || undefined,
        city: address?.city || "New York",
        state: address?.state || "NY",
        zipCode: address?.postal_code || "10001",
        country: address?.country || "US",
      },
      items: [
        {
          sku: session.metadata?.sku || productConfig.dropshipping.cjSku,
          name: productConfig.name,
          quantity: 1,
          price: (session.amount_total || 4999) / 100,
        },
      ],
      note: "Priority fulfillment from Store",
    };

    // Despachar a CJ / Teemdrop
    await dispatchFulfillmentOrder(fulfillmentPayload);

    // 2. Disparar Meta Conversions API (CAPI) Server-Side con atribución máxima
    await sendMetaCapiEvent({
      eventName: "Purchase",
      eventId: "pur_" + session.id,
      eventSourceUrl: session.success_url || "",
      userData: {
        email: customerDetails?.email || undefined,
        phone: customerDetails?.phone || undefined,
        firstName: customerDetails?.name?.split(" ")[0],
        lastName: customerDetails?.name?.split(" ").slice(1).join(" "),
        city: address?.city || undefined,
        state: address?.state || undefined,
        zipCode: address?.postal_code || undefined,
        country: address?.country || "us",
      },
      customData: {
        currency: (session.currency || "usd").toUpperCase(),
        value: (session.amount_total || 0) / 100,
        order_id: session.id,
        content_name: productConfig.name,
        content_ids: [productConfig.id],
        num_items: 1,
      },
    });

    // 3. Notificar a Klaviyo para confirmar orden
    if (customerDetails?.email) {
      await sendKlaviyoEvent({
        metricName: "Placed Order",
        profile: {
          email: customerDetails.email,
          phone_number: customerDetails.phone || undefined,
          first_name: customerDetails.name?.split(" ")[0],
          last_name: customerDetails.name?.split(" ").slice(1).join(" "),
        },
        properties: {
          order_id: session.id,
          total_price: (session.amount_total || 0) / 100,
          currency: "USD",
          product_name: productConfig.name,
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { productConfig } from "@/config/product";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    // 1. Recuperar la sesión inicial de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "customer"],
    });

    const paymentIntent = session.payment_intent as import("stripe").Stripe.PaymentIntent | null;

    if (!paymentIntent || !paymentIntent.payment_method) {
      return NextResponse.json(
        { error: "Payment method not found on initial order" },
        { status: 400 }
      );
    }

    const paymentMethodId =
      typeof paymentIntent.payment_method === "string"
        ? paymentIntent.payment_method
        : paymentIntent.payment_method.id;

    const customerId =
      session.customer && typeof session.customer === "string"
        ? session.customer
        : typeof session.customer === "object" && session.customer !== null
        ? session.customer.id
        : undefined;

    const upsell = productConfig.postPurchaseUpsell;

    // 2. Ejecutar cobro instantáneo de 1 Clic con el mismo método de pago guardado
    const upsellCharge = await stripe.paymentIntents.create({
      amount: Math.round(upsell.salePrice * 100), // En centavos
      currency: "usd",
      payment_method: paymentMethodId,
      customer: customerId,
      confirm: true,
      off_session: true,
      description: `Post-Purchase 1-Click Upsell: ${upsell.title} (Order Ref: ${session.id.substring(0, 10)})`,
      metadata: {
        parentSessionId: session.id,
        isUpsell: "true",
        upsellSku: upsell.sku,
        customerEmail: session.customer_details?.email || "",
      },
    });

    return NextResponse.json({
      success: true,
      upsellPaymentIntentId: upsellCharge.id,
      amountCharged: upsell.salePrice,
    });
  } catch (error) {
    console.error("[Post-Purchase Upsell Charge Error]", error);
    return NextResponse.json(
      { error: "Failed to process 1-click upsell charge" },
      { status: 500 }
    );
  }
}

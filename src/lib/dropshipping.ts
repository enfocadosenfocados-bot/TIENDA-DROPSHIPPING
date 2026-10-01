/**
 * Fulfillment Automation: Despacho automático de órdenes a CJ Dropshipping y Teemdrop
 */

export interface OrderFulfillmentPayload {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string; // e.g. "US"
  };
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  shippingMethod?: string;
  note?: string;
}

/**
 * Envia orden a CJ Dropshipping Open API v2.0
 */
export async function sendOrderToCjDropshipping(order: OrderFulfillmentPayload) {
  const cjToken = process.env.CJ_DROPSHIPPING_ACCESS_TOKEN;

  if (!cjToken) {
    console.warn("[CJ Dropshipping] Token not configured. Simulated fulfillment for order:", order.orderId);
    return { success: true, simulated: true, provider: "CJ Dropshipping" };
  }

  const cjPayload = {
    orderNumber: order.orderId,
    shippingZip: order.customer.zipCode,
    shippingCountryCode: order.customer.country || "US",
    shippingCountry: "United States",
    shippingProvince: order.customer.state,
    shippingCity: order.customer.city,
    shippingAddress: order.customer.addressLine1 + (order.customer.addressLine2 ? ` ${order.customer.addressLine2}` : ""),
    shippingCustomerName: order.customer.fullName,
    shippingPhone: order.customer.phone,
    remark: order.note || "Expedited handling requested",
    products: order.items.map((item) => ({
      sku: item.sku,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await fetch("https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrder", {
      method: "POST",
      headers: {
        "CJ-Access-Token": cjToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cjPayload),
    });

    const data = await res.json();
    return { success: data.result || res.ok, data, provider: "CJ Dropshipping" };
  } catch (error) {
    console.error("[CJ Dropshipping Error]", error);
    return { success: false, error, provider: "CJ Dropshipping" };
  }
}

/**
 * Envia orden a Teemdrop API
 */
export async function sendOrderToTeemdrop(order: OrderFulfillmentPayload) {
  const teemdropApiKey = process.env.TEEMDROP_API_KEY;

  if (!teemdropApiKey) {
    console.warn("[Teemdrop] API Key not configured. Simulated fulfillment for order:", order.orderId);
    return { success: true, simulated: true, provider: "Teemdrop" };
  }

  const teemdropPayload = {
    merchant_order_id: order.orderId,
    recipient: {
      name: order.customer.fullName,
      email: order.customer.email,
      phone: order.customer.phone,
      address_1: order.customer.addressLine1,
      address_2: order.customer.addressLine2,
      city: order.customer.city,
      state: order.customer.state,
      postal_code: order.customer.zipCode,
      country_code: order.customer.country || "US",
    },
    line_items: order.items.map((i) => ({
      sku: i.sku,
      qty: i.quantity,
      title: i.name,
    })),
  };

  try {
    const res = await fetch("https://api.teemdrop.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${teemdropApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teemdropPayload),
    });

    const data = await res.json();
    return { success: res.ok, data, provider: "Teemdrop" };
  } catch (error) {
    console.error("[Teemdrop Error]", error);
    return { success: false, error, provider: "Teemdrop" };
  }
}

/**
 * Despacho unificado: Despacha al proveedor activo configurado en .env
 */
export async function dispatchFulfillmentOrder(order: OrderFulfillmentPayload) {
  const preferredProvider = process.env.DROPSHIPPING_PROVIDER || "cj"; // "cj" | "teemdrop" | "both"

  if (preferredProvider === "teemdrop") {
    return await sendOrderToTeemdrop(order);
  } else if (preferredProvider === "both") {
    const [cjRes, tdRes] = await Promise.allSettled([
      sendOrderToCjDropshipping(order),
      sendOrderToTeemdrop(order),
    ]);
    return { cj: cjRes, teemdrop: tdRes };
  } else {
    return await sendOrderToCjDropshipping(order);
  }
}

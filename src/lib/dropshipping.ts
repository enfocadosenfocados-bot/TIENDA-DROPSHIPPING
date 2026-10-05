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

// Cache en memoria para el token de acceso de CJ Dropshipping (válido por 180 días)
let cachedCjAccessToken: string | null = null;
let cjTokenExpiresAt: number = 0;

/**
 * Obtiene el CJ-Access-Token automáticamente usando la CJ_API_KEY
 */
export async function getCjAccessToken(): Promise<string | null> {
  // 1. Si ya se pasó un token estático en las variables de entorno, usarlo directamente
  if (process.env.CJ_DROPSHIPPING_ACCESS_TOKEN) {
    return process.env.CJ_DROPSHIPPING_ACCESS_TOKEN;
  }

  // 2. Si el token en memoria sigue vigente (con 1 hora de margen de seguridad), usarlo
  if (cachedCjAccessToken && Date.now() < cjTokenExpiresAt - 3600 * 1000) {
    return cachedCjAccessToken;
  }

  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const res = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });

    const data = await res.json();
    if (data.result && data.data?.accessToken) {
      cachedCjAccessToken = data.data.accessToken;
      // Guardar tiempo de expiración (generalmente 180 días o según data.data.accessTokenExpiryDate)
      const expiryDays = 180;
      cjTokenExpiresAt = Date.now() + expiryDays * 24 * 60 * 60 * 1000;
      console.log("[CJ Dropshipping] Access Token obtenido exitosamente vía API Key.");
      return cachedCjAccessToken;
    } else {
      console.error("[CJ Dropshipping Auth Error]", data.message || data);
      return null;
    }
  } catch (err) {
    console.error("[CJ Dropshipping Auth Fetch Error]", err);
    return null;
  }
}

/**
 * Envia orden a CJ Dropshipping Open API v2.0 de manera 100% automatizada
 */
export async function sendOrderToCjDropshipping(order: OrderFulfillmentPayload) {
  const cjToken = await getCjAccessToken();

  if (!cjToken) {
    console.warn("[CJ Dropshipping] Ni CJ_API_KEY ni CJ_DROPSHIPPING_ACCESS_TOKEN configurados. Despacho simulado para orden:", order.orderId);
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
    if (data.result) {
      console.log(`[CJ Dropshipping] ¡Orden ${order.orderId} creada y despachada con éxito en CJ! CJ Order ID: ${data.data?.orderId}`);
    } else {
      console.warn(`[CJ Dropshipping Warning] La API respondió:`, data.message);
    }
    return { success: data.result || res.ok, data, provider: "CJ Dropshipping" };
  } catch (error) {
    console.error("[CJ Dropshipping Order Creation Error]", error);
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

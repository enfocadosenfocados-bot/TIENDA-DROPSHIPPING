import crypto from "crypto";

export interface UserTrackingData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  clientIp?: string;
  clientUserAgent?: string;
  fbp?: string; // Facebook browser cookie _fbp
  fbc?: string; // Facebook click ID cookie _fbc
  ttp?: string; // TikTok browser cookie
}

export interface TrackingEventPayload {
  eventName: "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase";
  eventId: string;
  eventSourceUrl: string;
  userData?: UserTrackingData;
  customData?: {
    currency?: string;
    value?: number;
    content_name?: string;
    content_category?: string;
    content_ids?: string[];
    num_items?: number;
    order_id?: string;
  };
}

function sha256(value?: string): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

/**
 * Envia evento a Meta Conversions API (CAPI) con deduplicación por eventId
 */
export async function sendMetaCapiEvent(payload: TrackingEventPayload) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn("[Meta CAPI] Pixel ID or Access Token not set in environment.");
    return { success: false, reason: "Missing credentials" };
  }

  const { userData, customData } = payload;
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const eventData = {
    event_name: payload.eventName,
    event_time: currentTimestamp,
    event_id: payload.eventId,
    event_source_url: payload.eventSourceUrl,
    action_source: "website",
    user_data: {
      em: userData?.email ? [sha256(userData.email)] : undefined,
      ph: userData?.phone ? [sha256(userData.phone)] : undefined,
      fn: userData?.firstName ? [sha256(userData.firstName)] : undefined,
      ln: userData?.lastName ? [sha256(userData.lastName)] : undefined,
      ct: userData?.city ? [sha256(userData.city)] : undefined,
      st: userData?.state ? [sha256(userData.state)] : undefined,
      zp: userData?.zipCode ? [sha256(userData.zipCode)] : undefined,
      country: userData?.country ? [sha256(userData.country)] : [sha256("us")],
      client_ip_address: userData?.clientIp,
      client_user_agent: userData?.clientUserAgent,
      fbp: userData?.fbp,
      fbc: userData?.fbc,
    },
    custom_data: customData,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [eventData],
          test_event_code: process.env.META_TEST_EVENT_CODE || undefined,
        }),
      }
    );

    const json = await response.json();
    return { success: response.ok, data: json };
  } catch (error) {
    console.error("[Meta CAPI] Error sending event:", error);
    return { success: false, error };
  }
}

/**
 * Envia evento a TikTok Events API (CAPI)
 */
export async function sendTikTokEventsApi(payload: TrackingEventPayload) {
  const pixelCode = process.env.TIKTOK_PIXEL_ID;
  const accessToken = process.env.TIKTOK_EVENTS_API_TOKEN;

  if (!pixelCode || !accessToken) {
    return { success: false, reason: "Missing TikTok credentials" };
  }

  const { userData, customData } = payload;

  const eventMap: Record<string, string> = {
    PageView: "Pageview",
    ViewContent: "ViewContent",
    AddToCart: "AddToCart",
    InitiateCheckout: "InitiateCheckout",
    Purchase: "CompletePayment",
  };

  const body = {
    event_source: "web",
    event_source_id: pixelCode,
    data: [
      {
        event: eventMap[payload.eventName] || payload.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: payload.eventId,
        user: {
          email: sha256(userData?.email),
          phone_number: sha256(userData?.phone),
          ttp: userData?.ttp,
          ip: userData?.clientIp,
          user_agent: userData?.clientUserAgent,
        },
        properties: {
          currency: customData?.currency || "USD",
          value: customData?.value,
          content_type: "product",
          content_id: customData?.content_ids?.[0],
          content_name: customData?.content_name,
        },
      },
    ],
  };

  try {
    const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Token": accessToken,
      },
      body: JSON.stringify(body),
    });
    return { success: res.ok, data: await res.json() };
  } catch (err) {
    console.error("[TikTok CAPI] Error:", err);
    return { success: false, error: err };
  }
}

/**
 * Despachador unificado CAPI que envia a Meta, TikTok y Pinterest
 */
export async function dispatchServerSideEvents(payload: TrackingEventPayload) {
  const [metaRes, ttRes] = await Promise.allSettled([
    sendMetaCapiEvent(payload),
    sendTikTokEventsApi(payload),
  ]);

  return {
    meta: metaRes.status === "fulfilled" ? metaRes.value : null,
    tiktok: ttRes.status === "fulfilled" ? ttRes.value : null,
  };
}

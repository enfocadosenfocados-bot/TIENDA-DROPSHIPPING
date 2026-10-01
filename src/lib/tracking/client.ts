"use client";

// Declaración global para TypeScript
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>, options?: Record<string, unknown>) => void;
      page: () => void;
    };
    gtag?: (...args: unknown[]) => void;
    pintrk?: (...args: unknown[]) => void;
  }
}

export function generateEventId(): string {
  return "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

export interface ClientTrackEventParams {
  eventName: "PageView" | "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase";
  eventId?: string;
  value?: number;
  currency?: string;
  contentName?: string;
  contentId?: string;
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

/**
 * Disparador unificado cliente + servidor CAPI con deduplicación perfecta
 */
export async function trackStoreEvent(params: ClientTrackEventParams) {
  const eventId = params.eventId || generateEventId();
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  // 1. DISPARO CLIENT-SIDE: Meta Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(
      "track",
      params.eventName,
      {
        value: params.value,
        currency: params.currency || "USD",
        content_name: params.contentName,
        content_ids: params.contentId ? [params.contentId] : undefined,
      },
      { eventID: eventId }
    );
  }

  // 2. DISPARO CLIENT-SIDE: TikTok Pixel
  if (typeof window !== "undefined" && window.ttq) {
    const tiktokMap: Record<string, string> = {
      ViewContent: "ViewContent",
      AddToCart: "AddToCart",
      InitiateCheckout: "InitiateCheckout",
      Purchase: "CompletePayment",
      PageView: "PageView",
    };
    window.ttq.track(
      tiktokMap[params.eventName] || params.eventName,
      {
        value: params.value,
        currency: params.currency || "USD",
        content_name: params.contentName,
        content_id: params.contentId,
      },
      { event_id: eventId }
    );
  }

  // 3. DISPARO CLIENT-SIDE: Google Ads / GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", params.eventName.toLowerCase(), {
      value: params.value,
      currency: params.currency || "USD",
      items: params.contentId ? [{ id: params.contentId, name: params.contentName }] : undefined,
    });
  }

  // 4. DISPARO CLIENT-SIDE: Pinterest Tag
  if (typeof window !== "undefined" && window.pintrk) {
    const pinMap: Record<string, string> = {
      ViewContent: "pagevisit",
      AddToCart: "addtocart",
      InitiateCheckout: "checkout",
      Purchase: "checkout",
    };
    if (pinMap[params.eventName]) {
      window.pintrk("track", pinMap[params.eventName], {
        value: params.value,
        order_quantity: 1,
        currency: params.currency || "USD",
        event_id: eventId,
      });
    }
  }

  // 5. DISPARO SERVER-SIDE: Meta & TikTok CAPI vía nuestra API Route
  try {
    fetch("/api/events/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: params.eventName,
        eventId: eventId,
        eventSourceUrl: currentUrl,
        userData: params.userData,
        customData: {
          currency: params.currency || "USD",
          value: params.value,
          content_name: params.contentName,
          content_ids: params.contentId ? [params.contentId] : undefined,
        },
      }),
      keepalive: true, // Asegura que se complete incluso si la página navega
    }).catch((err) => console.warn("[CAPI client dispatch error]", err));
  } catch (err) {
    console.warn("[CAPI fetch error]", err);
  }

  return eventId;
}

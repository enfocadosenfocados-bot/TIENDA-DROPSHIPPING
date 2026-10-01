/**
 * Integración con Klaviyo API oficial para Email Marketing y flujos automatizados de carritos abandonados
 */

export interface KlaviyoProfile {
  email: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
}

export interface KlaviyoTrackEvent {
  metricName: "Started Checkout" | "Viewed Product" | "Placed Order" | "Subscribed to List";
  profile: KlaviyoProfile;
  properties?: Record<string, unknown>;
  time?: number;
}

export async function sendKlaviyoEvent(event: KlaviyoTrackEvent) {
  const apiKey = process.env.KLAVIYO_API_KEY;

  if (!apiKey) {
    console.warn("[Klaviyo] API Key not set. Simulating event locally:", event.metricName);
    return { success: true, simulated: true };
  }

  const payload = {
    data: {
      type: "event",
      attributes: {
        metric: {
          data: {
            type: "metric",
            attributes: {
              name: event.metricName,
            },
          },
        },
        profile: {
          data: {
            type: "profile",
            attributes: {
              email: event.profile.email,
              phone_number: event.profile.phone_number,
              first_name: event.profile.first_name,
              last_name: event.profile.last_name,
            },
          },
        },
        properties: event.properties,
        time: new Date((event.time || Date.now())).toISOString(),
      },
    },
  };

  try {
    const res = await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${apiKey}`,
        "Content-Type": "application/json",
        "revision": "2024-02-15",
      },
      body: JSON.stringify(payload),
    });

    return { success: res.ok, status: res.status };
  } catch (error) {
    console.error("[Klaviyo Error]", error);
    return { success: false, error };
  }
}

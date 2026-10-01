import { NextRequest, NextResponse } from "next/server";
import { sendKlaviyoEvent, KlaviyoTrackEvent } from "@/lib/klaviyo";

export async function POST(req: NextRequest) {
  try {
    const body: KlaviyoTrackEvent = await req.json();
    if (!body.profile?.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await sendKlaviyoEvent(body);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[Klaviyo Track Route Error]", error);
    return NextResponse.json({ error: "Failed to send Klaviyo event" }, { status: 500 });
  }
}

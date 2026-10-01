import { NextRequest, NextResponse } from "next/server";
import { dispatchServerSideEvents, TrackingEventPayload } from "@/lib/tracking/capi";

export async function POST(req: NextRequest) {
  try {
    const body: TrackingEventPayload = await req.json();

    // Extraer IP del cliente de headers de proxy (Vercel, Cloudflare, etc.)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp || "127.0.0.1";
    const clientUserAgent = req.headers.get("user-agent") || "";

    // Inyectar IP y UserAgent al payload
    const enrichedPayload: TrackingEventPayload = {
      ...body,
      userData: {
        ...body.userData,
        clientIp: body.userData?.clientIp || clientIp,
        clientUserAgent: body.userData?.clientUserAgent || clientUserAgent,
      },
    };

    const results = await dispatchServerSideEvents(enrichedPayload);
    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("[CAPI Route Error]", error);
    return NextResponse.json({ success: false, error: "Internal Error" }, { status: 500 });
  }
}

"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Truck, ShieldCheck, Mail, ArrowRight, Package } from "lucide-react";
import { productConfig, storeConfig } from "@/config/product";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") || "ord_sample_98412";
  const upsellStatus = searchParams.get("upsell");

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Success Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              A confirmation receipt has been sent to your email with full order details.
            </p>
          </div>

          {upsellStatus === "accepted" && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold">
              ✓ Silk Cooling Pillowcase added to your package successfully!
            </div>
          )}

          {/* Order Details Box */}
          <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 text-xs sm:text-sm border border-gray-100">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Order Reference:</span>
              <span className="font-mono font-bold text-gray-900">{sessionId.substring(0, 16)}...</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Shipping Carrier:</span>
              <span className="font-bold text-gray-900 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-600" />
                USPS Priority Mail
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-500">Estimated Delivery:</span>
              <span className="font-bold text-emerald-600">3 - 5 Business Days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Sleep Trial:</span>
              <span className="font-bold text-gray-900">30-Night Risk-Free Active</span>
            </div>
          </div>

          {/* Tracking Callout */}
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-left space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Real-Time Shipment Tracking</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              As soon as your package is scanned at the USPS sorting facility, you will receive a tracking link via SMS/Email. You can also track it directly on our website.
            </p>
            <div className="pt-1">
              <Link
                href="/track-order"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
              >
                <span>Visit Live Order Tracking Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Support Info */}
          <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
            <p>Need help or want to modify your order address?</p>
            <p className="font-semibold text-gray-800">
              Contact us at <a href={`mailto:${storeConfig.supportEmail}`} className="text-blue-600 underline">{storeConfig.supportEmail}</a>
            </p>
          </div>

          <Link
            href="/"
            className="inline-block w-full py-3 px-4 bg-gray-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow transition"
          >
            Return to Homepage
          </Link>

        </div>

      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading confirmation...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}

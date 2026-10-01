"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Zap, Clock, ShieldCheck, Check, ArrowRight, Sparkles } from "lucide-react";
import { productConfig, storeConfig } from "@/config/product";

function UpsellContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id") || "";

  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMinutes = Math.floor(timeLeft / 60);
  const formatSeconds = (timeLeft % 60).toString().padStart(2, "0");

  const handleAcceptUpsell = async () => {
    setIsCharging(true);

    try {
      const res = await fetch("/api/checkout/upsell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/thank-you?session_id=${sessionId}&upsell=accepted`);
      } else {
        // En demo o si falta configurar secret key
        router.push(`/thank-you?session_id=${sessionId}&upsell=demo`);
      }
    } catch (err) {
      console.error(err);
      router.push(`/thank-you?session_id=${sessionId}`);
    }
  };

  const handleDecline = () => {
    router.push(`/thank-you?session_id=${sessionId}&upsell=declined`);
  };

  const upsell = productConfig.postPurchaseUpsell;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Urgent Warning Header */}
        <div className="bg-amber-500 text-white rounded-2xl p-4 shadow-lg text-center space-y-1">
          <div className="flex items-center justify-center gap-2 font-black text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4 fill-current text-yellow-200" />
            <span>WAIT! YOUR ORDER IS NOT QUITE COMPLETE...</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-amber-50">
            Do not press back or refresh. We have an exclusive one-time offer reserved for you.
          </p>
          <div className="inline-flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-full text-xs font-mono font-bold mt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Offer expires in: {formatMinutes}:{formatSeconds}</span>
          </div>
        </div>

        {/* Main Upsell Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 text-center space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Post-Purchase Exclusive &bull; 50% OFF
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
              Upgrade to the {upsell.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
              Specially contoured to fit your new DermaSpine™ Pillow. Prevents morning sleep lines, hair frizz, and regulates skin temperature.
            </p>
          </div>

          {/* Upsell Image */}
          <div className="relative aspect-video max-w-md mx-auto rounded-2xl overflow-hidden border border-gray-200 shadow-md">
            <Image
              src={upsell.image}
              alt={upsell.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 450px"
            />
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
              SAVE ${ (upsell.originalPrice - upsell.salePrice).toFixed(2) }
            </div>
          </div>

          {/* Price Callout */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-gray-400 line-through text-lg">
              ${upsell.originalPrice.toFixed(2)}
            </span>
            <span className="text-3xl sm:text-4xl font-black text-emerald-600">
              Only ${upsell.salePrice.toFixed(2)}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              50% Discount
            </span>
          </div>

          {/* Key Bullets */}
          <div className="text-left max-w-md mx-auto space-y-2 bg-gray-50 p-4 rounded-xl text-xs sm:text-sm text-gray-700 font-medium">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Pure 22-Momme Mulberry Silk</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Stays 4.5°F cooler all night to eliminate hot flashes</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Custom tailored to DermaSpine cervical contours</span>
            </div>
          </div>

          {/* ONE-CLICK BUY BUTTON */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAcceptUpsell}
              disabled={isCharging}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isCharging ? (
                <span>Adding to your order...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 fill-current" />
                  <span>YES! ADD TO MY ORDER FOR JUST ${upsell.salePrice.toFixed(2)}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>1-Click checkout. Charged directly to your card without re-entering details.</span>
            </p>

            {/* Decline Button */}
            <button
              onClick={handleDecline}
              className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors cursor-pointer pt-2"
            >
              No thanks, I will pass on this 50% discount and continue to my receipt
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function UpsellPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading offer...</div>}>
      <UpsellContent />
    </Suspense>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Zap, Copy, Check } from "lucide-react";
import { storeConfig } from "@/config/product";

export function ExitIntentModal({ onScrollToBuy }: { onScrollToBuy: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Escuchar movimiento del mouse hacia la barra superior (Desktop exit-intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        const dismissed = localStorage.getItem("exit_intent_dismissed");
        if (!dismissed) {
          setIsOpen(true);
          setHasTriggered(true);
        }
      }
    };

    // En móvil: timer de 40 segundos si el usuario no ha comprado
    const mobileTimer = setTimeout(() => {
      if (!hasTriggered && window.innerWidth < 768) {
        const dismissed = localStorage.getItem("exit_intent_dismissed");
        if (!dismissed) {
          setIsOpen(true);
          setHasTriggered(true);
        }
      }
    }, 40000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("exit_intent_dismissed", "true");
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/klaviyo/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metricName: "Subscribed to List",
          profile: { email },
          properties: { source: "Exit Intent Popup", discount_code: "SAVE10" },
        }),
      });
    } catch (err) {
      console.warn("Klaviyo sync", err);
    }

    setIsSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("SAVE10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 text-center animate-in zoom-in-95">
        
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-black uppercase px-3 py-1 rounded-full mb-3">
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>WAIT! DON&apos;T LEAVE EMPTY HANDED</span>
        </div>

        {/* Título */}
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
          Unlock an Extra <span className="text-blue-600">10% OFF</span> Right Now!
        </h3>
        
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Your cervical spine will thank you. Get instant access to our VIP secret voucher code before this tab closes.
        </p>

        {!isSubscribed ? (
          <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your best email address..."
              required
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-center"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>CLAIM MY 10% DISCOUNT CODE</span>
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-xs text-emerald-800 font-bold mb-1">
                Use this coupon code at checkout:
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl font-black text-emerald-700 tracking-wider">
                  SAVE10
                </span>
                <button
                  onClick={handleCopyCode}
                  className="bg-emerald-600 text-white p-1.5 rounded-lg text-xs hover:bg-emerald-700 transition cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                handleClose();
                onScrollToBuy();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow cursor-pointer"
            >
              Apply Discount &amp; Select Pack
            </button>
          </div>
        )}

        <p className="text-[10px] text-gray-400 mt-4">
          No spam, ever. Unsubscribe at any time with 1 click.
        </p>
      </div>
    </div>
  );
}

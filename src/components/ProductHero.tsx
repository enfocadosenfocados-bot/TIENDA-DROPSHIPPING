"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Check, Zap, Flame, Lock, ArrowRight, Sparkles } from "lucide-react";
import { productConfig, storeConfig, ProductBundle, ProductVariant } from "@/config/product";
import { trackStoreEvent } from "@/lib/tracking/client";

export function ProductHero() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(productConfig.variants[0]);
  const [selectedBundle, setSelectedBundle] = useState<ProductBundle>(productConfig.bundles[1]); // Default al paquete más popular (2x)
  const [withBump, setWithBump] = useState(true); // Pre-seleccionado para aumentar AOV
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    // Disparar eventos duales Pixel + CAPI Server-side
    await trackStoreEvent({
      eventName: "InitiateCheckout",
      value: selectedBundle.totalPrice + (withBump ? productConfig.orderBump.price : 0),
      currency: "USD",
      contentName: `${productConfig.name} - ${selectedBundle.title}`,
      contentId: selectedVariant.sku,
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bundleId: selectedBundle.id,
          variantId: selectedVariant.id,
          withBump: withBump,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout in demo mode: Configura tu STRIPE_SECRET_KEY en .env.local para procesar pagos reales.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const totalPrice = (selectedBundle.totalPrice + (withBump ? productConfig.orderBump.price : 0)).toFixed(2);
  const totalOriginalPrice = (selectedBundle.originalPrice + (withBump ? 19.99 : 0)).toFixed(2);
  const totalSavings = (parseFloat(totalOriginalPrice) - parseFloat(totalPrice)).toFixed(2);

  return (
    <section id="buy-section" className="py-6 sm:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES HD */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* Imagen Principal */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200/80 shadow-md">
              <Image
                src={productConfig.images[selectedImageIndex] || selectedVariant.image}
                alt={productConfig.name}
                fill
                priority
                className="object-cover transition-all duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>SAVE UP TO 67%</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white font-medium text-xs px-3 py-1 rounded-full">
                {selectedImageIndex + 1} / {productConfig.images.length}
              </div>
            </div>

            {/* Miniaturas de Selección */}
            <div className="grid grid-cols-4 gap-3">
              {productConfig.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImageIndex === idx
                      ? "border-blue-600 ring-2 ring-blue-600/30 shadow-md scale-95"
                      : "border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>

            {/* Garantía Visual debajo de la foto */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-900">30-Night Sleep Trial &amp; Free Returns</p>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Try it in the comfort of your home. If your neck doesn't thank you, send it back for a 100% full refund.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: CONFIGURADOR DE CONVERSIÓN */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header del Producto */}
            <div>
              {/* Badge & Social Proof */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {productConfig.badge}
                </span>
                <a href="#reviews" className="flex items-center gap-1 text-xs text-gray-600 hover:underline">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900">{productConfig.rating}</span>
                  <span>({productConfig.reviewCount} verified reviews)</span>
                </a>
              </div>

              {/* Título Principal */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {productConfig.name}
              </h1>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {productConfig.tagline}
              </p>
            </div>

            {/* Urgency Stock Bar */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center justify-between text-xs font-medium text-red-900">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
                </span>
                <span>
                  High Demand: Only <strong className="font-extrabold">{storeConfig.urgencyStockRemaining} pillows left</strong> at this discounted rate.
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-red-700 font-bold">42 viewed today</span>
            </div>

            {/* SELECCIÓN DE VARIANTE (COLOR) */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                1. Select Pillow Color: <span className="text-blue-600">{selectedVariant.name}</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {productConfig.variants.map((v) => {
                  const isSelected = selectedVariant.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-gray-300 shrink-0 shadow-inner"
                        style={{ backgroundColor: v.color }}
                      />
                      <span className="text-xs font-semibold text-gray-900 truncate">
                        {v.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELECTOR DE BUNDLES (QUANTITY BREAKS) - CLAVE DE CRO */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">
                2. Choose Your Money-Saving Pack:
              </label>
              <div className="space-y-3">
                {productConfig.bundles.map((bundle) => {
                  const isSelected = selectedBundle.id === bundle.id;
                  return (
                    <div
                      key={bundle.id}
                      onClick={() => setSelectedBundle(bundle)}
                      className={`relative rounded-2xl border-2 p-4 cursor-pointer transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/30 shadow-md ring-2 ring-blue-600/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {/* Badge flotante */}
                      {bundle.badge && (
                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                          {bundle.badge}
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          {/* Radio Indicator */}
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-gray-300 bg-white"
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>

                          <div>
                            <p className="font-extrabold text-sm sm:text-base text-gray-900">
                              {bundle.title}
                            </p>
                            <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                              ${bundle.pricePerUnit.toFixed(2)} each &bull; Save {bundle.savingsPercent}%
                            </p>
                            {bundle.freeBonus && (
                              <p className="text-[11px] text-blue-700 font-bold mt-1 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                {bundle.freeBonus}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Precios */}
                        <div className="text-right shrink-0">
                          <p className="text-lg sm:text-xl font-black text-gray-900">
                            ${bundle.totalPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-400 line-through">
                            ${bundle.originalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* PRE-PURCHASE ORDER BUMP (GARANTÍA VIP 1 AÑO) */}
            <div
              onClick={() => setWithBump(!withBump)}
              className={`p-3.5 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-start gap-3 ${
                withBump
                  ? "border-emerald-500 bg-emerald-50/50"
                  : "border-gray-200 hover:border-gray-300 bg-gray-50/40"
              }`}
            >
              <input
                type="checkbox"
                checked={withBump}
                onChange={() => {}} // Manejado por div onClick
                className="mt-1 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-gray-900">
                    ONE-TIME OFFER: {productConfig.orderBump.title}
                  </p>
                  <span className="text-xs font-black text-emerald-700">
                    +${productConfig.orderBump.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
                  {productConfig.orderBump.description}
                </p>
              </div>
            </div>

            {/* RESUMEN DE TOTAL Y BOTÓN DE CHECKOUT */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>Subtotal (You save ${totalSavings}):</span>
                <div className="text-right">
                  <span className="line-through text-gray-400 mr-2">${totalOriginalPrice}</span>
                  <span className="text-xl font-black text-gray-900">${totalPrice}</span>
                </div>
              </div>

              {/* Botón Principal de Compra */}
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white font-black text-base sm:text-lg py-4 px-6 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Preparing Secure Checkout...</span>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current text-yellow-300" />
                    <span>CLAIM 50% OFF &amp; CHECKOUT NOW</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {/* Métodos de Pago y Seguridad */}
              <div className="flex items-center justify-center gap-4 text-gray-400 pt-2 text-[11px]">
                <div className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed Safe Checkout</span>
                </div>
                <span>&bull;</span>
                <span>Apple Pay / Google Pay / Cards</span>
                <span>&bull;</span>
                <span>USPS Tracked</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

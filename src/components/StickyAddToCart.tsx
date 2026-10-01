"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Zap, Star } from "lucide-react";
import { productConfig } from "@/config/product";

export function StickyAddToCart({ onScrollToBuy }: { onScrollToBuy: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar la barra flotante solo después de haber scrolleado 500px
      if (window.scrollY > 550) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl transition-all duration-300 md:hidden animate-in slide-in-from-bottom">
      <div className="flex items-center justify-between gap-3">
        {/* Foto miniatura y precio */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-gray-200 shrink-0">
            <Image
              src={productConfig.images[0]}
              alt={productConfig.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-gray-900 truncate">
              {productConfig.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-black text-blue-600">
                ${productConfig.bundles[1].pricePerUnit.toFixed(2)}
              </span>
              <span className="text-[10px] text-gray-400 line-through">
                ${productConfig.originalPrice.toFixed(2)}
              </span>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 rounded">
                -60%
              </span>
            </div>
          </div>
        </div>

        {/* Botón de Compra Directo */}
        <button
          onClick={onScrollToBuy}
          className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current text-yellow-300" />
          <span>ORDER NOW</span>
        </button>
      </div>
    </div>
  );
}

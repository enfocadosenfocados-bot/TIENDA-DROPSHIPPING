"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star, ShoppingBag, Truck } from "lucide-react";
import { storeConfig } from "@/config/product";

export function Navbar({ onScrollToBuy }: { onScrollToBuy?: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.svg"
            alt="OrthoCloud™ Clinical Cervical Traction"
            width={180}
            height={45}
            priority
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Center Trust Signals (Desktop) */}
        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600 font-medium">
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-600" />
            <span>Fast USPS 3-Day Delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>30-Night Sleep Trial</span>
          </div>
          <a
            href="#reviews"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-gray-900">4.9/5</span>
            <span className="text-gray-500">(1,482 Reviews)</span>
          </a>
        </div>

        {/* Quick CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onScrollToBuy}
            className="hidden sm:inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Claim 50% OFF</span>
          </button>
        </div>
      </div>
    </header>
  );
}

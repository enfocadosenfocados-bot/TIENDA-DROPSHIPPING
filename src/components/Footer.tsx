import Link from "next/link";
import { ShieldCheck, Lock, Mail, Phone } from "lucide-react";
import { storeConfig } from "@/config/product";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 text-xs py-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <span className="text-lg font-black text-white block">
              {storeConfig.storeName}
            </span>
            <p className="text-gray-400 text-xs leading-relaxed">
              {storeConfig.tagline}. Designed in collaboration with biomechanical and chiropractic specialists.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="font-bold text-white text-xs uppercase tracking-wider">
              Legal &amp; Policies
            </p>
            <ul className="space-y-1.5">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Your USPS Order
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/policies/refund" className="hover:text-white transition-colors">
                  30-Night Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-2">
            <p className="font-bold text-white text-xs uppercase tracking-wider">
              Customer Support
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{storeConfig.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>{storeConfig.supportPhone}</span>
              </div>
              <p className="text-gray-500 text-[11px] mt-1">
                {storeConfig.supportHours}
              </p>
            </div>
          </div>

          {/* Security & Guarantees */}
          <div className="space-y-3">
            <p className="font-bold text-white text-xs uppercase tracking-wider">
              Bank-Grade Security
            </p>
            <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Lock className="w-4 h-4" />
                <span className="font-bold text-[11px]">256-Bit SSL Encrypted Checkout</span>
              </div>
              <p className="text-[10px] text-gray-500 leading-tight">
                All transactions are processed securely via Stripe. We never store complete credit card information.
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-gray-900 text-center space-y-3">
          <p className="text-[11px] text-gray-500 max-w-4xl mx-auto leading-relaxed">
            *Disclaimer: Statements made on this website have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any medical condition. Individual results may vary.
          </p>
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} {storeConfig.storeName}. All rights reserved. Powered by Independent Architecture.
          </p>
        </div>

      </div>
    </footer>
  );
}

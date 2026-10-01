import Link from "next/link";
import { storeConfig } from "@/config/product";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6 text-gray-700 text-sm">
        <Link href="/" className="text-xs text-blue-600 hover:underline font-bold block mb-4">
          &larr; Back to {storeConfig.storeName}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Terms of Service</h1>
        <p className="text-xs text-gray-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">1. Agreement to Terms</h2>
          <p>By using and purchasing from {storeConfig.storeName}, you agree to be bound by these Terms of Service. If you disagree, do not use this website.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">2. Billing &amp; Pricing</h2>
          <p>All prices are listed in USD. By providing payment information, you authorize our payment processor (Stripe) to charge your payment method for the agreed purchase amount.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">3. Governing Law</h2>
          <p>These Terms shall be governed by and defined following the laws of the United States.</p>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { storeConfig } from "@/config/product";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6 text-gray-700 text-sm">
        <Link href="/" className="text-xs text-blue-600 hover:underline font-bold block mb-4">
          &larr; Back to {storeConfig.storeName}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">30-Night Sleep Trial &amp; Return Policy</h1>
        <p className="text-xs text-gray-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">1. 30-Night Risk-Free Trial</h2>
          <p>We are confident that DermaSpine™ will transform your sleep. Sleep on it for up to 30 nights. If you are not waking up feeling refreshed and free from cervical tension, you are entitled to a 100% full refund.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">2. How to Request a Return</h2>
          <p>Simply send an email to <strong>{storeConfig.supportEmail}</strong> with your order reference number. Our US support team will provide return instructions within 24 hours.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">3. Refund Processing</h2>
          <p>Refunds are credited directly back to the original method of payment (Visa, Mastercard, American Express, Apple Pay) within 3 to 5 business days of return confirmation.</p>
        </section>
      </div>
    </div>
  );
}

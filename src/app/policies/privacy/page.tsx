import Link from "next/link";
import { storeConfig } from "@/config/product";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6 text-gray-700 text-sm">
        <Link href="/" className="text-xs text-blue-600 hover:underline font-bold block mb-4">
          &larr; Back to {storeConfig.storeName}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">1. Information We Collect</h2>
          <p>When you purchase from {storeConfig.storeName}, we collect order information (name, billing address, shipping address, email address, and phone number). We do not store full credit card numbers on our servers; payments are processed securely by Stripe.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">2. How We Use Your Information</h2>
          <p>We use your information solely to fulfill orders, process payments, provide shipping updates via SMS/Email, and send order confirmations.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">3. Your Rights</h2>
          <p>You may request deletion or correction of your personal information at any time by contacting {storeConfig.supportEmail}.</p>
        </section>
      </div>
    </div>
  );
}

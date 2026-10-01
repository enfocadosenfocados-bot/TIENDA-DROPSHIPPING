import Link from "next/link";
import { storeConfig } from "@/config/product";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6 text-gray-700 text-sm">
        <Link href="/" className="text-xs text-blue-600 hover:underline font-bold block mb-4">
          &larr; Back to {storeConfig.storeName}
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Shipping &amp; Delivery Policy</h1>
        <p className="text-xs text-gray-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">1. Order Processing Time</h2>
          <p>All orders are verified, quality-checked, and packaged within 24 to 48 hours of purchase. Orders placed on weekends or national US holidays will be dispatched the following business day.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">2. Domestic United States Shipping</h2>
          <p>We partner with USPS Priority Mail and FedEx Ground for domestic deliveries within the continental United States. Typical delivery timeframe is <strong>3 to 5 business days</strong> from shipment date.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">3. Tracking Your Shipment</h2>
          <p>Once your shipping label is generated, you will automatically receive an email and SMS containing your USPS tracking number. You can monitor progress on our <Link href="/track-order" className="text-blue-600 underline">Order Tracking Page</Link>.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-gray-900 text-base">4. Contact Us</h2>
          <p>For shipping questions, please reach out to {storeConfig.supportEmail}.</p>
        </section>
      </div>
    </div>
  );
}

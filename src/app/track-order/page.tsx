"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, Search, Truck, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { storeConfig } from "@/config/product";

export function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<{
    status: string;
    carrier: string;
    origin: string;
    destination: string;
    estimatedDelivery: string;
    events: Array<{ date: string; status: string; location: string }>;
  } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;

    setIsSearching(true);

    // Simulación de respuesta AfterShip / USPS Tracking
    setTimeout(() => {
      setResult({
        status: "In Transit",
        carrier: "USPS Priority Mail",
        origin: "Salt Lake City, UT Hub",
        destination: "Customer Destination",
        estimatedDelivery: "In 2-3 Business Days",
        events: [
          {
            date: "Today, 08:30 AM",
            status: "Departed USPS Regional Facility",
            location: "SALT LAKE CITY DISTRIBUTION CENTER",
          },
          {
            date: "Yesterday, 04:15 PM",
            status: "Arrived at USPS Sorting Facility",
            location: "SALT LAKE CITY DISTRIBUTION CENTER",
          },
          {
            date: "2 days ago, 11:00 AM",
            status: "Shipping Label Created, USPS Awaiting Item",
            location: "FULFILLMENT WAREHOUSE",
          },
        ],
      });
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="text-xs text-blue-600 hover:underline font-bold">
            &larr; Back to {storeConfig.storeName}
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Track Your Package
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Enter your USPS tracking number or order number below to see real-time transit updates.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Package className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. 9400 1118 9956 2341 5521 00 or DSP-1082"
                required
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs py-3 px-6 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
              <span>{isSearching ? "Searching..." : "TRACK SHIPMENT"}</span>
            </button>
          </form>
        </div>

        {/* Tracking Result Card */}
        {result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 flex-wrap gap-2">
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Carrier
                </span>
                <p className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  {result.carrier}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Estimated Delivery
                </span>
                <span className="text-sm font-extrabold text-emerald-600">
                  {result.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Timeline Progress */}
            <div className="space-y-4">
              <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Travel History
              </p>
              <div className="relative pl-6 border-l-2 border-blue-500 space-y-6">
                {result.events.map((ev, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white shadow-xs" />
                    <div>
                      <p className="text-xs font-extrabold text-gray-900">{ev.status}</p>
                      <p className="text-[11px] text-gray-500">{ev.location}</p>
                      <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">{ev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Notice */}
            <div className="p-4 bg-gray-50 rounded-2xl text-xs text-gray-500 border border-gray-100 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                Package tracking details are updated directly through USPS servers. If you need urgent assistance, contact {storeConfig.supportEmail}.
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default TrackOrderPage;

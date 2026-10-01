"use client";

import { useRef } from "react";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { TrustBadges } from "@/components/TrustBadges";
import { ProductHero } from "@/components/ProductHero";
import { ProductBenefits } from "@/components/ProductBenefits";
import { ComparisonTable } from "@/components/ComparisonTable";
import { CustomerReviews } from "@/components/CustomerReviews";
import { FaqSection } from "@/components/FaqSection";
import { StickyAddToCart } from "@/components/StickyAddToCart";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const scrollToBuy = () => {
    const el = document.getElementById("buy-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-blue-600 selection:text-white">
      {/* 1. Urgency Flash Sale Bar */}
      <AnnouncementBar />

      {/* 2. Brand Navigation */}
      <Navbar onScrollToBuy={scrollToBuy} />

      {/* 3. Main Hero & Conversion Configurator */}
      <ProductHero />

      {/* 4. Trust Badges & Guarantees */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <TrustBadges />
      </div>

      {/* 5. Biomechanical Anatomy & Benefits Breakdown */}
      <ProductBenefits />

      {/* 6. Comparison Table vs Competitors */}
      <ComparisonTable />

      {/* 7. Social Proof: Customer Reviews with Photos & Google Schema */}
      <CustomerReviews />

      {/* 8. Frequently Asked Questions Accordion */}
      <FaqSection />

      {/* 9. Secondary Buy CTA Box before footer */}
      <section className="py-12 bg-blue-600 text-white text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Wake Up Pain-Free Tomorrow Morning?
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm max-w-lg mx-auto">
            Take advantage of our limited-time 50% discount and 30-night risk-free trial. Over 1,480+ happy sleepers can&apos;t be wrong.
          </p>
          <button
            onClick={scrollToBuy}
            className="mt-2 bg-white text-blue-700 hover:bg-gray-100 font-black text-sm sm:text-base py-3.5 px-8 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            CLAIM 50% DISCOUNT &amp; FREE USPS SHIPPING &rarr;
          </button>
        </div>
      </section>

      {/* 10. Footer with Compliance & Policies */}
      <Footer />

      {/* 11. Mobile Sticky Add-to-Cart */}
      <StickyAddToCart onScrollToBuy={scrollToBuy} />

      {/* 12. Exit-Intent Modal Popup with 10% Code */}
      <ExitIntentModal onScrollToBuy={scrollToBuy} />
    </main>
  );
}

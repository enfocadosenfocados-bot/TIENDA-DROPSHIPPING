"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle, ThumbsUp, ShieldCheck } from "lucide-react";
import { productConfig, storeConfig } from "@/config/product";

export function CustomerReviews() {
  const [helpfulLikes, setHelpfulLikes] = useState<Record<string, number>>({});

  const handleHelpful = (id: string, initialCount: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || initialCount) + 1,
    }));
  };

  // Schema estructurado JSON-LD para Google SEO Rich Snippets (Estrellas doradas)
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productConfig.name,
    "image": productConfig.images[0],
    "description": productConfig.tagline,
    "brand": {
      "@type": "Brand",
      "name": storeConfig.storeName,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": productConfig.rating.toString(),
      "reviewCount": productConfig.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "offers": {
      "@type": "Offer",
      "url": storeConfig.domain,
      "priceCurrency": "USD",
      "price": productConfig.price.toString(),
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
    },
    "review": productConfig.reviews.map((r) => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": r.author,
      },
      "datePublished": "2026-09-15",
      "reviewBody": r.content,
    })),
  };

  return (
    <section id="reviews" className="py-16 bg-gray-50/70 border-t border-gray-100">
      {/* Script inyectado JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header & Rating Breakdown */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
            Social Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
            Real Sleepers. Real Mornings Without Pain.
          </h2>
          
          <div className="mt-6 p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="text-center sm:text-left">
              <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                {productConfig.rating}
                <span className="text-2xl text-gray-400 font-normal"> / 5.0</span>
              </div>
              <div className="flex text-amber-400 justify-center sm:justify-start my-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-500 font-semibold">
                Based on {productConfig.reviewCount.toLocaleString()} verified orders
              </p>
            </div>

            <div className="h-12 w-px bg-gray-200 hidden sm:block" />

            <div className="text-center sm:text-right">
              <span className="text-3xl font-black text-emerald-600">98.4%</span>
              <p className="text-xs font-bold text-gray-800 mt-1">
                Would recommend to a friend or family member
              </p>
              <div className="flex items-center gap-1 justify-center sm:justify-end text-[11px] text-gray-500 mt-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Verified Buyers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productConfig.reviews.map((rev) => {
            const currentHelpful = helpfulLikes[rev.id] || rev.helpfulCount;

            return (
              <div
                key={rev.id}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Rating + Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{rev.date}</span>
                  </div>

                  {/* Title & Content */}
                  <h4 className="font-extrabold text-base text-gray-900">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                {/* Author Info & Verified Badge */}
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {rev.userImage && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                        <Image
                          src={rev.userImage}
                          alt={rev.author}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-gray-900">{rev.author}</p>
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 fill-blue-50" />
                      </div>
                      <p className="text-[11px] text-gray-400">{rev.location}</p>
                    </div>
                  </div>

                  {/* Helpful Button */}
                  <button
                    onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                    className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>Helpful ({currentHelpful})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

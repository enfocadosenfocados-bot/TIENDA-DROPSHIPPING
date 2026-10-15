import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PixelScripts } from "@/components/tracking/PixelScripts";
import { productConfig, storeConfig } from "@/config/product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(storeConfig.domain),
  title: `${productConfig.name} - 50% OFF Flash Sale`,
  description: `${productConfig.tagline}. 30-Night Risk-Free Alignment Guarantee & Free USPS Priority Shipping.`,
  openGraph: {
    title: productConfig.name,
    description: productConfig.tagline,
    url: storeConfig.domain,
    siteName: storeConfig.storeName,
    images: [{ url: `${storeConfig.domain}/images/product/product_hero.jpg`, width: 1200, height: 1200, alt: productConfig.name }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: productConfig.name,
    description: productConfig.tagline,
    images: [`${storeConfig.domain}/images/product/product_hero.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productConfig.name,
    "image": [
      `${storeConfig.domain}/images/product/product_hero.jpg`,
      `${storeConfig.domain}/images/product/product_traction_dual.jpg`
    ],
    "description": productConfig.tagline,
    "sku": "OCL-TRC-BLU-01",
    "brand": {
      "@type": "Brand",
      "name": storeConfig.storeName
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": productConfig.rating.toString(),
      "reviewCount": productConfig.reviewCount.toString()
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": productConfig.price.toString(),
      "highPrice": productConfig.originalPrice.toString(),
      "offerCount": productConfig.bundles.length.toString(),
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": storeConfig.storeName
      }
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": productConfig.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <PixelScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}

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
  title: `${productConfig.name} - 50% OFF Flash Sale`,
  description: `${productConfig.tagline}. 30-Night Risk-Free Sleep Trial & Free USPS Shipping.`,
  openGraph: {
    title: productConfig.name,
    description: productConfig.tagline,
    images: [{ url: productConfig.images[0] }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: productConfig.name,
    description: productConfig.tagline,
    images: [productConfig.images[0]],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <PixelScripts />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {children}
      </body>
    </html>
  );
}

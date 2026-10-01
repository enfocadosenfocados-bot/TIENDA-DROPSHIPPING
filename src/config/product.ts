export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  color?: string;
  image: string;
  inStock: boolean;
}

export interface ProductBundle {
  id: string;
  quantity: number;
  title: string;
  badge?: string;
  pricePerUnit: number;
  totalPrice: number;
  originalPrice: number;
  savingsPercent: number;
  freeShipping: boolean;
  popular?: boolean;
  freeBonus?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  userImage?: string;
  productVariant?: string;
  helpfulCount: number;
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  supportHours: string;
  currency: string;
  currencySymbol: string;
  domain: string;
  returnDays: number;
  guaranteeHeadline: string;
  announcementText: string;
  urgencyStockRemaining: number;
}

export const storeConfig: StoreConfig = {
  storeName: "DermaSpine™",
  tagline: "Ergonomic Orthopedic Relief & Deep Sleep Technology",
  supportEmail: "support@dermaspine.com",
  supportPhone: "+1 (800) 492-3819",
  supportHours: "Mon-Fri: 9am - 6pm EST",
  currency: "USD",
  currencySymbol: "$",
  domain: "https://dermaspine.com",
  returnDays: 30,
  guaranteeHeadline: "30-Night Risk-Free Sleep Guarantee",
  announcementText: "⚡ FLASH SALE: 50% OFF + FREE USPS SHIPPING ON ORDERS OVER $60",
  urgencyStockRemaining: 17,
};

export const productConfig = {
  id: "dermaspine-cervical-pillow",
  handle: "orthopedic-cervical-contour-pillow",
  name: "DermaSpine™ Orthopedic Cervical Contour Pillow",
  tagline: "Wake Up Pain-Free: Doctor-Approved Spinal Alignment & Zero Neck Stiffness",
  badge: "🏆 #1 Doctor Recommended for Neck & Spine Pain",
  rating: 4.93,
  reviewCount: 1482,
  price: 49.99,
  originalPrice: 99.99,
  category: "Health & Personal Care > Sleeping Aids > Pillows",
  googleCategoryId: "Sleep & Bedding > Bed Pillows",
  
  images: [
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1629949009765-40fc74c950ec?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
  ],

  variants: [
    {
      id: "var-arctic-white",
      name: "Arctic Ice White",
      sku: "DSP-PIL-WHT-01",
      color: "#F8FAFC",
      image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "var-charcoal-grey",
      name: "Cooling Slate Grey",
      sku: "DSP-PIL-GRY-02",
      color: "#475569",
      image: "https://images.unsplash.com/photo-1629949009765-40fc74c950ec?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "var-midnight-navy",
      name: "Midnight Recovery Navy",
      sku: "DSP-PIL-NAV-03",
      color: "#1E293B",
      image: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=800&q=80",
      inStock: true
    }
  ] as ProductVariant[],

  bundles: [
    {
      id: "bundle-1",
      quantity: 1,
      title: "1x Starter Relief Pack",
      badge: undefined,
      pricePerUnit: 49.99,
      totalPrice: 49.99,
      originalPrice: 99.99,
      savingsPercent: 50,
      freeShipping: false,
      popular: false
    },
    {
      id: "bundle-2",
      quantity: 2,
      title: "2x Couples Dream Pack",
      badge: "🔥 MOST POPULAR (Save $130)",
      pricePerUnit: 39.99,
      totalPrice: 79.98,
      originalPrice: 199.98,
      savingsPercent: 60,
      freeShipping: true,
      popular: true,
      freeBonus: "Free 2x Breathable Sleep Masks ($29 Value)"
    },
    {
      id: "bundle-3",
      quantity: 3,
      title: "3x Ultimate Family Pack",
      badge: "💎 BEST VALUE (Save $200)",
      pricePerUnit: 33.33,
      totalPrice: 99.99,
      originalPrice: 299.97,
      savingsPercent: 67,
      freeShipping: true,
      popular: false,
      freeBonus: "Free Priority Insured Shipping + 3x Sleep Masks"
    }
  ] as ProductBundle[],

  orderBump: {
    id: "bump-vip-warranty",
    title: "Lifetime Replacement & Damage Warranty",
    price: 4.99,
    description: "Accidentally tore it, spilled coffee, or memory foam lost bounce? Get a free 1-click replacement anytime for life. No questions asked."
  },

  postPurchaseUpsell: {
    id: "upsell-silk-pillowcase",
    title: "100% Mulberry Silk Cooling Pillowcase",
    originalPrice: 49.99,
    salePrice: 24.99,
    discountPercent: 50,
    sku: "DSP-SILK-CASE-01",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    description: "Specially contoured to fit the DermaSpine pillow. Anti-aging, zero sleep-wrinkles, hypoallergenic and keeps you 4.5°F cooler all night long.",
    urgencySeconds: 600 // 10 minutos
  },

  features: [
    {
      icon: "ShieldCheck",
      title: "Cervical Alignment Zone",
      description: "Center cavity gently cradles your head while preserving the natural forward curvature of the cervical spine."
    },
    {
      icon: "Sparkles",
      title: "Slow-Rebound Memory Foam",
      description: "High-density 50D memory foam contours to your unique anatomy, distributing pressure evenly across muscles."
    },
    {
      icon: "Wind",
      title: "Air-Flow Cooling Mesh Cover",
      description: "3D honeycomb fabric maximizes ventilation to prevent night sweats and keep you fresh."
    },
    {
      icon: "Moon",
      title: "All Sleep Positions Supported",
      description: "Optimized contours provide ergonomic neck relief for side sleepers, back sleepers, and stomach sleepers."
    }
  ],

  comparisons: [
    {
      feature: "Ortopedic Cervical Alignment Contour",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "High-Density 50D Slow-Rebound Foam",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "Zero-Flattening Guarantee (3+ Years)",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "3D Air-Flow Thermal Regulation",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "30-Night Risk-Free Sleep Trial",
      ours: true,
      standard: false,
      feather: false
    }
  ],

  faqs: [
    {
      question: "How does the DermaSpine pillow stop neck and shoulder pain?",
      answer: "Traditional flat pillows push your head too far forward or let it sink unevenly, placing immense pressure on your C1-C7 vertebrae and pinching cervical nerves. DermaSpine features a precision-sculpted hollow center and lateral contour zones that lock your spine in neutral cervical alignment whether you sleep on your back or side."
    },
    {
      question: "How long does it take to see results?",
      answer: "Most customers feel noticeable relief from morning stiffness and tension headaches within the first 1 to 3 nights. Because your cervical spine is adapting to proper posture, allow 5-7 days for complete muscular relaxation."
    },
    {
      question: "Is it suitable for side, back, and stomach sleepers?",
      answer: "Yes! The multi-tier ergonomic architecture features two height options (4.1 inches on one side and 4.9 inches on the other) plus specialized armrest cutouts designed specifically for both side and back sleepers."
    },
    {
      question: "How fast is shipping and where does it ship from?",
      answer: "All US orders are processed within 24 hours and shipped via USPS Priority with real-time tracking. Typical delivery time across the continental US is 3 to 5 business days."
    },
    {
      question: "What if it doesn't work for me? Can I return it?",
      answer: "We offer an unconditional 30-Night Risk-Free Sleep Guarantee. If you are not waking up feeling refreshed and pain-free, simply email support@dermaspine.com and our team will issue a 100% full refund immediately."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Sarah M.",
      location: "Austin, Texas",
      rating: 5,
      date: "2 days ago",
      title: "Finally woke up without a crippling headache!",
      content: "I have suffered from cervical spine tension for 4 years. Spent hundreds on chiropractic adjustments. After only two nights on this pillow, my morning neck stiffness is 95% gone. Unbelievable difference.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      productVariant: "Cooling Slate Grey",
      helpfulCount: 42
    },
    {
      id: "rev-2",
      author: "Dr. David Richardson",
      location: "San Diego, California",
      rating: 5,
      date: "5 days ago",
      title: "Physical Therapist approved — I recommend it to all my patients",
      content: "As a practicing physical therapist, cervical lordosis maintenance during 8 hours of sleep is critical. The contour angle on DermaSpine maintains optimal cervical traction without over-extension.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      productVariant: "Arctic Ice White",
      helpfulCount: 89
    },
    {
      id: "rev-3",
      author: "Elena G.",
      location: "Miami, Florida",
      rating: 5,
      date: "1 week ago",
      title: "Worth every penny, bought two more for my parents",
      content: "I am a strict side-sleeper and regular pillows always squished my shoulders. The arm contour indents on this pillow are genius. My husband tried mine and stole it, so I ordered the 2-pack for my parents as well.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      productVariant: "Midnight Recovery Navy",
      helpfulCount: 31
    },
    {
      id: "rev-4",
      author: "Michael T.",
      location: "Denver, Colorado",
      rating: 5,
      date: "2 weeks ago",
      title: "High quality memory foam that doesn't collapse",
      content: "Cheap memory foam from Amazon goes flat after 30 minutes. This one stays firm yet soft enough to relieve pressure points all night. The cooling mesh cover actually works and doesn't get hot.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      productVariant: "Arctic Ice White",
      helpfulCount: 19
    }
  ] as ProductReview[],

  dropshipping: {
    cjSku: "CJ-DERMA-PIL-001",
    teemdropSku: "TD-DERMA-PIL-001",
    weightGrams: 850
  }
};

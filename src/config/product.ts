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
  storeName: "OrthoCloud™",
  tagline: "Anatomical Cervical Traction & Decompression Cradle",
  supportEmail: "support@orthocloudrelief.com",
  supportPhone: "+1 (800) 842-1928",
  supportHours: "Mon-Fri: 9am - 6pm EST",
  currency: "USD",
  currencySymbol: "$",
  domain: "https://orthocloudrelief.com",
  returnDays: 30,
  guaranteeHeadline: "30-Night Risk-Free Alignment Guarantee",
  announcementText: "⚡ FLASH SALE: 50% OFF + FREE USPS PRIORITY SHIPPING ON ORDERS OVER $60",
  urgencyStockRemaining: 14,
};

export const productConfig = {
  id: "orthocloud-cervical-traction-cradle",
  handle: "smart-cervical-traction-cradle",
  name: "OrthoCloud™ Smart Acupressure Cervical Traction Cradle",
  tagline: "Release 8 Hours of Desk Strain in 10 Minutes: Restores Natural C1-C7 Curvature & Melts Upper Trap Tension",
  badge: "🏆 #1 Chiropractor-Approved Home Decompression Device",
  rating: 4.95,
  reviewCount: 1840,
  price: 49.99,
  originalPrice: 99.99,
  category: "Health & Personal Care > Medical Supplies > Braces & Supports > Neck Supports",
  googleCategoryId: "Health & Beauty > Health Care > Supports & Braces",
  
  images: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1000&q=80"
  ],

  variants: [
    {
      id: "var-ortho-blue",
      name: "Clinical Ortho Blue",
      sku: "OCL-TRC-BLU-01",
      color: "#0284C7",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "var-slate-onyx",
      name: "Onyx Carbon Slate",
      sku: "OCL-TRC-BLK-02",
      color: "#1E293B",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
      inStock: true
    },
    {
      id: "var-rose-quartz",
      name: "Rose Quartz Gentle",
      sku: "OCL-TRC-PNK-03",
      color: "#F472B6",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      inStock: true
    }
  ] as ProductVariant[],

  bundles: [
    {
      id: "bundle-1",
      quantity: 1,
      title: "1x Solo Relief Cradle",
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
      title: "2x Couples / Home & Office Pack",
      badge: "🔥 MOST POPULAR (Save $130)",
      pricePerUnit: 39.99,
      totalPrice: 79.98,
      originalPrice: 199.98,
      savingsPercent: 60,
      freeShipping: true,
      popular: true,
      freeBonus: "Free 2x Orthopedic Posture Guides ($39 Value)"
    },
    {
      id: "bundle-3",
      quantity: 3,
      title: "3x Family Alignment Pack",
      badge: "💎 BEST VALUE (Save $200)",
      pricePerUnit: 33.33,
      totalPrice: 99.99,
      originalPrice: 299.97,
      savingsPercent: 67,
      freeShipping: true,
      popular: false,
      freeBonus: "Free Priority Insured Shipping + 3x Acupressure Charts"
    }
  ] as ProductBundle[],

  orderBump: {
    id: "bump-vip-warranty",
    title: "Lifetime Replacement & Structural Integrity Warranty",
    price: 4.99,
    description: "Accidentally damaged, chewed by a pet, or lost bounce? Get an instant free 1-click replacement anytime for life. No return required."
  },

  postPurchaseUpsell: {
    id: "upsell-silk-pillowcase",
    title: "100% Mulberry Silk Cooling Orthopedic Slip Sleeve",
    originalPrice: 49.99,
    salePrice: 19.99,
    discountPercent: 60,
    sku: "OCL-SILK-CASE-01",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    description: "Custom contoured to fit the OrthoCloud cradle. Ultra-soft breathable mulberry silk keeps skin 4.5°F cooler and protects the high-density foam core.",
    urgencySeconds: 600
  },

  features: [
    {
      icon: "ShieldCheck",
      title: "C-Shape Gravity Decompression",
      description: "Uses your head's natural 12-lb weight to gently stretch and decompress C1-C7 cervical discs without harsh mechanical pulleys."
    },
    {
      icon: "Sparkles",
      title: "6 Anatomical Acupressure Nodes",
      description: "Target key trigger points along the suboccipital and trapezius muscles to release chronic tension headaches and neck knots."
    },
    {
      icon: "Wind",
      title: "Dual Traction Levels (Gentle & Strong)",
      description: "Convex side provides mild traction for beginners, while the concave side provides deeper cervical curve restoration."
    },
    {
      icon: "Moon",
      title: "10-Minute Daily Reset",
      description: "Just 10 minutes lying down on your yoga mat or carpet restores natural lordotic curvature after 8 hours of hunching."
    }
  ],

  comparisons: [
    {
      feature: "Passive Gravity Acupressure Decompression",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "Suboccipital Trigger Point Node Array",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "Dual Traction Orientation (Gentle vs Deep)",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "Zero Electricity / No Wires / Indestructible Core",
      ours: true,
      standard: false,
      feather: false
    },
    {
      feature: "30-Night Risk-Free Posture Guarantee",
      ours: true,
      standard: false,
      feather: false
    }
  ],

  faqs: [
    {
      question: "How does the OrthoCloud relieve neck and shoulder tension?",
      answer: "When sitting at a desk or looking down at a smartphone, your cervical spine supports up to 60 pounds of unnatural force. OrthoCloud's ergonomic C-shaped arc uses natural gravity traction to gently elongate and decompress the vertebrae, taking pressure off pinched nerves and releasing tight knots in the trapezius muscles."
    },
    {
      question: "How long should I use it each day?",
      answer: "We recommend starting with just 5 minutes on the gentle (convex) side for your first 3 days. Once your neck muscles relax, increase to 10-15 minutes once or twice per day. Note: Do not sleep on it as a regular pillow all night; it is an active 10-minute restoration device."
    },
    {
      question: "Can I use this if I have chronic desk tension or headaches?",
      answer: "Yes! Most tension headaches originate from hyper-tight suboccipital muscles at the base of the skull. The targeted pressure nodes specifically press into those reflexology points to melt headache-causing strain."
    },
    {
      question: "Where does it ship from and how fast is delivery?",
      answer: "All US orders are dispatched within 24 hours from our domestic warehouse in the United States and delivered via USPS Priority within 3 to 5 business days with full door-to-door tracking."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer an unconditional 30-Night Risk-Free Alignment Guarantee. If your neck doesn't feel significantly lighter and pain-free within 30 days, email support@orthocloudrelief.com for a 100% full refund with zero hassle."
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Sarah M.",
      location: "Austin, Texas",
      rating: 5,
      date: "2 days ago",
      title: "Finally woke up without a burning neck knot!",
      content: "I work 9 hours a day coding at my desk. My neck used to burn every evening and I spent $140 every week at the chiropractor. After just 3 days using OrthoCloud for 10 minutes on the rug, my trap muscles are totally relaxed. It feels like an in-person spinal adjustment.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      productVariant: "Clinical Ortho Blue",
      helpfulCount: 54
    },
    {
      id: "rev-2",
      author: "Dr. David Richardson",
      location: "San Diego, California",
      rating: 5,
      date: "4 days ago",
      title: "Physical Therapist approved — I recommend it to all desk workers",
      content: "Forward head posture is epidemic in modern office life. Passive traction with the correct lordotic radius allows the anterior longitudinal ligament to gently remodel. OrthoCloud nailed the exact anatomical curvature.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      productVariant: "Onyx Carbon Slate",
      helpfulCount: 98
    },
    {
      id: "rev-3",
      author: "Elena G.",
      location: "Miami, Florida",
      rating: 5,
      date: "1 week ago",
      title: "Worth every penny, bought two more for my husband and mom",
      content: "The pressure points on the cradle hit right at the base of the skull where my tension headaches start. 10 minutes before bed and I feel an immediate wave of relief. Highly recommended!",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      productVariant: "Rose Quartz Gentle",
      helpfulCount: 41
    },
    {
      id: "rev-4",
      author: "Michael T.",
      location: "Denver, Colorado",
      rating: 5,
      date: "2 weeks ago",
      title: "Super durable medical foam, doesn't sink or collapse",
      content: "I bought a cheap $15 knockoff on Amazon before and it flattened into a pancake after two days. OrthoCloud is made of ultra-dense medical self-skinning foam. Holds firm and gives genuine traction stretch.",
      verified: true,
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      productVariant: "Clinical Ortho Blue",
      helpfulCount: 29
    }
  ] as ProductReview[],

  dropshipping: {
    cjSku: "CJ-ORTHO-TRAC-001",
    teemdropSku: "TD-ORTHO-TRAC-001",
    weightGrams: 340
  }
};

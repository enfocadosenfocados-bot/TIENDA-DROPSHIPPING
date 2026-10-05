import Image from "next/image";
import { ShieldCheck, Sparkles, Wind, Moon, CheckCircle2 } from "lucide-react";
import { productConfig, storeConfig } from "@/config/product";

export function ProductBenefits() {
  const benefitCards = [
    {
      title: "Cervical Decompression Zone",
      desc: "Gravitational traction gently separates C1-C7 vertebrae, decompressing herniated discs and restoring the natural 35° cervical curve.",
      icon: ShieldCheck,
      color: "blue",
    },
    {
      title: "6 Acupressure Shiatsu Nodes",
      desc: "Targeted nodules hit suboccipital trigger points and upper trapezius knots to stimulate micro-circulation and dissolve chronic tension.",
      icon: Sparkles,
      color: "purple",
    },
    {
      title: "Dual Traction Stretch Modes",
      desc: "Convex side provides a gentle beginner stretch; concave side delivers deep clinical decompression for stubborn knots and desk strain.",
      icon: Wind,
      color: "emerald",
    },
    {
      title: "10-Minute Daily Reset",
      desc: "No cords, no batteries, no recurring $150 chiropractor bills. Just 10 minutes lying down to eliminate 8+ hours of desk & phone strain.",
      icon: Moon,
      color: "amber",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
            Biomechanical Engineering &amp; Anatomy
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Why 8 Hours at a Desk Destroys Your Neck (And How We Fix It)
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Looking down at screens places up to 60 lbs of unnatural compressive force on your cervical spine. {storeConfig.storeName} uses natural gravity to reverse forward head posture in just 10 minutes.
          </p>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80"
              alt="OrthoCloud Cervical Spine Traction Demonstration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Biomechanical Precision
                </span>
                <p className="text-lg font-extrabold">
                  Restores 35° Cervical Lordosis Naturally
                </p>
                <p className="text-xs text-gray-300">
                  Relieves pressure on pinched nerves, traps, and suboccipital tension headaches.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-gray-900">
              The 4 Pillars of Rapid Cervical Relief
            </h3>
            <div className="space-y-3">
              {[
                "Passive gravitational traction opens compressed C1-C7 intervertebral spaces",
                "Shiatsu acupressure nodes melt stubborn knots across neck & upper shoulder blades",
                "Dual convex/concave geometry adapts from gentle relief to intense deep-tissue stretching",
                "High-density elastic polyurethane foam supports up to 300 lbs without flattening",
              ].map((bullet, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-semibold text-gray-800">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-base text-gray-900">
                  {card.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import Image from "next/image";
import { ShieldCheck, Sparkles, Wind, Moon, CheckCircle2 } from "lucide-react";
import { productConfig } from "@/config/product";

export function ProductBenefits() {
  const benefitCards = [
    {
      title: "Neutral Spine Alignment Zone",
      desc: "Hollow central cavity gently anchors your occipital bone, relieving the forward compressive pressure on your C1-C7 vertebrae.",
      icon: ShieldCheck,
      color: "blue",
    },
    {
      title: "50D High-Density Memory Foam",
      desc: "Unlike cheap hollow polyester pillows that collapse, our aerospace-grade visco-elastic foam adapts to your body heat and never goes flat.",
      icon: Sparkles,
      color: "purple",
    },
    {
      title: "3D Micro-Ventilated Thermal Mesh",
      desc: "Dissipates trapped body heat 3.8x faster than traditional cotton covers, keeping your skin cool and preventing night sweat awakenings.",
      icon: Wind,
      color: "emerald",
    },
    {
      title: "Dual Height Contours (All Sleepers)",
      desc: "Choose between 4.1'' and 4.9'' loft sides with contoured shoulder relief wings designed specifically for both side and back sleepers.",
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
            Engineering &amp; Anatomy
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Why Standard Pillows Destroy Your Neck (And How We Fixed It)
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            Every night you spend on a flat pillow places 12 to 15 lbs of unnatural torque on your cervical spine. DermaSpine restores natural posture while you sleep.
          </p>
        </div>

        {/* Visual Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80"
              alt="Ergonomic Cervical Spine Demonstration"
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
                  Relieves pressure on pinched nerves, traps, and shoulder joints.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-gray-900">
              The 4 Pillars of Restorative Sleep
            </h3>
            <div className="space-y-3">
              {[
                "Centers and supports head weight without tilting chin downwards",
                "Gentle traction opens cervical neural pathways for blood flow",
                "Shoulder cutout grooves prevent arm numbness and tingling",
                "Removable, machine-washable hypoallergenic silver-thread cover",
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

import { Shield, Truck, RefreshCw, Award, Lock } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "Doctor Approved",
      desc: "Endorsed by physical therapists",
    },
    {
      icon: RefreshCw,
      title: "30-Night Trial",
      desc: "100% money-back guarantee",
    },
    {
      icon: Truck,
      title: "Ships from USA",
      desc: "Fast tracked USPS Priority",
    },
    {
      icon: Lock,
      title: "256-Bit SSL Safe",
      desc: "Stripe encrypted checkout",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 py-4 my-6 border-y border-gray-100 bg-gray-50/60 rounded-xl px-4">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div key={idx} className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900 leading-tight">{b.title}</p>
              <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{b.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

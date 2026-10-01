import { Check, X, ShieldCheck } from "lucide-react";
import { productConfig } from "@/config/product";

export function ComparisonTable() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Clinical Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight mt-3">
            See How DermaSpine™ Outperforms Regular Pillows
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Features &amp; Clinical Specs
                </th>
                <th className="p-4 bg-blue-600 text-white text-center w-1/4 rounded-t-xl">
                  <div className="font-black text-sm sm:text-base tracking-tight">
                    DermaSpine™
                  </div>
                  <span className="text-[10px] text-blue-200 block uppercase font-bold">
                    Orthopedic Standard
                  </span>
                </th>
                <th className="p-4 text-gray-600 text-center text-xs font-bold w-1/4">
                  Generic Amazon Foam
                </th>
                <th className="p-4 text-gray-600 text-center text-xs font-bold w-1/4">
                  Standard Feather
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
              {productConfig.comparisons.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                >
                  <td className="p-4 font-bold text-gray-800">
                    {item.feature}
                  </td>
                  
                  {/* DermaSpine Column */}
                  <td className="p-4 bg-blue-50/70 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  </td>

                  {/* Standard Column */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-500">
                      <X className="w-4 h-4 stroke-[2]" />
                    </div>
                  </td>

                  {/* Feather Column */}
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-500">
                      <X className="w-4 h-4 stroke-[2]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

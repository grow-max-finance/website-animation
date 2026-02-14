"use client";

import { Scale, Lock, Activity, Smartphone } from "lucide-react";

const features = [
  {
    icon: Scale,
    title: "Defined Parameters",
    description:
      "Immutable smart contracts ensure rates and fees are transparent and predictable.",
  },
  {
    icon: Lock,
    title: "Non-Custodial",
    description:
      "You retain ownership of your keys. We never hold your assets directly.",
  },
  {
    icon: Activity,
    title: "Real-Time Data",
    description:
      "Millisecond updates via subgraphs for precise portfolio tracking.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description:
      "Manage your positions on the go with our fully responsive dApp.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="space-y-4 border-l border-white/10 pl-6 hover:border-[#0069d0] transition-colors duration-300"
            >
              {/* Icon */}
              <feature.icon className="w-6 h-6 text-zinc-400" />

              {/* Title */}
              <h3 className="text-white font-medium text-lg">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

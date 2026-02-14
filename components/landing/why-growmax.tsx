"use client";

import { SlidersHorizontal, Lock, Activity, ShieldAlert, Smartphone, DollarSign, icons } from "lucide-react";

const whyGrowmaxFeatures = [
    {
        icon: DollarSign,
        title: "Structured earning, not speculation",
        description: "Clear flexible and fixed plans designed for consistent, predictable returns rather than volatile yield chasing.",
    },
    {
        icon: Lock,
        title: "Collateral-backed borrowing",
        description: "Every loan is over collateralized with blue-chip crypto, providing a strong safety buffer for Earnusers.",
    },
        {
        icon: ShieldAlert,
        title: "Risk-isolated vaults",
        description: "Funds are separated into dedicated vaults to reduce cross-pool contagion and dependency risks.",
    },
    {
        icon: SlidersHorizontal,
        title: "Smart contracts with built-in safeguards (safer version of #4)",
        description: "Transparent on-chain logic governs loans, collateral, and risk parameters.",
    },
    {
        icon: Activity,
        title: " Live risk visibility",
        description: "Real-time dashboards show utilisation, LTV, and collateral health in a clear, accessible way.",
    },
    {
        icon: Smartphone,
        title: "Seamless, mobile-first product",
        description: "A fast, intuitive experience that lets users deposit, track earnings, and manage positions in real time.",
    },
];

export function WhyGrowmaxSection() {
    return (
        <section className="relative py-32 bg-[#020204] overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                    Why Growmax
                </h2>

                {/* Subheading */}
                <p className="text-zinc-500 mb-16 max-w-2xl mx-auto">
                    A bridge between DeFi transparency and institutional-grade risk management.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {whyGrowmaxFeatures.slice(0, 3).map((feature) => (
                        <div
                            key={feature.title}
                            className="group p-8 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 backdrop-blur-sm"
                        >
                            {/* Icon */}
                            <div className="mb-6 inline-flex p-3 rounded-lg bg-[#0069d0]/20 text-[#36a4fa]">
                                <feature.icon className="w-5 h-5" />
                            </div>

                            {/* Title */}
                            <h4 className="font-medium text-white mb-2 text-lg">
                                {feature.title}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Second Row - 2 centered cards on desktop, full width on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mt-6">
                    {whyGrowmaxFeatures.slice(3).map((feature) => (
                        <div
                            key={feature.title}
                            className="group p-8 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/4 transition-all duration-300 backdrop-blur-sm"
                        >
                            {/* Icon */}
                            <div className="mb-6 inline-flex p-3 rounded-lg bg-[#0069d0]/20 text-[#36a4fa]">
                                <feature.icon className="w-6 h-6" />
                            </div>

                            {/* Title */}
                            <h4 className="font-medium text-white mb-2 text-lg">
                                {feature.title}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-zinc-500 font-light leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

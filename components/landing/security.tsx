"use client";

import { Shield, Lock, Award, FileCheck, Database, Building2 } from "lucide-react";

const securityFeatures = [
    {
        icon: Shield,
        title: "Smart Contract Controls",
        description:
            "Core platform logic is executed on-chain through predefined rules governing deposits, loans, and collateral.",
    },
    {
        icon: Lock,
        title: "User Data Protection",
        description:
            "Only essential information is collected, with strong safeguards around user data and access. (If you actually minimize data collection, this is accurate and good.)",
    },
    {
        icon: Award,
        title: "Enterprise-Grade Infrastructure",
        description:
            "Secure operational setup using hardened systems, access controls, and internal safeguards.",
    },
    {
        icon: FileCheck,
        title: "Risk-Isolated Vaults",
        description:
            "User funds are separated into dedicated vaults to reduce cross-pool contagion and systemic risk.",
    },
    {
        icon: Database,
        title: "Transparent Risk Metrics",
        description:
            "Ongoing monitoring of market conditions, collateral, and platform performance to detect anomalies early.",
    },
    {
        icon: Building2,
        title: "Continuous Monitoring",
        description:
            "With BCMS consulting, we ensure your business operations stay resilient, even during unforeseen disruptions or crises.",
    },
];

export function SecuritySection() {
    return (
        <section className="relative py-32 bg-[#020204] overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                    Security
                </h2>

                {/* Subheading */}
                <p className="text-zinc-500 mb-16 max-w-2xl mx-auto">
                    Security is built into every layer of Growmax — from smart contracts to risk management and
operations
</p>
                {/* Security Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {securityFeatures.map((feature) => (
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
            </div>
        </section>
    );
}

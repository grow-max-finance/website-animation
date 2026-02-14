"use client";

import { FileCode, Bug, Eye } from "lucide-react";

const securityFeatures = [
    {
        icon: FileCode,
        title: "Formal Verification",
        description:
            "Mathematical proofs of contract logic correctness covering all critical paths.",
    },
    {
        icon: Bug,
        title: "$2M Bug Bounty",
        description:
            "Active program on Immunefi incentivizing white-hat disclosure of vulnerabilities.",
    },
    {
        icon: Eye,
        title: "On-Chain Monitoring",
        description:
            "24/7 automated threat detection system that pauses contracts on anomaly.",
    },
];

export function SecureByDesignSection() {
    return (
        <section id="security" className="relative py-32 bg-[#020204]">
            {/* Background glow */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                    Secure by design. Transparent by default.
                </h2>

                {/* Subheading */}
                <p className="text-zinc-500 mb-16 max-w-2xl mx-auto">
                    We prioritize fund safety above all else, utilizing multi-sig wallets and timelock controllers.
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

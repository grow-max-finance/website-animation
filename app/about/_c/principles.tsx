"use client";

import { Shield, Scale, Zap, Check } from "lucide-react";
import { useRef, MouseEvent } from "react";

export default function Principles() {
  const principles = [
    {
      icon: Shield,
      title: "Security First",
      description:
        "We prioritize the safety of funds through rigorous standards, continuous audits, and a security-first development lifecycle.",
      iconBg: "bg-blue-900/20",
      iconBorder: "border-blue-500/20",
      iconColor: "text-blue-400",
      checkBg: "bg-blue-500/10",
      checkColor: "text-blue-500",
      hoverTitle: "group-hover:text-blue-300",
      features: [
        "Multi-signature wallets",
        "Regular security audits",
        "Bug bounty program",
      ],
    },
    {
      icon: Scale,
      title: "True Decentralization",
      description:
        "Governance is in the hands of the community. Our protocol is designed to be censorship-resistant and open to all.",
      iconBg: "bg-purple-900/20",
      iconBorder: "border-purple-500/20",
      iconColor: "text-purple-400",
      checkBg: "bg-purple-500/10",
      checkColor: "text-purple-400",
      hoverTitle: "group-hover:text-purple-300",
      features: [
        "Community governance",
        "Transparent operations",
        "Open-source protocol",
      ],
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Minimal slippage and maximized yields through our proprietary automated market making strategies.",
      iconBg: "bg-green-900/20",
      iconBorder: "border-green-500/20",
      iconColor: "text-green-400",
      checkBg: "bg-green-500/10",
      checkColor: "text-green-400",
      hoverTitle: "group-hover:text-green-300",
      features: [
        "Optimized gas fees",
        "Smart routing algorithms",
        "Real-time price feeds",
      ],
    },
  ];

  // Principle Card with Spotlight Effect
  function PrincipleCard({ principle }: { principle: typeof principles[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const IconComponent = principle.icon;

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="spotlight-card group relative p-px rounded-2xl bg-linear-to-b from-white/10 to-white/5 hover:to-white/10 transition-colors overflow-hidden"
      >
        {/* Spotlight glow effect */}
        <div
          className="pointer-events-none absolute inset-0 z-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(255,255,255,0.06), transparent 40%)",
          }}
        />

        {/* Inner dark background */}
        <div className="absolute inset-0 bg-[#0c0c0e] rounded-[15px] m-px" />

        {/* Content */}
        <div className="relative z-10 p-10 h-full flex flex-col">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl ${principle.iconBg} border ${principle.iconBorder} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
          >
            <IconComponent className={`w-7 h-7 ${principle.iconColor}`} />
          </div>

          {/* Title & Description */}
          <h3
            className={`text-2xl font-medium tracking-tight text-white mb-2 ${principle.hoverTitle} transition-colors`}
          >
            {principle.title}
          </h3>
          <p className="text-zinc-400 mb-8 font-light text-sm leading-relaxed">
            {principle.description}
          </p>

          {/* Features */}
          <div className="space-y-4 mt-auto">
            {principle.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-zinc-300"
              >
                <div
                  className={`w-5 h-5 rounded-full ${principle.checkBg} flex items-center justify-center`}
                >
                  <Check className={`w-3 h-3 ${principle.checkColor}`} />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-[#020204] py-20 px-4 sm:px-6 overflow-hidden w-full">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Built on First Principles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are a team of engineers, researchers, and financial experts
            dedicated to building a resilient financial ecosystem.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <PrincipleCard key={principle.title} principle={principle} />
          ))}
        </div>
      </div>
    </section>
  );
}

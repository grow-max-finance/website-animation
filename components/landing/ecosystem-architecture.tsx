"use client";

import { Wallet, Landmark, Hexagon } from "lucide-react";

export function EcosystemArchitectureSection() {
  return (
    <section
      id="how-it-works"
      className="py-32 bg-[#020204] relative overflow-hidden"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-2 block">
            The Ecosystem
          </span>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
            How Capital Flows
          </h2>
        </div>

        {/* Flow Diagram */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
          {/* Step 1: Providers */}
          <div className="group flex flex-col items-center text-center max-w-xs relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl shadow-primary/20 group-hover:-translate-y-2 transition-transform duration-500">
              <Wallet className="w-8 h-8 text-[#36a4fa]" />
            </div>
            <h4 className="text-white text-lg font-medium mb-2">Providers</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Users deposit stablecoins into isolated smart contract vaults that are governed by Growmax’s risk
framework.
            </p>
          </div>

          {/* Animated Line Left */}
          <div className="hidden md:block flex-1 h-[2px] bg-zinc-800 relative overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent w-1/2 animate-shimmer" />
          </div>

          {/* Center Node: CORE */}
          <div className="flex flex-col items-center text-center max-w-xs relative z-10">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Pulsing glow behind */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse-slow" />
            {/* Main circle */}
            <div className="relative w-full h-full rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_50px_-10px_rgba(0,105,208,0.3)]">
              <Hexagon className="w-10 h-10 text-white mb-2 animate-spin-slow" />
              <span className="text-xs font-bold tracking-widest text-[#36a4fa]">
                CORE (Growmax Layer)
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed mt-4">
              Growmax operates a hybrid infrastructure that includes:
            </p>
            <ul className="text-xs text-zinc-500 leading-relaxed mt-2 list-disc list-inside text-left">
              <li>On-chain smart contracts for transparency</li>
              <li>Institutional risk controls and monitoring</li>
              <li>Automated collateral management</li>
              <li>Real-time position tracking</li>
            </ul>
          </div>

          {/* Animated Line Right */}
          <div className="hidden md:block flex-1 h-[2px] bg-zinc-800 relative overflow-hidden rounded-full">
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-primary to-transparent w-1/2 animate-shimmer"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Step 3: Borrowers */}
          <div className="group flex flex-col items-center text-center max-w-xs relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-6 shadow-2xl shadow-primary/20 group-hover:-translate-y-2 transition-transform duration-500">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-white text-lg font-medium mb-2">Borrowers</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Institutions access liquidity by providing over-collateralized crypto collateral, ensuring protection
for Earn users.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

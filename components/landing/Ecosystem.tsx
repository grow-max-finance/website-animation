import { Check, Lock, Box, Wallet } from "lucide-react";
import React from "react";

export default function Ecosystemarchitecture() {
  return (
    <main className="min-h-screen bg-darkbg text-white px-6 py-12">
      <div className="text-center mb-12 max-w-2xl mx-auto space-y-3 z-10 relative">
      <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white text-center">
          ECOSYSTEM ARCHITECTURE
        </h1>
        <p className="text-sm md:text-base text-zinc-500 text-center" style={{animationDelay: '0.2s'}}>
          How value flows securely between <span className="text-blue-400">Earn</span> and <span className="text-blue-400">Borrow</span> users
        </p>
        </div>
      <div className="max-w-4xl mx-auto space-y-12">

<div className="grid md:grid-cols-2 gap-8">

  {/* Earn Section */}
  <div className="flex flex-col items-center relative">

    {/* Card */}
    <div className="eco-glass-card bg-zinc-900 border-zinc-500 border border-soft rounded-xl p-6 shadow-glow hover:shadow-xl transition animate-slide-down-left w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center">
          👤
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-white tracking-tight">EARN USER</h3>
          <p className="text-xs text-zinc-500 mt-1">Deposits USDT</p>
        </div>
      </div>
    </div>

    {/* Connector Line */}
    <div className="h-8 w-[1px] bg-gradient-to-b from-zinc-800 to-blue-900/50 mt-2"></div>

    {/* Button */}
    <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-mono text-zinc-300 shadow-sm flex items-center gap-2 mt-2">
      ↓ Deposits USDT
    </div>
    <div className="h-8 w-[1px] bg-gradient-to-b from-zinc-800 to-blue-900/50  mt-2"></div>
  </div>


  {/* Borrow Section */}
  <div className="flex flex-col items-center relative">

    {/* Card */}
    <div className="eco-glass-card bg-zinc-900 border border-zinc-500 rounded-xl p-6 shadow-glow hover:shadow-xl transition animate-slide-down-right w-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center">
          👥
        </div>
        <div className="text-center">
          <h3 className="text-sm font-medium text-white tracking-tight">BORROW USER</h3>
          <p className="text-xs text-zinc-500 mt-1">Deposits Collateral</p>
        </div>
      </div>
    </div>

    {/* Connector Line */}
    <div className="h-8 w-[1px] bg-gradient-to-b from-zinc-800 to-blue-900/50mt-2"></div>

    {/* Button */}
    <div className="eco-glass-card bg-zinc-900/80 border border-zinc-800 px-4 py-1.5 rounded-full text-xs font-mono text-zinc-300 shadow-sm flex items-center gap-2 mt-2">
      ↓ Deposits Collateral
    </div>
<div className="h-8 w-[1px] bg-gradient-to-b from-zinc-800 to-blue-900/50 mt-2"></div>
  </div>
</div>

        {/* PROTOCOL BOX */}
{/* PROTOCOL BOX */}
<div className="relative eco-glass-card bg-grid-pattern border border-white/10 rounded-2xl p-10 overflow-hidden font-sans">
  <div className="relative z-10">
    <div className="text-center mb-10">
  <span className="inline-flex items-center gap-2 border border-white/10 text-xs px-3 py-1 rounded-full text-green-300 tracking-widest font-mono mb-2">
  <Box className="w-3.5 h-3.5 text-green-300" strokeWidth={2} />
  PROTOCOL LAYER
</span>

      <h2 className="text-sm font-medium text-white tracking-tight">
        GROWMAX PROTOCOL
      </h2>

      <p className="text-xs text-zinc-500 font-mono mt-1">
        (On-chain smart contracts & rules)
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Earn Pool */}
      <div className="eco-glass-card bg-zinc-900/50 p-6 rounded-xl border border-white/10">
        <h4 className="text-xs font-bold mb-6 tracking-widest text-gray-400 font-mono uppercase">
          Earn Pool
        </h4>

        <ul className="space-y-4 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5" />
            <span>
              <span className="text-white font-medium">
                12%-18% APY
              </span>{" "}
              (by plan)
            </span>
          </li>

          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-blue-500 mt-0.5" />
            <span>USDT liquidity</span>
          </li>
        </ul>
      </div>

      {/* Lending Engine */}
      <div className="eco-glass-cardbg-zinc-900/50 p-6 rounded-xl border border-white/10">
        <h4 className="text-xs font-bold mb-6 tracking-widest text-gray-400 font-mono uppercase">
          Lending Engine
        </h4>

        <ul className="space-y-4 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <Check className="w-4 h-4 text-indigo-500 mt-0.5" />
            <span>
              Up to <span className="text-white font-medium">50% LTV</span>
            </span>
          </li>

          <li className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-indigo-500 mt-0.5" />
            <span>Collateral locked</span>
          </li>
        </ul>
      </div>
    </div>

    {/* Connector */}
    <div className="flex items-center justify-center mt-10 gap-4">
      <div className="flex-grow border-t border-dashed border-blue-500/30"></div>

      <div className="bg-black border border-white/10 rounded-xl px-2 py-1">
        <span className="text-xs text-gray-400 font-mono">
          USDT loan issued →
        </span>
      </div>

      <div className="flex-grow border-t border-dashed border-blue-500/30"></div>
    </div>
  </div>
</div>

{/* ============================= */}
{/* Loan Flow + Outcome Section  */}
{/* ============================= */}

<div className="relative w-full max-w-3xl mx-auto h-24 md:h-28 -mt-2">

  {/* Left Vertical Line */}
  <div className="absolute left-[25%] top-0 bottom-0 w-px bg-white/5 md:bg-gradient-to-b from-white/10 to-white/5"></div>

  {/* Right Vertical Line */}
  <div className="absolute right-[25%] top-0 bottom-0 w-px bg-white/5 md:bg-gradient-to-b from-white/10 to-white/5"></div>

  {/* Floating Badge */}
{/* Floating Badge */}
<div className="absolute right-[25%] top-[35%] -translate-y-1/2 translate-x-3 md:translate-x-0 md:left-[62%] md:right-auto z-30">
  <div className="inline-flex items-center gap-3 bg-[#05110A] border border-emerald-900/30 rounded-full px-4 py-1.5 shadow-[0_0_20px_-5px_rgba(16,185,129,0.15)]">
    
    <Wallet className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2} />

    <span className="font-mono text-xs text-emerald-400/90 tracking-wide">
      [ Receives USDT loan ]
    </span>

  </div>
</div>

</div>

{/* ============================= */}
{/* Bottom Outcome Cards */}
{/* ============================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto relative z-10">

  {/* Earns Yield Card */}
  <div className="group relative eco-glass-card bg-zinc-900 border border-white/10 rounded-xl p-5 flex items-center justify-between overflow-hidden transition hover:border-blue-500/40">

    {/* Left Accent */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-md"></div>

    <div className="pl-2">
      <h3 className="text-white font-semibold text-base mb-1">
        Earns yield (daily)
      </h3>
      <div className="flex items-center gap-1.5 group-hover:gap-2 transition-all">
        <span className="text-[13px] font-medium text-blue-500">
          Yield paid out
        </span>
        <span className="text-blue-500">↗</span>
      </div>
    </div>

    <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
      💰
    </div>
  </div>

  {/* Repay Card */}
  <div className="group relative eco-glass-card bg-zinc-900 border border-white/10 rounded-xl p-5 flex items-center justify-between overflow-hidden transition hover:border-indigo-500/40">

    {/* Right Accent */}
    <div className="absolute right-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-md"></div>

    <div>
      <h3 className="text-white font-semibold text-base mb-1">
        Repay + interest
      </h3>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-medium text-indigo-400">
          Collateral unlocked
        </span>
        <span className="text-indigo-400">🔒</span>
      </div>
    </div>

    <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center">
      🔁
    </div>
  </div>
</div>

{/* ============================= */}
{/* Footer */}
{/* ============================= */}
<div className="w-full max-w-3xl mx-auto">
  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
</div>
<div className="mt-6 text-center">
  <p className="font-mono text-[11px] md:text-xs text-[#555] tracking-wide">
    Yield source: Borrower interest 
    <span className="mx-1">→</span> 
    distributed to Earn users 
    <span className="text-blue-500/90">
      (by plan terms)
    </span>
  </p>
</div>

      </div>
    </main>
  );
}

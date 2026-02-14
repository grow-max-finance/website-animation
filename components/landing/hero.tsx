"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Check, Gem } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

function AnimatedNumber({ 
  target, 
  suffix = "", 
  prefix = "",
  decimals = 0 
}: { 
  target: number; 
  suffix?: string; 
  prefix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Duration scales with the target value
    // Larger numbers take longer to count
    const baseDuration = 2000; // Base 2 seconds
    const duration = baseDuration + (target * 10); // Add time based on value
    const steps = 100; // Smooth animation steps
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span className="inline-block transition-all duration-100">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 10, y: -10 });

  const handleLaunchClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "https://app.growmaxfinance.com/";
    } else {
      window.open("https://app.growmaxfinance.com/", "_blank");
    }
  };

  // Mouse move handler for 3D parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroVisualRef.current) return;
    
    const rect = heroVisualRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15;
    const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  }, []);

  // Reset rotation when mouse leaves
  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 10, y: -10 });
  }, []);

  useEffect(() => {
    const heroVisual = heroVisualRef.current;
    if (!heroVisual) return;

    // Add listeners to the parent container for better tracking
    const parentContainer = heroVisual.parentElement;
    if (parentContainer) {
      parentContainer.addEventListener('mousemove', handleMouseMove);
      parentContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (parentContainer) {
        parentContainer.removeEventListener('mousemove', handleMouseMove);
        parentContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <section className="relative h-[calc(100dvh-64px)] bg-[#020204] overflow-hidden flex flex-col border-b border-white/5 w-full max-w-full">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      {/* Web3 Glow Orbs - Constrained to viewport */}
      <div className="absolute -top-40 left-0 w-96 h-96 bg-[#0069d0]/20 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] animate-blob pointer-events-none translate-x-1/2" style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex-1 flex items-center w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center w-full">
          {/* Left content */}
          <div className="space-y-4 lg:pr-12 lg:pl-0">

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1]">
              <span className="text-white">Unlock the full potential of </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7cc2fd] to-[#0069d0]">
                digital finance.
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg max-w-lg">
              Institutional-grade liquidity infrastructure that lets you earn structured returns on stablecoins and
borrow against crypto without selling it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleLaunchClick}
                className="bg-[#0069d0] hover:bg-[#0058bf] text-white px-6 py-6 rounded-lg text-base font-medium transition-all shadow-[0_0_20px_-5px_rgba(0,105,208,0.5)] hover:shadow-[0_0_30px_-5px_rgba(0,105,208,0.6)] group"
              >
                Launch App <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 px-6 py-6 rounded-lg text-base font-medium"
              >
                Talk to Team
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="relative">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <Check className="h-2 w-2 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={3} />
                </div>
                <span>Audited by CertiK</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Users className="h-4 w-4 text-blue-400" />
                <span>
                  <AnimatedNumber target={125} decimals={0} suffix="k+ Active Users" />
                </span>
              </div>
            </div>
          </div>

          {/* Right content - 3D Dashboard Visualization */}
          <div className="relative hidden lg:flex justify-end perspective-container lg:ml-auto lg:mr-0">
            <div 
              ref={heroVisualRef}
              className="relative w-[500px] h-[500px] preserve-3d transition-transform duration-100 ease-out lg:translate-x-12"
              style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* Back Glow */}
              <div 
                className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"
                style={{ transform: 'translateZ(-50px)' }}
              />

              {/* Floating Card 1 (Base) - Main Dashboard */}
              <div 
                className="absolute top-1/2 left-1/2 w-80 h-96 glass-card rounded-2xl p-6 flex flex-col justify-between border-t border-white/20"
                style={{ transform: 'translate(-50%, -50%) translateZ(0px)' }}
              >
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                    <Gem className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">ETH-USDT</span>
                </div>
                <div className="space-y-2">
                  <div className="h-24 w-full bg-gradient-to-t from-blue-600/20 to-transparent rounded-lg relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                    {/* Mock Graph Lines */}
                    <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                      <path 
                        d="M0 80 Q 50 70 100 40 T 200 60 T 320 10" 
                        fill="none" 
                        stroke="rgba(59, 130, 246, 0.5)" 
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Total Value Locked</p>
                      <p className="text-2xl font-semibold text-white tracking-tight">$842.5M</p>
                    </div>
                    <div className="px-2 py-1 rounded bg-green-500/10 text-green-400 text-xs font-semibold">+12.4%</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 (Overlay) - Bitcoin Reserve */}
              <div className="absolute top-[25%] right-[5%] w-64 h-32 glass-card rounded-xl p-5 border-l border-white/20 animate-float-3d">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-orange-500/50">B</div>
                  <div>
                    <p className="text-xs text-white font-medium">Bitcoin Reserve</p>
                    <p className="text-[10px] text-zinc-500">Collateralized</p>
                  </div>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full w-[75%]" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-zinc-400">
                  <span>75% LTV Used</span>
                  <span className="text-white">Safe</span>
                </div>
              </div>

              {/* Floating Element (Shield) */}
              <div className="absolute bottom-[20%] left-[-5%] w-16 h-16 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center animate-float-3d-delayed shadow-xl shadow-blue-500/30">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="relative z-10 border-t border-gray-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Current APY</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={18.42} decimals={2} suffix="%" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Total Liquidity</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={2.4} decimals={1} prefix="$" suffix="B+" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Protocol Uptime</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={99.99} decimals={2} suffix="%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

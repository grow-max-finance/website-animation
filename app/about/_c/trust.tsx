"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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

export default function Trust() {
  const statsCardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 10, y: -10 });

  // Mouse move handler for 3D parallax effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!statsCardRef.current) return;
    
    const rect = statsCardRef.current.getBoundingClientRect();
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
    const statsCard = statsCardRef.current;
    if (!statsCard) return;

    // Add listeners to the parent container for better tracking
    const parentContainer = statsCard.parentElement;
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
    <section className="relative h-[calc(100dvh-64px)] bg-[#020204] text-white overflow-hidden flex flex-col border-b border-white/5 w-full max-w-full py-8 lg:py-0">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      {/* Web3 Glow Orbs */}
      <div className="absolute -top-40 left-0 w-96 h-96 bg-[#0069d0]/20 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none -translate-x-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] animate-blob pointer-events-none translate-x-1/2" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex-1 flex items-center w-full">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-center w-full">
          {/* Left Content */}
          <div className="space-y-3 lg:space-y-4 lg:pr-12 lg:pl-0 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs text-blue-400">Our Mission</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1]">
              <span className="text-white">Redefining the</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7cc2fd] to-[#0069d0]">
                standard of trust
              </span>
              <br />
              <span className="text-white">in DeFi.</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-lg">
              Growmax is an institutional-grade liquidity protocol built for
              longevity. We bridge the gap between traditional finance
              reliability and decentralized yield generation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#0069d0] hover:bg-[#0058bf] text-white px-6 py-6 rounded-lg text-base font-medium transition-all shadow-[0_0_20px_-5px_rgba(0,105,208,0.5)] hover:shadow-[0_0_30px_-5px_rgba(0,105,208,0.6)] group">
                Read Whitepaper <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-white/10 px-6 py-6 rounded-lg text-base font-medium"
              >
                View Documentation
              </Button>
            </div>
          </div>

          {/* Right Content - Stats Card */}
          <div className="relative perspective-container hidden lg:block">
            <div 
              ref={statsCardRef}
              className="preserve-3d transition-transform duration-100 ease-out"
              style={{ 
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* Back Glow */}
              <div 
                className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full"
                style={{ transform: 'translateZ(-50px)' }}
              />

              <div className="glass-card rounded-2xl p-8 flex flex-col justify-between border-t border-white/20"
                style={{ transform: 'translateZ(0px)' }}
              >
              {/* TVL Chart */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      Total Value Locked
                    </p>
                    <p className="text-3xl font-bold">$842.5M</p>
                    <p className="text-sm text-green-400">+12.4%</p>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="h-32 relative">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 400 100"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 80 L 50 75 L 100 70 L 150 65 L 200 55 L 250 45 L 300 40 L 350 50 L 400 45 L 400 100 L 0 100 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0 80 L 50 75 L 100 70 L 150 65 L 200 55 L 250 45 L 300 40 L 350 50 L 400 45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>

              {/* Protocol Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <p className="text-xs text-gray-500 mb-1">Protocol Health</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-400 font-semibold">Optimal</span>
                  </div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                  <p className="text-xs text-gray-500 mb-1">Audited By</p>
                  <p className="font-semibold">Certik</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="relative z-10 border-t border-gray-800 mt-auto hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Founded</div>
              <div className="text-white text-2xl font-medium">2021</div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Team Members</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={45} decimals={0} />+
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Global Users</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={125} decimals={0} />k+
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">Protocol Uptime</div>
              <div className="text-white text-2xl font-medium">
                <AnimatedNumber target={99.99} decimals={2} />%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

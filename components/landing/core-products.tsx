"use client";

import { ArrowRight, Check, Layers, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, MouseEvent } from "react";

const products = [
  {
    icon: Layers,
    iconBg: "bg-blue-900/20",
    iconBorder: "border-blue-500/20",
    iconColor: "text-blue-400",
    checkBg: "bg-blue-500/10",
    checkColor: "text-blue-500",
    hoverTitle: "group-hover:text-blue-300",
    ctaColor: "text-blue-400 hover:text-blue-300",
    title: "Yield Earn",
    description:
      "Earn stable, structured returns on your stablecoins through professionally managed, risk-isolated vaults.",
    features: [
      "Isolated smart contract vaults",
      "Institutionally managed risk framework",
      "Borrower-backed interest model",
      "Daily USDT rewards (flexible & fixed plans)",
      "Transparent on-chain reporting",
    ],
    cta: "Explore Earn Plans",
    href: "#",
  },
  {
    icon: Zap,
    iconBg: "bg-purple-900/20",
    iconBorder: "border-purple-500/20",
    iconColor: "text-purple-400",
    checkBg: "bg-purple-500/10",
    checkColor: "text-purple-400",
    hoverTitle: "group-hover:text-purple-300",
    ctaColor: "text-purple-400 hover:text-purple-300",
    title: "Instant Credit",
    description:
      "Borrow stablecoins by pledging blue-chip crypto as collateral — secured through smart contracts and institutional risk controls",
    features: [
      "Instant USDT liquidity",
      "Flexible repayment",
      "Multi-asset collateral support",
      "Clearly defined LTV & liquidation process",
    ],
    cta: "Get Liquidity",
    href: "#",
  },
];

const partners = [
  { name: "Solana", icon: "/core-products/solana.svg" },
  { name: "BNB Chain", icon: "/core-products/bnb chain.svg" },
  { name: "Tether", icon: "/core-products/tether.svg" },
  { name: "Fireblocks", icon: "/core-products/fireblocks.svg" },
  { name: "MetaMask", icon: "/core-products/metamask.svg" },
];

// Product Card with Spotlight Effect
function ProductCard({ product }: { product: typeof products[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const IconComponent = product.icon;

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
          className={`w-14 h-14 rounded-xl ${product.iconBg} border ${product.iconBorder} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className={`w-7 h-7 ${product.iconColor}`} />
        </div>

        {/* Title & Description */}
        <h3
          className={`text-2xl font-medium tracking-tight text-white mb-2 ${product.hoverTitle} transition-colors`}
        >
          {product.title}
        </h3>
        <p className="text-zinc-400 mb-8 font-light text-sm leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8 grow">
          {product.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-sm text-zinc-300"
            >
              <div
                className={`w-5 h-5 rounded-full ${product.checkBg} flex items-center justify-center`}
              >
                <Check className={`w-3 h-3 ${product.checkColor}`} />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Link */}
        <Link
          href={product.href}
          className={`inline-flex items-center text-sm font-semibold ${product.ctaColor} transition-colors mt-auto`}
        >
          {product.cta}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function CoreProductsSection() {
  return (
    <section id="products" className="relative bg-[#020204] py-20 px-4 sm:px-6 overflow-hidden w-full">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0069d0]/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4">
            Core Products
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our range of services designed to protect your digital assets.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {products.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>

        {/* Partners Section - Hidden on mobile */}
        <div className="hidden md:block border-t border-gray-800/30 pt-12 overflow-hidden">
          <div className="flex items-center gap-8">
            <span className="text-gray-200 text-m font-semi-bold whitespace-nowrap">
              Ecosystem & Infrastructure
            </span>
            
            {/* Scrolling Partners */}
            <div className="relative flex-1 overflow-hidden">
              <div className="flex animate-scroll">
                {/* First set of partners */}
                {partners.map((partner, index) => (
                  <div
                    key={`partner-1-${index}`}
                    className="flex items-center justify-center min-w-[150px] mx-6"
                  >
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={100}
                      height={20}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <div
                    key={`partner-2-${index}`}
                    className="flex items-center justify-center min-w-[150px] mx-6"
                  >
                    <Image
                      src={partner.icon}
                      alt={partner.name}
                      width={100}
                      height={20}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
              {/* Left fade gradient */}
              <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-[#09090B] to-transparent pointer-events-none z-10" />
              {/* Right fade gradient */}
              <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-[#09090B] to-transparent pointer-events-none z-10" />
            </div>
          </div>
          
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }
            
            .animate-scroll {
              animation: scroll 15s linear infinite;
            }
            
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

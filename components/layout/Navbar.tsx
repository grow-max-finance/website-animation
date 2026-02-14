"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const handleLaunchClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "https://app.growmaxfinance.com/";
    } else {
      window.open("https://app.growmaxfinance.com/", "_blank");
    }
  };

  return (
    <header className="w-full max-w-full bg-gradient-to-b from-[#0a1929] via-[#050810] to-[#020204] border-b border-white/10 relative overflow-hidden">
      {/* Blue glow effects matching hero */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0069d0]/15 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#7cc2fd]/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/navbar/navbar.svg"
            alt="Logo"
            width={140}
            height={32}
            priority
          />
        </Link>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <Link
            href="/#contact"
            className="text-gray-400 hover:text-white text-sm transition-colors hidden sm:block"
          >
            Contact
          </Link>
          <Button
            onClick={handleLaunchClick}
            variant="outline"
            className="bg-white text-black hover:bg-gray-100 border-0 rounded-xl px-5 py-2 text-sm font-medium"
          >
            Launch App
          </Button>
        </div>
      </div>
    </header>
  );
}

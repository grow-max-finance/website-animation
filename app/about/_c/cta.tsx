"use client";

import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export default function CTA() {
  const handleLaunchClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = "https://app.growmaxfinance.com/";
    } else {
      window.open("https://app.growmaxfinance.com/", "_blank");
    }
  };

  return (
    <section className="relative bg-[#020204] text-white py-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-8">
          <Rocket className="w-8 h-8 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to start earning?
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of users who are maximizing their digital assets with
          Growmax. Secure, transparent, and efficient.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            onClick={handleLaunchClick}
            className="bg-white hover:bg-gray-100 text-black px-8 py-6 rounded-lg font-semibold"
          >
            Launch App
          </Button>
          <Button
            variant="outline"
            className="border-gray-700 hover:bg-gray-900 text-white px-8 py-6 rounded-lg font-semibold"
          >
            Join Discord
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      alert(error instanceof Error ? error.message : "Failed to subscribe. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-blue-600/20 rounded-lg">
          <Mail className="h-4 w-4 text-blue-500" />
        </div>
        <span className="text-zinc-400 text-xs">Newsletter</span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        Stay ahead of the market
      </h3>
      <p className="text-zinc-400 text-sm mb-4">
        Join the 10,000+ subscribers receiving monthly analysis on yield strategies,
        governance proposals, and ecosystem updates.
      </p>

      {status === "success" ? (
        <div className="p-3 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-center text-sm">
          Thanks for subscribing! Check your email for confirmation.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 flex-1 h-10 text-sm"
          />
          <Button
            type="submit"
            className="bg-white text-black hover:bg-zinc-200 h-10 px-6 text-sm"
            disabled={status === "loading"}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </Button>
        </form>
      )}

      <p className="text-zinc-500 text-xs mt-3">
        No spam, unsubscribe anytime.
      </p>
    </div>
  );
}

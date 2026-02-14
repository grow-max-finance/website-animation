"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedToggleProps {
  slug: string;
  isFeatured: boolean;
}

export function FeaturedToggle({ slug, isFeatured }: FeaturedToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/posts/${slug}/featured`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFeatured: !isFeatured }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update featured status");
      }

      // Force a full page reload to ensure all stars update correctly
      window.location.reload();
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert(error instanceof Error ? error.message : "Failed to update featured status");
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isLoading}
      className={`relative transition-all ${
        isFeatured
          ? "text-yellow-400 hover:text-yellow-500 hover:bg-yellow-500/10"
          : "text-zinc-500 hover:text-yellow-400 hover:bg-yellow-500/10"
      }`}
      title={isFeatured ? "Remove from featured" : "Set as featured"}
    >
      <Star
        className={`h-5 w-5 transition-all ${
          isFeatured ? "fill-yellow-400" : "fill-none"
        } ${isLoading ? "animate-pulse" : ""}`}
      />
    </Button>
  );
}

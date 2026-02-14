"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ToggleActiveButtonProps {
  id: string;
  isActive: boolean;
}

export function ToggleActiveButton({ id, isActive }: ToggleActiveButtonProps) {
  const [active, setActive] = useState(isActive);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !active }),
      });

      if (!response.ok) {
        throw new Error("Failed to update subscriber status");
      }

      setActive(!active);
      router.refresh();
    } catch (error) {
      console.error("Error toggling subscriber status:", error);
      alert("Failed to update subscriber status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleToggle}
      disabled={isLoading}
      size="sm"
      variant={active ? "default" : "outline"}
      className={
        active
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "border-zinc-600 text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }
    >
      {isLoading ? "..." : active ? "Active" : "Inactive"}
    </Button>
  );
}

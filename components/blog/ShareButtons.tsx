"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={shareOnTwitter}
        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
      >
        <Twitter className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={shareOnLinkedIn}
        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
      >
        <Linkedin className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={copyLink}
        className="text-zinc-400 hover:text-white hover:bg-zinc-800"
      >
        {copied ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <Link2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}

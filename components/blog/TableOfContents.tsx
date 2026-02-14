"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Parse headings from HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const elements = doc.querySelectorAll("h1, h2, h3");

    const items: TOCItem[] = [];
    elements.forEach((el, index) => {
      const id = el.id || `heading-${index}`;
      const text = el.textContent || "";
      const level = parseInt(el.tagName[1]);
      items.push({ id, text, level });
    });

    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
        On this page
      </p>
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={cn(
            "block text-sm py-1 border-l-2 transition-colors",
            heading.level === 1 && "pl-4",
            heading.level === 2 && "pl-4",
            heading.level === 3 && "pl-8",
            activeId === heading.id
              ? "border-blue-500 text-blue-400"
              : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
          )}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );
}

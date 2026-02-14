"use client";

import { useEffect, useRef } from "react";

interface ArticleContentProps {
  content: string;
}

export function ArticleContent({ content }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Add IDs to headings for anchor links
    const headings = contentRef.current.querySelectorAll("h1, h2, h3");
    headings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="prose prose-invert prose-zinc max-w-none
        prose-headings:scroll-mt-24
        prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6
        prose-h2:text-2xl prose-h2:font-semibold prose-h2:text-white prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:text-white prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-white prose-strong:font-semibold
        prose-code:text-blue-400 prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-zinc-900/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-ul:text-zinc-300 prose-ol:text-zinc-300
        prose-li:marker:text-zinc-500
        prose-img:rounded-lg prose-img:border prose-img:border-zinc-800
        prose-hr:border-zinc-800
        [&_.callout]:bg-blue-500/10 [&_.callout]:border [&_.callout]:border-blue-500/30 [&_.callout]:rounded-lg [&_.callout]:p-4 [&_.callout]:my-6
        [&_.callout-title]:text-blue-400 [&_.callout-title]:font-semibold [&_.callout-title]:mb-2
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface Category {
  _id: string;
  name: string;
  slug: string;
  color: string;
}

interface CategoryFilterProps {
  categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryChange = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    params.delete("page"); // Reset to first page when changing category
    router.push(`/blog?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={() => handleCategoryChange(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
          !currentCategory
            ? "bg-blue-600 text-white"
            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => handleCategoryChange(category._id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            currentCategory === category._id
              ? "text-white"
              : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
          )}
          style={
            currentCategory === category._id
              ? { backgroundColor: category.color }
              : undefined
          }
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

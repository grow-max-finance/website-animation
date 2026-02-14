import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    readTime: number;
    publishedAt?: Date;
    createdAt: Date;
    category: {
      name: string;
      slug: string;
      color: string;
    };
    author: {
      name: string;
      avatar?: string;
    };
  };
}

export function BlogCard({ post }: BlogCardProps) {
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="h-full bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-blue-500/5 flex flex-col">
        {/* Image */}
        <div className="relative aspect-video bg-zinc-800 shrink-0">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg" />
            </div>
          )}
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${post.category.color}20`,
                color: post.category.color,
              }}
            >
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Meta */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors min-h-[3.5rem]">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-zinc-400 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

interface FeaturedPostProps {
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

export function FeaturedPost({ post }: FeaturedPostProps) {
  const date = post.publishedAt || post.createdAt;

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden grid md:grid-cols-2 gap-4 p-1 min-h-[350px] md:min-h-[400px] transition-all hover:border-zinc-700">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-zinc-800">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-4 md:p-6">
          {/* Category Badge */}
          <div className="mb-4">
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${post.category.color}20`,
                color: post.category.color,
              }}
            >
              {post.category.name}
            </span>
            <span className="text-zinc-500 text-sm ml-3">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-zinc-400 mb-4 line-clamp-3">{post.excerpt}</p>

          {/* Read Time */}
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-sm">{post.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

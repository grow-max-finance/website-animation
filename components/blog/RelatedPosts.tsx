import { BlogCard } from "./BlogCard";

interface Post {
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
}

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-zinc-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Keep Reading</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

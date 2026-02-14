import { Suspense } from "react";
import connectDB from "@/lib/mongodb";
import { Post, Category, Author } from "@/models";
import { BlogCard } from "@/components/blog/BlogCard";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Newsletter } from "@/components/blog/Newsletter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

async function getCategories() {
  await connectDB();
  const categories = await Category.find().sort({ name: 1 }).lean();
  return categories.map((cat) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    color: cat.color,
  }));
}

async function getPosts(category?: string, page: number = 1) {
  await connectDB();

  const query: Record<string, unknown> = { status: "published" };
  if (category) {
    query.category = category;
  }

  const limit = 6;
  const skip = (page - 1) * limit;

  const [posts, total, featuredPost] = await Promise.all([
    Post.find(query)
      .populate("category", "name slug color")
      .populate("author", "name avatar")
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Post.countDocuments(query),
    page === 1
      ? Post.findOne({ ...query, isFeatured: true })
          .populate("category", "name slug color")
          .populate("author", "name avatar")
          .lean()
      : null,
  ]);

  return {
    posts: posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      category: {
        ...(post.category as object),
        _id: (post.category as { _id: { toString(): string } })._id.toString(),
      },
      author: {
        ...(post.author as object),
        _id: (post.author as { _id: { toString(): string } })._id.toString(),
      },
    })),
    featuredPost: featuredPost
      ? {
          ...featuredPost,
          _id: featuredPost._id.toString(),
          category: {
            ...(featuredPost.category as object),
            _id: (featuredPost.category as { _id: { toString(): string } })._id.toString(),
          },
          author: {
            ...(featuredPost.author as object),
            _id: (featuredPost.author as { _id: { toString(): string } })._id.toString(),
          },
        }
      : null,
    pagination: {
      page,
      total,
      pages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const [categories, data] = await Promise.all([
    getCategories(),
    getPosts(params.category, currentPage),
  ]);

  return (
    <div className="min-h-screen bg-[#020204]">
      {/* Hero Section with animated background */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.07] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        {/* Glow Orbs */}
        <div className="absolute -top-40 left-0 w-96 h-96 bg-[#0069d0]/20 rounded-full blur-[120px] animate-blob mix-blend-screen pointer-events-none -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] animate-blob pointer-events-none translate-x-1/2" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] mb-4">
                <span className="text-white">Latest </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7cc2fd] to-[#0069d0]">
                  Insights
                </span>
              </h1>
              <p className="text-gray-400 text-lg max-w-xl">
                Deep dives into protocol updates, market mechanics, and the future of
                decentralized finance.
              </p>
            </div>

            {/* Category Filter */}
            <Suspense fallback={<div className="h-10 bg-zinc-800 rounded-full w-64 animate-pulse" />}>
              <CategoryFilter categories={categories} />
            </Suspense>
          </div>

          {/* Featured Post */}
          {data.featuredPost && currentPage === 1 && (
            <div className="mb-12">
              <FeaturedPost post={data.featuredPost as Parameters<typeof FeaturedPost>[0]["post"]} />
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <Newsletter />
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          {data.posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {data.posts.map((post) => (
                  <BlogCard key={post._id} post={post as Parameters<typeof BlogCard>[0]["post"]} />
                ))}
              </div>

              {/* Load More */}
              {data.pagination.hasMore && (
                <div className="text-center">
                  <Link
                    href={`/blog?${params.category ? `category=${params.category}&` : ""}page=${currentPage + 1}`}
                  >
                    <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white">
                      Load more posts
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-zinc-400 text-lg mb-4">No posts found</p>
              {params.category && (
                <Link href="/blog">
                  <Button variant="outline" className="border-zinc-700">
                    View all posts
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 pb-24 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0069d0]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
            Start your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7cc2fd] to-[#0069d0]">journey</span> today
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.growmaxfinance.com">
              <Button className="bg-[#0069d0] hover:bg-[#0058bf] text-white px-8 py-6 rounded-lg text-base font-medium transition-all shadow-[0_0_20px_-5px_rgba(0,105,208,0.5)] hover:shadow-[0_0_30px_-5px_rgba(0,105,208,0.6)]">
                Launch App
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 px-8 py-6 rounded-lg text-base font-medium">
                Read Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

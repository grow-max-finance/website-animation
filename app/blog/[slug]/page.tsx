import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { ArticleContent } from "@/components/blog/ArticleContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  await connectDB();

  const post = await Post.findOne({ slug, status: "published" })
    .populate("category", "name slug color")
    .populate("author", "name avatar bio")
    .lean();

  return post;
}

async function getRelatedPosts(categoryId: string, currentSlug: string) {
  await connectDB();

  const posts = await Post.find({
    category: categoryId,
    slug: { $ne: currentSlug },
    status: "published",
  })
    .populate("category", "name slug color")
    .populate("author", "name avatar")
    .sort({ publishedAt: -1 })
    .limit(3)
    .lean();

  return posts.map((post) => ({
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
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Growmax Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    (post.category as { _id: { toString(): string } })._id.toString(),
    slug
  );

  const date = post.publishedAt || post.createdAt;
  const postUrl = `https://growmaxfinance.com/blog/${slug}`;

  return (
    <div className="min-h-screen bg-[#020204]">
      {/* Header */}
      <header className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-zinc-400">
              {(post.category as { name: string }).name}
            </span>
          </nav>

          {/* Category */}
          <div className="mb-4">
            <Badge
              className="text-sm"
              style={{
                backgroundColor: `${(post.category as { color: string }).color}20`,
                color: (post.category as { color: string }).color,
              }}
            >
              {(post.category as { name: string }).name}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-zinc-400 mb-8">{post.excerpt}</p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
                {(post.author as { avatar?: string }).avatar ? (
                  <Image
                    src={(post.author as { avatar: string }).avatar}
                    alt={(post.author as { name: string }).name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-white">
                    {(post.author as { name: string }).name.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-medium">
                  {(post.author as { name: string }).name}
                </p>
                <p className="text-zinc-500 text-sm">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Share Buttons - Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <ShareButtons url={postUrl} title={post.title} />
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-7">
              <ArticleContent content={post.content} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-zinc-800">
                  <p className="text-sm text-zinc-500 mb-4">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Mobile Share */}
              <div className="lg:hidden mt-8 pt-8 border-t border-zinc-800">
                <p className="text-sm text-zinc-500 mb-4">Share this article</p>
                <div className="flex gap-2">
                  <ShareButtons url={postUrl} title={post.title} />
                </div>
              </div>
            </article>

            {/* Table of Contents - Right Sidebar */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <TableOfContents content={post.content} />

                {/* Newsletter CTA */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-sm text-zinc-400 mb-3">
                    Enjoyed this article?
                  </p>
                  <Link
                    href="/blog"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    Subscribe to our newsletter
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Posts */}
          <div className="max-w-4xl mx-auto lg:ml-[calc(8.333%+1rem)]">
            <RelatedPosts posts={relatedPosts as Parameters<typeof RelatedPosts>[0]["posts"]} />
          </div>
        </div>
      </div>
    </div>
  );
}

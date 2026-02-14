import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import Image from "next/image";
import { DeletePostButton } from "./DeletePostButton";
import { FeaturedToggle } from "./FeaturedToggle";

async function getPosts() {
  await connectDB();

  const posts = await Post.find()
    .populate("category", "name slug color")
    .populate("author", "name")
    .sort({ createdAt: -1 })
    .lean();

  return posts;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Posts</h1>
          <p className="text-zinc-400 mt-1">Manage your blog posts</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">All Posts ({posts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={String(post._id)}
                  className="flex items-center gap-4 p-4 bg-zinc-800/50 rounded-lg"
                >
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-zinc-700 shrink-0">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="text-white font-medium hover:text-blue-400 truncate"
                      >
                        {post.title}
                      </Link>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                        className={
                          post.status === "published"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }
                      >
                        {post.status}
                      </Badge>
                      {post.isFeatured && (
                        <Badge className="bg-purple-600/20 text-purple-400">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${(post.category as { color?: string })?.color || "#0069D0"}20`,
                          color: (post.category as { color?: string })?.color || "#0069D0",
                        }}
                      >
                        {(post.category as { name?: string })?.name || "Uncategorized"}
                      </span>
                      <span className="text-zinc-500 text-sm">
                        {(post.author as { name?: string })?.name || "Unknown"}
                      </span>
                      <span className="text-zinc-500 text-sm">
                        {post.readTime} min read
                      </span>
                      <span className="text-zinc-500 text-sm">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <FeaturedToggle 
                      slug={post.slug} 
                      isFeatured={post.isFeatured} 
                    />
                    <Link href={`/admin/posts/${post.slug}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeletePostButton slug={post.slug} title={post.title} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400 mb-4">No posts yet</p>
              <Link href="/admin/posts/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first post
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

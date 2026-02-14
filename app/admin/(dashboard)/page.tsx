import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, Eye, TrendingUp } from "lucide-react";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Link from "next/link";

async function getStats() {
  await connectDB();

  const [totalPosts, publishedPosts, draftPosts, totalCategories, recentPosts] =
    await Promise.all([
      Post.countDocuments(),
      Post.countDocuments({ status: "published" }),
      Post.countDocuments({ status: "draft" }),
      Category.countDocuments(),
      Post.find()
        .populate("category", "name slug color")
        .populate("author", "name")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    recentPosts,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400 mt-1">
          Welcome back! Here&apos;s an overview of your blog.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Total Posts</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.totalPosts}
                </p>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Published</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.publishedPosts}
                </p>
              </div>
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Eye className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Drafts</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.draftPosts}
                </p>
              </div>
              <div className="p-3 bg-yellow-600/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm">Categories</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stats.totalCategories}
                </p>
              </div>
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <FolderOpen className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Posts</CardTitle>
          <Link
            href="/admin/posts"
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {stats.recentPosts.length > 0 ? (
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div
                  key={String(post._id)}
                  className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-white font-medium hover:text-blue-400 truncate block"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-xs px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${(post.category as { color?: string })?.color || "#0069D0"}20`,
                          color: (post.category as { color?: string })?.color || "#0069D0",
                        }}
                      >
                        {(post.category as { name?: string })?.name || "Uncategorized"}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        by {(post.author as { name?: string })?.name || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        post.status === "published"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-zinc-400">No posts yet.</p>
              <Link
                href="/admin/posts/new"
                className="text-blue-500 hover:text-blue-400 mt-2 inline-block"
              >
                Create your first post
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

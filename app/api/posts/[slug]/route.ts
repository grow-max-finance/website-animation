import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getAuthSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET /api/posts/[slug] - Get a single post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { slug } = await params;

    const session = await getAuthSession();
    const query: Record<string, unknown> = { slug };

    // For public requests, only show published posts
    if (!session) {
      query.status = "published";
    }

    const post = await Post.findOne(query)
      .populate("category", "name slug color")
      .populate("author", "name avatar bio");

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[slug] - Update a post
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    const body = await request.json();

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if new slug already exists (if slug is being changed)
    if (body.slug && body.slug !== slug) {
      const existingPost = await Post.findOne({ slug: body.slug });
      if (existingPost) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update the post
    const updatedPost = await Post.findOneAndUpdate(
      { slug },
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )
      .populate("category", "name slug color")
      .populate("author", "name avatar");

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[slug] - Delete a post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}

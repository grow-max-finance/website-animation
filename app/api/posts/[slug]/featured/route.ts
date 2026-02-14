import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getAuthSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// PATCH /api/posts/[slug]/featured - Toggle featured status
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;
    const { isFeatured } = await request.json();

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If setting this post as featured, unfeatured all other posts
    if (isFeatured) {
      await Post.updateMany(
        { _id: { $ne: post._id } },
        { $set: { isFeatured: false } }
      );
    }

    // Update the current post
    post.isFeatured = isFeatured;
    await post.save();

    return NextResponse.json({ 
      success: true, 
      isFeatured: post.isFeatured,
      message: isFeatured 
        ? "Post set as featured. All other posts have been unfeatured." 
        : "Post removed from featured."
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    return NextResponse.json(
      { error: "Failed to update featured status" },
      { status: 500 }
    );
  }
}

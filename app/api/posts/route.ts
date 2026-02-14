import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import { getAuthSession } from "@/lib/auth";

// GET /api/posts - Get all posts (with filters)
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    // Build query
    const query: Record<string, unknown> = {};

    // For public requests, only show published posts
    const session = await getAuthSession();
    if (!session) {
      query.status = "published";
    } else if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (featured === "true") {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate("category", "name slug color")
        .populate("author", "name avatar")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments(query),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      status,
      isFeatured,
    } = body;

    // Validate required fields
    if (!title || !excerpt || !content || !category) {
      return NextResponse.json(
        { error: "Title, excerpt, content, and category are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPost = await Post.findOne({
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });

    if (existingPost) {
      return NextResponse.json(
        { error: "A post with this slug already exists" },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title,
      slug: slug || undefined, // Let the model generate it if not provided
      excerpt,
      content,
      featuredImage: featuredImage || "",
      category,
      author: session.user.id,
      tags: tags || [],
      status: status || "draft",
      isFeatured: isFeatured || false,
    });

    const populatedPost = await Post.findById(post._id)
      .populate("category", "name slug color")
      .populate("author", "name avatar");

    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

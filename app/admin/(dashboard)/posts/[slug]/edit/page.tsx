import { PostForm } from "@/components/admin/PostForm";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";
import Post from "@/models/Post";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
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

async function getPost(slug: string) {
  await connectDB();
  const post = await Post.findOne({ slug }).lean();
  return post;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  const [categories, post] = await Promise.all([
    getCategories(),
    getPost(slug),
  ]);

  if (!post) {
    notFound();
  }

  const initialData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    featuredImage: post.featuredImage,
    category: post.category.toString(),
    tags: post.tags,
    status: post.status as "draft" | "published",
    isFeatured: post.isFeatured,
  };

  return <PostForm categories={categories} initialData={initialData} isEditing />;
}

import { PostForm } from "@/components/admin/PostForm";
import connectDB from "@/lib/mongodb";
import Category from "@/models/Category";

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

export default async function NewPostPage() {
  const categories = await getCategories();

  return <PostForm categories={categories} />;
}

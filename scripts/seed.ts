import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI environment variable");
  process.exit(1);
}

// Define schemas inline for the seed script
const AuthorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String },
    role: { type: String, enum: ["admin", "editor"], default: "editor" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String, default: "#0069D0" },
  },
  { timestamps: true }
);

const Author = mongoose.models.Author || mongoose.model("Author", AuthorSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

const categories = [
  {
    name: "Engineering",
    slug: "engineering",
    description: "Technical deep dives and development updates",
    color: "#0069D0",
  },
  {
    name: "Community",
    slug: "community",
    description: "Community updates and governance",
    color: "#10B981",
  },
  {
    name: "Security",
    slug: "security",
    description: "Security audits and best practices",
    color: "#F59E0B",
  },
  {
    name: "Education",
    slug: "education",
    description: "Learning resources and guides",
    color: "#8B5CF6",
  },
  {
    name: "Partnerships",
    slug: "partnerships",
    description: "Partnership announcements",
    color: "#EC4899",
  },
];

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Create admin user from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@growmaxfinance.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    const existingAdmin = await Author.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      await Author.create({
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        bio: "Growmax Finance Administrator",
        isActive: true,
      });
      
      console.log("✅ Admin user created");
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Password: ${adminPassword === "admin123" ? adminPassword : "********"}`);
      if (adminPassword === "admin123") {
        console.log("   ⚠️  Please change this password immediately after first login!");
      }
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    // Create categories
    for (const category of categories) {
      const existing = await Category.findOne({ slug: category.slug });
      
      if (!existing) {
        await Category.create(category);
        console.log(`✅ Category created: ${category.name}`);
      } else {
        console.log(`ℹ️  Category already exists: ${category.name}`);
      }
    }

    console.log("\n🎉 Seed completed successfully!");
    console.log("\nYou can now:");
    console.log("1. Start your development server: npm run dev");
    console.log("2. Visit http://localhost:3000/admin/login");
    console.log("3. Login with the admin credentials above");
    console.log("4. Start creating blog posts!");

  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("\nDisconnected from MongoDB");
  }
}

seed();

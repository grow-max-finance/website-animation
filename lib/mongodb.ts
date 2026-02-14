import mongoose from "mongoose";

// Import all models to ensure they're registered
import "@/models/Author";
import "@/models/Category";
import "@/models/Post";
import Author from "@/models/Author";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (mongoose.connection.readyState >= 1) {
    return mongoose;
  }

  const opts = {
    bufferCommands: false,
  };

  await mongoose.connect(MONGODB_URI, opts);

  // Initialize first admin account if it doesn't exist
  await initializeFirstAdmin();

  return mongoose;
}

async function initializeFirstAdmin() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set in environment variables");
      return;
    }

    // Check if any admin exists
    const existingAdmin = await Author.findOne({ role: "admin" });

    if (!existingAdmin) {
      // Create the first admin account
      await Author.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
        isActive: true,
        bio: "System Administrator",
      });

      console.log("✅ First admin account created successfully");
    }
  } catch (error) {
    console.error("Error initializing first admin:", error);
  }
}

export default connectDB;

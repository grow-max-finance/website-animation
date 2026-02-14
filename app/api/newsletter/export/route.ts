import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { getAuthSession } from "@/lib/auth";

// GET /api/newsletter/export - Export subscribers as CSV
export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const subscribers = await Subscriber.find()
      .sort({ subscribedAt: -1 })
      .lean();

    // Create CSV content
    const csvHeader = "Email,Status,Subscribed Date\n";
    const csvRows = subscribers
      .map((sub) => {
        const email = sub.email;
        const status = sub.isActive ? "Active" : "Unsubscribed";
        const date = new Date(sub.subscribedAt).toLocaleDateString("en-US");
        return `${email},${status},${date}`;
      })
      .join("\n");

    const csv = csvHeader + csvRows;

    // Return CSV file
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Error exporting subscribers:", error);
    return NextResponse.json(
      { error: "Failed to export subscribers" },
      { status: 500 }
    );
  }
}

import { Sidebar } from "@/components/admin/Sidebar";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar />
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </div>
  );
}

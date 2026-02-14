"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Mail,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Posts",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "Subscribers",
    href: "/admin/subscribers",
    icon: Mail,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    
    // Dispatch custom event for layout to listen
    window.dispatchEvent(
      new CustomEvent("sidebar-collapse", { detail: { collapsed: newState } })
    );
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-black border-r border-zinc-800/50 transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-zinc-800/50">
          {!isCollapsed && (
            <Link href="/admin" className="text-lg font-semibold text-white">
              Growmax Admin
            </Link>
          )}
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors ml-auto"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group relative",
                isActive(item.href)
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.title}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-zinc-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-zinc-800">
                  {item.title}
                </div>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-zinc-800/50">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all group relative"
            )}
            title={isCollapsed ? "Sign Out" : undefined}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-zinc-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap shadow-xl border border-zinc-800">
                Sign Out
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

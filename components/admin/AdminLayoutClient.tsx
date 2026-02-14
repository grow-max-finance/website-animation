"use client";

import { useEffect, useState } from "react";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Listen for sidebar collapse events
    const handleCollapse = (e: CustomEvent) => {
      setIsCollapsed(e.detail.collapsed);
    };

    window.addEventListener("sidebar-collapse" as any, handleCollapse);
    return () => {
      window.removeEventListener("sidebar-collapse" as any, handleCollapse);
    };
  }, []);

  return (
    <main
      className="min-h-screen transition-all duration-300"
      style={{ marginLeft: isCollapsed ? "80px" : "256px" }}
    >
      <div className="p-6 md:p-8">{children}</div>
    </main>
  );
}

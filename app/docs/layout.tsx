import { ReactNode } from 'react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { TableOfContents } from '@/components/docs/TableOfContents';
import { Breadcrumbs } from '@/components/docs/Breadcrumbs';

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex gap-8">
        {/* Left Sidebar - Sticky */}
        <div className="w-64 shrink-0">
          <DocsSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0 max-w-4xl">
          <div className="px-6 lg:px-12 py-8">
            <Breadcrumbs />
            {children}
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <TableOfContents />
      </div>
    </div>
  );
}

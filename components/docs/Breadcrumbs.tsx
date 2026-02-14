'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Format segment text
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
      <Link href="/" className="hover:text-white transition-colors">
        Home
      </Link>
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;

        return (
          <div key={segment} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-gray-600" />
            {isLast ? (
              <span className="text-white font-medium">{formatSegment(segment)}</span>
            ) : (
              <Link href={href} className="hover:text-white transition-colors">
                {formatSegment(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

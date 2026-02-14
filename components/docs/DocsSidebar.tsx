'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { title: 'Introduction', href: '/docs/overview/introduction' },
      { title: 'What is Growmax', href: '/docs/overview/what-is-growmax' },
      { title: 'How Growmax Works', href: '/docs/overview/how-growmax-works' },
      { title: 'Why Growmax', href: '/docs/overview/why-growmax' },
      { title: 'Our Values', href: '/docs/overview/our-values' },
    ],
  },
  {
    title: 'Products',
    items: [
      { title: 'Earn (Overview)', href: '/docs/products/earn-overview' },
      { title: 'Flexible Earn (12%)', href: '/docs/products/flexible-earn' },
      { title: 'Fixed Earn (18%)', href: '/docs/products/fixed-earn' },
      { title: 'Product Lifecycle', href: '/docs/products/product-lifecycle' },
      { title: 'Rewards & Withdrawals', href: '/docs/products/rewards-withdrawals' },
      { title: 'Borrow (Overview)', href: '/docs/products/borrow-overview' },
      { title: 'Collateral, LTV & Liquidation', href: '/docs/products/collateral-ltv' },
    ],
  },
  {
    title: 'Referral Program',
    items: [
      { title: 'Referral Program Overview', href: '/docs/referral/overview' },
      { title: 'How Rewards Work', href: '/docs/referral/rewards' },
      { title: 'Eligibility & Rules', href: '/docs/referral/eligibility' },
    ],
  },
  {
    title: 'Assets & Networks',
    items: [
      { title: 'Supported Blockchains', href: '/docs/assets/blockchains' },
      { title: 'Supported Tokens', href: '/docs/assets/tokens' },
      { title: 'Deposits & Network Rules', href: '/docs/assets/deposits' },
    ],
  },
  {
    title: 'Platform & Security',
    items: [
      { title: 'Platform Architecture', href: '/docs/security/architecture' },
      { title: 'Custody Model', href: '/docs/security/custody' },
      { title: 'Security Practices', href: '/docs/security/practices' },
      { title: 'Fees & Charges', href: '/docs/security/fees' },
    ],
  },
  {
    title: 'Compliance & Legal',
    items: [
      { title: 'Compliance & Legal', href: '/docs/legal/compliance' },
      { title: 'Risk Disclosure', href: '/docs/legal/risk-disclosure' },
      { title: 'Terms of Use', href: '/docs/legal/terms' },
      { title: 'Privacy Policy', href: '/docs/legal/privacy' },
      { title: 'Disclaimers', href: '/docs/legal/disclaimers' },
    ],
  },
  {
    title: 'Help',
    items: [
      { title: 'FAQs', href: '/docs/help/faqs' },
      { title: 'Support & Contact', href: '/docs/help/support' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Overview': false,
    'Products': false,
    'Referral Program': false,
    'Assets & Networks': false,
    'Platform & Security': false,
    'Compliance & Legal': false,
    'Help': false,
  });

  const toggleSection = (title: string) => {
    setExpandedSections(prev => {
      // Close all sections and open only the clicked one
      const newState: Record<string, boolean> = {};
      Object.keys(prev).forEach(key => {
        newState[key] = key === title ? !prev[title] : false;
      });
      return newState;
    });
  };

  // Filter navigation based on search
  const filteredNavigation = searchQuery
    ? navigation.map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : navigation;

  return (
    <>
      {/* Sidebar */}
      <aside 
        className={cn(
          "sticky top-0 left-0 h-screen bg-black transition-all duration-300",
          isCollapsed ? "w-0 -ml-64" : "w-64"
        )}
      >
        <div className={cn(
          "h-full flex flex-col w-64 transition-opacity duration-300",
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}>
          {/* Search Bar and Collapse Button */}
          <div className="p-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors border border-gray-700 shrink-0"
                title="Close sidebar"
              >
                <PanelLeftClose size={18} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
            <nav className="space-y-1">
              {filteredNavigation.map((section) => (
                <div key={section.title}>
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-gray-400 uppercase tracking-wider py-2 hover:text-white transition-colors"
                  >
                    {section.title}
                    {expandedSections[section.title] ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                  
                  {expandedSections[section.title] && (
                    <ul className="space-y-1 mt-2 mb-2">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={cn(
                              'block text-sm py-2 px-3 rounded-md transition-colors',
                              pathname === item.href
                                ? 'bg-gray-800 text-white font-medium'
                                : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            )}
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Collapsed Sidebar Button - Shows when sidebar is hidden */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-all border border-gray-700 shadow-lg"
          title="Open sidebar"
        >
          <PanelLeftOpen size={18} />
        </button>
      )}
    </>
  );
}

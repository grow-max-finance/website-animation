import Link from 'next/link';
import { ArrowRight, BookOpen, Code, Lightbulb, Shield } from 'lucide-react';

export default function DocsPage() {
  const sections = [
    {
      title: 'Quick Start',
      description: 'Get up and running in 5 minutes',
      href: '/docs/overview/introduction',
      icon: Lightbulb,
    },
    {
      title: 'Core Concepts',
      description: 'Understand the fundamentals',
      href: '/docs/overview/what-is-growmax',
      icon: BookOpen,
    },
    {
      title: 'Products',
      description: 'Explore Earn and Borrow products',
      href: '/docs/products/earn-overview',
      icon: Code,
    },
    {
      title: 'Security',
      description: 'Learn about our security practices',
      href: '/docs/security/architecture',
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-6xl">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-6">Introduction</h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Welcome to the Growmax documentation. Learn how to unlock the full potential of structured digital asset products with our comprehensive suite of tools and protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-primary/50 hover:bg-gray-900/80 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {section.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {section.description}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Popular Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/products/flexible-earn"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Flexible Earn (12%)
          </Link>
          <Link
            href="/docs/products/fixed-earn"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Fixed Earn (18%)
          </Link>
          <Link
            href="/docs/products/borrow-overview"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Borrow Overview
          </Link>
          <Link
            href="/docs/referral/overview"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Referral Program
          </Link>
          <Link
            href="/docs/assets/blockchains"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Supported Blockchains
          </Link>
          <Link
            href="/docs/help/faqs"
            className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            FAQs
          </Link>
        </div>
      </div>
    </div>
  );
}

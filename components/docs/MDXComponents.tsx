import { ReactNode } from 'react';

// Helper function to generate ID from text
const generateId = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');
};

export const MDXComponents = {
  h1: ({ children }: { children: ReactNode }) => {
    const id = typeof children === 'string' ? generateId(children) : '';
    return (
      <h1 id={id} className="text-3xl font-bold mb-4 mt-6 scroll-mt-20">
        {children}
      </h1>
    );
  },
  h2: ({ children }: { children: ReactNode }) => {
    const id = typeof children === 'string' ? generateId(children) : '';
    return (
      <h2 id={id} className="text-2xl font-bold mb-3 mt-6 scroll-mt-20">
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children: ReactNode }) => {
    const id = typeof children === 'string' ? generateId(children) : '';
    return (
      <h3 id={id} className="text-xl font-semibold mb-2 mt-4 scroll-mt-20">
        {children}
      </h3>
    );
  },
  p: ({ children }: { children: ReactNode }) => (
    <p className="text-gray-300 leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <ul className="list-disc list-inside space-y-1.5 mb-3 text-gray-300">{children}</ul>
  ),
  ol: ({ children }: { children: ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1.5 mb-3 text-gray-300">{children}</ol>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <li className="ml-4">{children}</li>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <code className="bg-gray-900 text-green-400 px-1.5 py-0.5 rounded text-xs font-mono">
      {children}
    </code>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-3 border border-gray-800">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-400 my-3">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      className="text-blue-400 hover:text-blue-300 underline text-sm"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

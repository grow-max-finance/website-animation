import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { MDXComponents } from '@/components/docs/MDXComponents';

interface DocPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

async function getDocContent(category: string, slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'docs', category, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    const { content, frontmatter } = await compileMDX({
      source: fileContent,
      options: { parseFrontmatter: true },
      components: MDXComponents,
    });

    return { content, frontmatter };
  } catch (error) {
    return null;
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { category, slug } = await params;
  const doc = await getDocContent(category, slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      {doc.content}
    </article>
  );
}

export async function generateStaticParams() {
  const docsDir = path.join(process.cwd(), 'content', 'docs');
  const categories = fs.readdirSync(docsDir);

  const params: { category: string; slug: string }[] = [];

  categories.forEach((category) => {
    const categoryPath = path.join(docsDir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      const files = fs.readdirSync(categoryPath);
      files.forEach((file) => {
        if (file.endsWith('.mdx')) {
          params.push({
            category,
            slug: file.replace('.mdx', ''),
          });
        }
      });
    }
  });

  return params;
}

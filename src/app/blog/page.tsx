import type { Metadata } from 'next';
import BlogClient from '../../client-pages/Blog';
import { getBreadcrumbSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Engineering Blog & Software Insights | Tesseract Infosystems',
  description: 'Read in-depth software engineering blogs: AI trends in 2026, custom software development costs, React vs Next.js performance comparisons, and SaaS architecture blueprints.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/blog',
  },
  openGraph: {
    title: 'Engineering Blog & Software Insights | Tesseract Infosystems',
    description: 'Read in-depth software engineering blogs: AI trends in 2026, custom software development costs, React vs Next.js performance comparisons, and SaaS architecture blueprints.',
    url: 'https://tesseractinfosystems.com/blog',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Engineering Blog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Blog & Software Insights | Tesseract Infosystems',
    description: 'Read in-depth software engineering blogs: AI trends in 2026, custom software development costs, React vs Next.js performance comparisons, and SaaS architecture blueprints.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <BlogClient />
    </>
  );
}

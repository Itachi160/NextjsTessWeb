import type { Metadata } from 'next';
import SolutionsClient from '../../client-pages/Solutions';
import { getBreadcrumbSchema, getSolutionsSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Enterprise Solutions Blueprint & Software Modules',
  description: 'View custom enterprise solution blueprints: CLD-NODE, AI-CORE, SEC-SHIELD, and TX-FABRIC engineered for hyperscale performance.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/solutions',
  },
  openGraph: {
    title: 'Enterprise Solutions Blueprint & Software Modules | Tesseract Infosystems',
    description: 'View custom enterprise solution blueprints: CLD-NODE, AI-CORE, SEC-SHIELD, and TX-FABRIC engineered for hyperscale performance.',
    url: 'https://tesseractinfosystems.com/solutions',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Solutions Blueprint' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Solutions Blueprint & Software Modules | Tesseract Infosystems',
    description: 'View custom enterprise solution blueprints: CLD-NODE, AI-CORE, SEC-SHIELD, and TX-FABRIC engineered for hyperscale performance.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Solutions', item: '/solutions' },
  ]);
  const solutionsSchema = getSolutionsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(solutionsSchema) }}
      />
      <SolutionsClient />
    </>
  );
}

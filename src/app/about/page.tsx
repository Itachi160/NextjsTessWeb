import type { Metadata } from 'next';
import AboutClient from '../../client-pages/About';
import { getBreadcrumbSchema, getLeadershipSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Engineering Ethos & Executive Leadership',
  description: 'Learn about Tesseract Infosystems, our core engineering philosophy, software architecture designs, leadership team, and SOC 2 / HIPAA compliance standards.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/about',
  },
  openGraph: {
    title: 'Engineering Ethos & Executive Leadership | Tesseract Infosystems',
    description: 'Learn about Tesseract Infosystems, our core engineering philosophy, software architecture designs, leadership team, and SOC 2 / HIPAA compliance standards.',
    url: 'https://tesseractinfosystems.com/about',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract About Us' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Engineering Ethos & Executive Leadership | Tesseract Infosystems',
    description: 'Learn about Tesseract Infosystems, our core engineering philosophy, software architecture designs, leadership team, and SOC 2 / HIPAA compliance standards.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About', item: '/about' },
  ]);
  const leadership = getLeadershipSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(leadership) }}
      />
      <AboutClient />
    </>
  );
}

import type { Metadata } from 'next';
import AboutClient from '../../client-pages/About';
import { getBreadcrumbSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'About Us & Core Engineering Ethos',
  description: 'Learn about Tesseract Infosystems, our core engineering philosophy, custom software platforms, cloud-native architectures, and robust enterprise engineering standards.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/about',
  },
  openGraph: {
    title: 'About Us & Core Engineering Ethos | Tesseract Infosystems',
    description: 'Learn about Tesseract Infosystems, our core engineering philosophy, custom software platforms, cloud-native architectures, and robust enterprise engineering standards.',
    url: 'https://tesseractinfosystems.com/about',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract About Us' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us & Core Engineering Ethos | Tesseract Infosystems',
    description: 'Learn about Tesseract Infosystems, our core engineering philosophy, custom software platforms, cloud-native architectures, and robust enterprise engineering standards.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'About', item: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <AboutClient />
    </>
  );
}

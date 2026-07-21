import type { Metadata } from 'next';
import ContactClient from '../../client-pages/Contact';
import { getBreadcrumbSchema, getLocalBusinessSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Contact Us & Request Architecture Quotes',
  description: 'Get in touch with Tesseract Infosystems in Baramati & Pune. Configure software stack requirements and request custom project architecture quotes.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/contact',
  },
  openGraph: {
    title: 'Contact Us & Request Architecture Quotes | Tesseract Infosystems',
    description: 'Get in touch with Tesseract Infosystems in Baramati & Pune. Configure software stack requirements and request custom project architecture quotes.',
    url: 'https://tesseractinfosystems.com/contact',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Contact Us' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us & Request Architecture Quotes | Tesseract Infosystems',
    description: 'Get in touch with Tesseract Infosystems in Baramati & Pune. Configure software stack requirements and request custom project architecture quotes.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Contact', item: '/contact' },
  ]);
  const localBusiness = getLocalBusinessSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <ContactClient />
    </>
  );
}

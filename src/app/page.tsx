import type { Metadata } from 'next';
import HomeClient from '../client-pages/Home';
import { getBreadcrumbSchema, getServicesListSchema } from '../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Tesseract Tech & Cloud Systems | Enterprise Software Firm',
  description: 'Tesseract Infosystems designs and deploys custom enterprise software, cloud-native architectures, AI & automation solutions, digital marketing, and IT staffing.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com',
  },
  openGraph: {
    title: 'Tesseract Tech & Cloud Systems | Enterprise Software Firm',
    description: 'Tesseract Infosystems designs and deploys custom enterprise software, cloud-native architectures, AI & automation solutions, digital marketing, and IT staffing.',
    url: 'https://tesseractinfosystems.com',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract InfoSystems Logo' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesseract Tech & Cloud Systems | Enterprise Software Firm',
    description: 'Tesseract Infosystems designs and deploys custom enterprise software, cloud-native architectures, AI & automation solutions, digital marketing, and IT staffing.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([{ name: 'Home', item: '/' }]);
  const servicesSchema = getServicesListSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <HomeClient />
    </>
  );
}

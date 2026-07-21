import type { Metadata } from 'next';
import ServicesClient from '../../client-pages/Services';
import { getBreadcrumbSchema, getServicesListSchema, getFAQSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Services, Cloud Architectures & Cost Estimator',
  description: 'Explore software engineering services, cloud-native deployments, AI automation, digital marketing, IT staffing, and interactive cost estimations.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/services',
  },
  openGraph: {
    title: 'Services, Cloud Architectures & Cost Estimator | Tesseract Infosystems',
    description: 'Explore software engineering services, cloud-native deployments, AI automation, digital marketing, IT staffing, and interactive cost estimations.',
    url: 'https://tesseractinfosystems.com/services',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Services' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services, Cloud Architectures & Cost Estimator | Tesseract Infosystems',
    description: 'Explore software engineering services, cloud-native deployments, AI automation, digital marketing, IT staffing, and interactive cost estimations.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
  ]);
  const servicesList = getServicesListSchema();
  const faqSchema = getFAQSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesClient />
    </>
  );
}

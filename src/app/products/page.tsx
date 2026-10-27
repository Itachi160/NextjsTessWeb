import type { Metadata } from 'next';
import ProductsClient from '../../client-pages/Products';

export const metadata: Metadata = {
  title: 'Proprietary Software Products & SaaS Platforms',
  description:
    'Explore proprietary software products by Tesseract InfoSystems: Garage 360 (Automotive OS), ERP Core, QuVouch (Customer Relationship & Merchant SaaS), Rent-It (Brokerage & Tenant App), Atithi (Hotel Management), and Gurukul-LMS.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/products',
  },
  openGraph: {
    title: 'Proprietary Software Products & SaaS Platforms | Tesseract InfoSystems',
    description:
      'Garage 360, Tesseract ERP, QuVouch, Rent-It, Atithi, and Gurukul-LMS. Engineered for scale, speed, and real-time operational efficiency.',
    url: 'https://tesseractinfosystems.com/products',
    siteName: 'Tesseract InfoSystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Products' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proprietary Software Products & SaaS Platforms | Tesseract InfoSystems',
    description:
      'Explore Garage 360, ERP Core, QuVouch, Rent-It, Atithi, and Gurukul-LMS.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function ProductsPage() {
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tesseract InfoSystems Software Products',
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        position: 1,
        name: 'Garage 360',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Cloud',
        description: 'Automotive workshop and multi-brand garage management operating system.',
      },
      {
        '@type': 'SoftwareApplication',
        position: 2,
        name: 'Tesseract ERP System',
        applicationCategory: 'ERPApplication',
        operatingSystem: 'Cloud-Native',
        description: 'Hyperscale enterprise resource planning suite for multi-warehouse and accounting.',
      },
      {
        '@type': 'SoftwareApplication',
        position: 3,
        name: 'QuVouch',
        applicationCategory: 'MarketingApplication',
        operatingSystem: 'Web, Cloud-Native',
        description: 'Customer loyalty management, multi-location merchant presence, and digital relationship platform (In Active Development).',
      },
      {
        '@type': 'SoftwareApplication',
        position: 4,
        name: 'Rent-It',
        applicationCategory: 'RealEstateApplication',
        operatingSystem: 'Web, Mobile',
        description: 'Real estate and brokerage management application for brokers, flats, and rentals.',
      },
      {
        '@type': 'SoftwareApplication',
        position: 5,
        name: 'Atithi',
        applicationCategory: 'HospitalityApplication',
        operatingSystem: 'Cloud-Native',
        description: 'Hotel, resort, and guest hospitality management system with contactless check-in.',
      },
      {
        '@type': 'SoftwareApplication',
        position: 6,
        name: 'Gurukul-LMS',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web, Cloud',
        description: 'Learning management system for coaching institutes, live classes, and certifications.',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductsClient />
    </>
  );
}

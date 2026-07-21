import type { Metadata } from 'next';
import CareersClient from '../../client-pages/Careers';
import { getBreadcrumbSchema, getJobPostingsSchema } from '../../lib/seoSchemas';

export const metadata: Metadata = {
  title: 'Careers & Engineering Job Openings',
  description: 'Join the engineering team at Tesseract Infosystems. Explore open positions for Java software engineers, cloud architects, and deep learning interns.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/careers',
  },
  openGraph: {
    title: 'Careers & Engineering Job Openings | Tesseract Infosystems',
    description: 'Join the engineering team at Tesseract Infosystems. Explore open positions for Java software engineers, cloud architects, and deep learning interns.',
    url: 'https://tesseractinfosystems.com/careers',
    siteName: 'Tesseract Infosystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Careers' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers & Engineering Job Openings | Tesseract Infosystems',
    description: 'Join the engineering team at Tesseract Infosystems. Explore open positions for Java software engineers, cloud architects, and deep learning interns.',
    images: ['/Logo%20Hd.png'],
  },
};

export default function Page() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Careers', item: '/careers' },
  ]);
  const jobPostings = getJobPostingsSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {jobPostings.map((job, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(job) }}
        />
      ))}
      <CareersClient />
    </>
  );
}

import type { Metadata } from 'next';
import CareersClient from '../../client-pages/Careers';

export const metadata: Metadata = {
  title: 'Careers & Opportunities',
  description: 'Join the engineering team at Tesseract Infosystems. Explore open positions in cloud, database, UI, backend, and DevOps engineering.',
};

export default function Page() {
  return <CareersClient />;
}

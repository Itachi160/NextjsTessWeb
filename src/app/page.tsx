import type { Metadata } from 'next';
import HomeClient from '../client-pages/Home';

export const metadata: Metadata = {
  title: 'Tesseract Infosystems | Powering Innovation Through Engineering',
  description: 'Discover Tesseract Infosystems, a world-class software engineering, cloud, AI, and digital transformation company building hyperscale enterprise solutions.',
};

export default function Page() {
  return <HomeClient />;
}

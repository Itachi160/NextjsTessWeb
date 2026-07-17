import type { Metadata } from 'next';
import HomeClient from '../client-pages/Home';

export const metadata: Metadata = {
  title: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
  description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom enterprise software, cloud-native architectures, and high-performance AI systems.',
};

export default function Page() {
  return <HomeClient />;
}

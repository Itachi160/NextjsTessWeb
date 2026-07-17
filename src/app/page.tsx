import type { Metadata } from 'next';
import HomeClient from '../client-pages/Home';

export const metadata: Metadata = {
  title: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
  description: 'Tesseract Infosystems (Tesseract Tech) is an enterprise custom software engineering, cloud architecture, and AI systems development company building hyperscale solutions.',
};

export default function Page() {
  return <HomeClient />;
}

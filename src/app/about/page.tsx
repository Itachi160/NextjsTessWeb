import type { Metadata } from 'next';
import AboutClient from '../../client-pages/About';

export const metadata: Metadata = {
  title: 'About Our Engineering Philosophy',
  description: 'Learn about Tesseract Infosystems, our core engineering philosophy, software architecture designs, and digital transformation goals.',
};

export default function Page() {
  return <AboutClient />;
}

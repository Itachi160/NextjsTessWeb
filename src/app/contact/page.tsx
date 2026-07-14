import type { Metadata } from 'next';
import ContactClient from '../../client-pages/Contact';

export const metadata: Metadata = {
  title: 'Configure Stacks & Get In Touch',
  description: 'Get in touch with Tesseract Infosystems core network node. Configure your software stack requirements and initiate a project quote request.',
};

export default function Page() {
  return <ContactClient />;
}

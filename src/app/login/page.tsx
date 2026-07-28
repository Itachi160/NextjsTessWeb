import type { Metadata } from 'next';
import LoginClient from '../../client-pages/Login';

export const metadata: Metadata = {
  title: 'Secure Access Gateway | Tesseract Infosystems',
  description: 'Authorized portal login gateway for Tesseract Infosystems client infrastructure.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/login',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return <LoginClient />;
}

import type { Metadata } from 'next';
import LoginClient from '../../client-pages/Login';

export const metadata: Metadata = {
  title: 'Secure Access Gateway | Tesseract Infosystems',
};

export default function Page() {
  return <LoginClient />;
}

import type { Metadata } from 'next';
import LegalTrustModal from '../../components/LegalTrustModal';

export const metadata: Metadata = {
  title: 'Cookie Policy & Tracking Preferences | Tesseract Infosystems',
  description:
    'Information on how Tesseract Infosystems uses essential and performance cookies across our web portal and applications.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/cookie-policy',
  },
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="h-screen max-h-screen overflow-hidden pt-20 sm:pt-24 pb-3 sm:pb-4 px-3 sm:px-6 md:px-8 bg-[#03060f] flex flex-col">
      <div className="max-w-4xl w-full mx-auto flex flex-col flex-1 min-h-0 gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyber-cyan transition-colors w-fit group shrink-0 py-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage</span>
        </Link>
        <LegalTrustModal initialTab="cookies" isEmbedded={true} />
      </div>
    </div>
  );
}

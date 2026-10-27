import type { Metadata } from 'next';
import LegalTrustModal from '../../components/LegalTrustModal';

export const metadata: Metadata = {
  title: 'Cookie Policy & Tracking Preferences | Tesseract InfoSystems',
  description:
    'Information on how Tesseract InfoSystems uses essential and performance cookies across our web portal and applications.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/cookie-policy',
  },
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#03060f]">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-cyber-cyan transition-colors w-fit group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Return to Homepage</span>
        </Link>
        <LegalTrustModal initialTab="cookies" isEmbedded={true} />
      </div>
    </div>
  );
}

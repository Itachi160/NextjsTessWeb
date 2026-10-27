import type { Metadata } from 'next';
import LegalTrustModal from '../../components/LegalTrustModal';

export const metadata: Metadata = {
  title: 'Security Architecture & Data Safety | Tesseract InfoSystems',
  description:
    'Explore the zero-trust cybersecurity standards, TLS 1.3 encryption, and cloud resilience safeguarding Tesseract InfoSystems and QuVouch platforms.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/security',
  },
};

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SecurityPage() {
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
        <LegalTrustModal initialTab="security" isEmbedded={true} />
      </div>
    </div>
  );
}

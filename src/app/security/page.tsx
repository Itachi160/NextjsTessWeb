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

export default function SecurityPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#03060f]">
      <div className="max-w-4xl mx-auto">
        <LegalTrustModal initialTab="security" isEmbedded={true} />
      </div>
    </div>
  );
}

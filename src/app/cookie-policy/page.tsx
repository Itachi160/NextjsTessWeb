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

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#03060f]">
      <div className="max-w-4xl mx-auto">
        <LegalTrustModal initialTab="cookies" isEmbedded={true} />
      </div>
    </div>
  );
}

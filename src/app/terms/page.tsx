import type { Metadata } from 'next';
import LegalTrustModal from '../../components/LegalTrustModal';

export const metadata: Metadata = {
  title: 'Terms of Service & Project Agreement | Tesseract InfoSystems',
  description:
    'Review the Terms of Service for Tesseract InfoSystems and our software platforms including QuVouch. Transparent service scope, IP rights, and Google Business Profile Third-Party Policy disclosures.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/terms',
  },
  openGraph: {
    title: 'Terms of Service & QuVouch Project Agreement | Tesseract InfoSystems',
    description:
      'Terms of Service and Google Business Profile Third-Party Policy disclosures for Tesseract InfoSystems and QuVouch.',
    url: 'https://tesseractinfosystems.com/terms',
    siteName: 'Tesseract InfoSystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Terms of Service' }],
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#03060f]">
      <div className="max-w-4xl mx-auto">
        <LegalTrustModal initialTab="terms" isEmbedded={true} />
      </div>
    </div>
  );
}

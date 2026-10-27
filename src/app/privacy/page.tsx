import type { Metadata } from 'next';
import LegalTrustModal from '../../components/LegalTrustModal';

export const metadata: Metadata = {
  title: 'Privacy Policy & QuVouch Compliance | Tesseract InfoSystems',
  description:
    'Read the official Privacy Policy for Tesseract InfoSystems and our QuVouch application. Strict adherence to Google API Services User Data Policy and Limited Use requirements.',
  alternates: {
    canonical: 'https://tesseractinfosystems.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy & QuVouch Compliance | Tesseract InfoSystems',
    description:
      'Official Privacy Policy for Tesseract InfoSystems and QuVouch. Google Cloud and Business Profile API compliance.',
    url: 'https://tesseractinfosystems.com/privacy',
    siteName: 'Tesseract InfoSystems',
    images: [{ url: '/Logo%20Hd.png', width: 1200, height: 630, alt: 'Tesseract Privacy Policy' }],
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8 bg-[#03060f]">
      <div className="max-w-4xl mx-auto">
        <LegalTrustModal initialTab="privacy" isEmbedded={true} />
      </div>
    </div>
  );
}

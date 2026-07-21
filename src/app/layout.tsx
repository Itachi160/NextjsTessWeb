import type { Metadata } from 'next';
import { Outfit, Inter, Fira_Code } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';
import '../index.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tesseractinfosystems.com'),
  title: {
    default: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
    template: '%s | Tesseract Tech & Systems',
  },
  description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, and high-performance enterprise AI systems.',
  keywords: [
    'Tesseract Tech',
    'Tesseract Sys',
    'Tesseract Infosystems',
    'Enterprise Software Engineering',
    'Cloud-Native Cloud Systems',
    'Custom Software Platforms',
    'Artificial Intelligence Solutions',
    'Software Architecture',
    'Immersive UI Design',
    'PostgreSQL',
    'React Next.js Architecture',
    'Pune Software Company',
    'Baramati IT Systems'
  ],
  authors: [{ name: 'Tesseract Infosystems Team' }],
  creator: 'Tesseract Infosystems',
  publisher: 'Tesseract Infosystems',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
    description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, and high-performance enterprise AI systems.',
    url: 'https://tesseractinfosystems.com',
    siteName: 'Tesseract Infosystems',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
    description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, and high-performance enterprise AI systems.',
    creator: '@tesseractsys',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${firaCode.variable} scrollbar-none`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Tesseract Infosystems",
              "image": "https://tesseractinfosystems.com/Logo%20Hd.png",
              "@id": "https://tesseractinfosystems.com/#organization",
              "url": "https://tesseractinfosystems.com",
              "telephone": "+91 20 5555 0199",
              "email": "contact@tesseractinfosystems.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Ozarde Estate, Tc College Road",
                "addressLocality": "Baramati, Pune",
                "postalCode": "413102",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 18.1565,
                "longitude": 74.5771
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.linkedin.com/company/tesseractsys",
                "https://github.com/tesseractsys"
              ]
            })
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

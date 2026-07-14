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
  metadataBase: new URL('https://tesseractsys.com'),
  title: {
    default: 'Tesseract Infosystems | Enterprise Software & Cloud Engineering',
    template: '%s | Tesseract Infosystems',
  },
  description: 'Tesseract Infosystems designs and deploys immersive, high-performance, enterprise-grade cloud systems, custom software platforms, and artificial intelligence solutions.',
  keywords: [
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
    title: 'Tesseract Infosystems | Enterprise Software & Cloud Engineering',
    description: 'Tesseract Infosystems designs and deploys immersive, high-performance, enterprise-grade cloud systems, custom software platforms, and artificial intelligence solutions.',
    url: 'https://tesseractsys.com',
    siteName: 'Tesseract Infosystems',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesseract Infosystems | Enterprise Software & Cloud Engineering',
    description: 'Tesseract Infosystems designs and deploys immersive, high-performance, enterprise-grade cloud systems, custom software platforms, and artificial intelligence solutions.',
    creator: '@tesseractsys',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/Logo Hd.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${firaCode.variable} scrollbar-none`}>
      <head>
        {/* Preconnect to JSdelivr CDN for icons, matching index.html */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/Logo Hd.webp" fetchPriority="high" />
        {/* JSON-LD Structured Data Schema Markup to help Google index business parameters */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Tesseract Infosystems",
              "image": "https://tesseractsys.com/Logo%20Hd.png",
              "@id": "https://tesseractsys.com/#organization",
              "url": "https://tesseractsys.com",
              "telephone": "+91 20 5555 0199",
              "email": "contact@tesseractsys.com",
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
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

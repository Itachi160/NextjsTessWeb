import type { Metadata } from 'next';
import { Outfit, Inter, Fira_Code } from 'next/font/google';
import ClientLayout from '../components/ClientLayout';
import { getOrganizationSchema, getWebSiteSchema, getLocalBusinessSchema } from '../lib/seoSchemas';
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
  description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, AI & automation solutions, and high-performance enterprise systems.',
  keywords: [
    'Tesseract Tech',
    'Tesseract Sys',
    'Tesseract Infosystems',
    'Enterprise Software Engineering',
    'Cloud-Native Systems',
    'Custom Software Platforms',
    'AI & Automation Solutions',
    'Digital Marketing Services',
    'IT Staffing Solutions',
    'Software Architecture',
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
    description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, AI & automation solutions, and high-performance enterprise systems.',
    url: 'https://tesseractinfosystems.com',
    siteName: 'Tesseract Infosystems',
    images: [
      {
        url: '/Logo%20Hd.png',
        width: 1200,
        height: 630,
        alt: 'Tesseract InfoSystems Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tesseract Tech & Cloud Systems | Tesseract Infosystems',
    description: 'Tesseract Infosystems (Tesseract Tech) designs and deploys custom software platforms, cloud-native architectures, AI & automation solutions, and high-performance enterprise systems.',
    images: ['/Logo%20Hd.png'],
    creator: '@tesseractsys',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
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
  const orgSchema = getOrganizationSchema();
  const siteSchema = getWebSiteSchema();
  const localBizSchema = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${firaCode.variable} scrollbar-none`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizSchema) }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tesseractsys.com';
  const routes = ['', '/about', '/services', '/solutions', '/careers', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/contact' ? 0.9 : 0.8,
  }));
}

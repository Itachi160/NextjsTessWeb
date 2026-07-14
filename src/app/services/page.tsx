import type { Metadata } from 'next';
import ServicesClient from '../../client-pages/Services';

export const metadata: Metadata = {
  title: 'Services & Architecture Design',
  description: 'Explore our engineering services, from cloud-native software architecture, database clustering, to immersive frontends and custom development.',
};

export default function Page() {
  return <ServicesClient />;
}

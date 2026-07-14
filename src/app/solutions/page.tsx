import type { Metadata } from 'next';
import SolutionsClient from '../../client-pages/Solutions';

export const metadata: Metadata = {
  title: 'Enterprise Solutions Blueprint',
  description: 'View our enterprise business solutions, custom server architectures, database shard designs, and AI orchestration engines.',
};

export default function Page() {
  return <SolutionsClient />;
}

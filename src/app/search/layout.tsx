import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Search Bhagavad Gita Verses | OpenSacred',
  description: 'Search all 700 verses of the Bhagavad Gita by keyword, theme, or concept. Find verses about Dharma, Karma, Atman, devotion, meditation, liberation, and more.',
  alternates: {
    canonical: `${SITE_URL}/search`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

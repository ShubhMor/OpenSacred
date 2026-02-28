import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import LibraryHomePage from '@/components/library-home';

export const metadata: Metadata = {
  title: 'Hindu Scripture Library — Bhagavad Gita, Upanishads & More',
  description:
    'OpenSacred is a free, ad-free digital library of Hindu sacred texts. Read the complete Bhagavad Gita (all 700 verses) with Sanskrit, transliteration, English translation, and multi-scholar commentary. More texts coming soon.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'OpenSacred — Hindu Scripture Library | Bhagavad Gita & Sacred Texts',
    description:
      'Free online library of Hindu sacred texts. Read the complete Bhagavad Gita with Sanskrit originals, transliterations, English translations, and scholarly commentary.',
    url: SITE_URL,
    type: 'website',
  },
};

export default function Home() {
  return <LibraryHomePage />;
}

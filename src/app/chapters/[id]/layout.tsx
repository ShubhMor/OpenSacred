import { Metadata } from 'next';
import { chapters, getChapterById } from '@/data/chapters';

interface Props {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

import { SITE_URL } from '@/lib/config';

export async function generateStaticParams() {
  return chapters.map(c => ({ id: String(c.number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const chapterId = parseInt(id);
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return { title: 'Chapter Not Found | Bhagavad Gita' };
  }

  const title = chapter.number === 0
    ? 'Introduction to the Bhagavad Gita | Setting & Context'
    : `Bhagavad Gita Chapter ${chapter.number}: ${chapter.englishTitle} | ${chapter.sanskritTitle}`;

  // Keep descriptions tight: 140-158 chars
  const description = chapter.number === 0
    ? 'Introduction to the Bhagavad Gita — the setting of Kurukshetra and the opening of Krishna\'s divine discourse with Arjuna. Sanskrit, translation & commentary.'
    : `BG Chapter ${chapter.number} (${chapter.sanskritTitle}): ${chapter.summary.slice(0, 100).trimEnd()}… All ${chapter.verseCount} verses in Sanskrit, translation & commentary.`;

  const trimmedDesc = description.length > 160 ? description.slice(0, 157) + '…' : description;
  const canonicalUrl = `${SITE_URL}/chapters/${chapter.number}`;

  // Per-chapter structured data: BookChapter — signals semantic structure to search engines and AI
  const structuredData = chapter.number === 0 ? null : {
    '@context': 'https://schema.org',
    '@type': 'Chapter',
    name: `Chapter ${chapter.number}: ${chapter.englishTitle}`,
    alternateName: chapter.sanskritTitle,
    position: chapter.number,
    description: chapter.summary,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'Book',
      name: 'Bhagavad Gita',
      url: `${SITE_URL}/chapters`,
      author: { '@type': 'Person', name: 'Vyasa' },
    },
    about: chapter.topics.map(t => ({ '@type': 'Thing', name: t })),
    keywords: chapter.keyTeachings,
    inLanguage: ['en', 'sa'],
    numberOfItems: chapter.verseCount,
  };

  return {
    title,
    description: trimmedDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: trimmedDesc,
      url: canonicalUrl,
      type: 'book',
      siteName: 'OpenSacred — Hindu Scripture Library',
    },
    twitter: {
      card: 'summary',
      title,
      description: trimmedDesc,
    },
    ...(structuredData ? {
      other: { 'application/ld+json': JSON.stringify(structuredData) }
    } : {}),
  };
}

export default function ChapterLayout({ children }: Props) {
  return <>{children}</>;
}

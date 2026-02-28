import { Metadata } from 'next';
import { chapters, getChapterById } from '@/data/chapters';
import { getVersesByChapter } from '@/data/verses';

interface Props {
  params: Promise<{ id: string; verseId: string }>;
  children: React.ReactNode;
}

import { SITE_URL } from '@/lib/config';

export async function generateStaticParams() {
  const params: { id: string; verseId: string }[] = [];
  for (const chapter of chapters.filter(c => c.number > 0)) {
    const verses = getVersesByChapter(chapter.number);
    for (const verse of verses) {
      params.push({ id: String(chapter.number), verseId: String(verse.verseNumber) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; verseId: string }> }): Promise<Metadata> {
  const { id, verseId } = await params;
  const chapterId = parseInt(id);
  const verseNumber = parseInt(verseId);
  const chapter = getChapterById(chapterId);
  const verses = getVersesByChapter(chapterId);
  const verse = verses.find(v => v.verseNumber === verseNumber);

  if (!chapter || !verse) {
    return { title: 'Verse Not Found | Bhagavad Gita' };
  }

  const verseRef = `${chapterId}.${verseNumber}`;
  const title = `Bhagavad Gita ${verseRef} | ${chapter.sanskritTitle} | Sanskrit & English`;

  // Use actual englishTranslation field (was broken: verse.translations doesn't exist)
  const translationSnippet = verse.englishTranslation.length > 120
    ? verse.englishTranslation.slice(0, 117) + '…'
    : verse.englishTranslation;
  const description = `BG ${verseRef}: "${translationSnippet}" — Sanskrit, transliteration, translation & commentary by Shankaracharya, Ramanujacharya & Madhvacharya.`;
  const trimmedDesc = description.length > 160 ? description.slice(0, 157) + '…' : description;

  const canonicalUrl = `${SITE_URL}/chapters/${chapterId}/verses/${verseNumber}`;

  // Per-verse structured data: Quotation schema — what AI systems index for citations
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Quotation',
    text: verse.englishTranslation,
    spokenByCharacter: {
      '@type': 'Person',
      name: verse.speaker,
    },
    isPartOf: {
      '@type': 'Book',
      name: 'Bhagavad Gita',
      author: { '@type': 'Person', name: 'Vyasa' },
    },
    position: verseRef,
    inLanguage: 'en',
    url: canonicalUrl,
    about: chapter.topics.map(t => ({ '@type': 'Thing', name: t })),
  };

  return {
    title,
    description: trimmedDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description: trimmedDesc,
      url: canonicalUrl,
      type: 'article',
      siteName: 'OpenSacred — Hindu Scripture Library',
    },
    twitter: {
      card: 'summary',
      title,
      description: trimmedDesc,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
  };
}

export default function VerseLayout({ children }: Props) {
  return <>{children}</>;
}

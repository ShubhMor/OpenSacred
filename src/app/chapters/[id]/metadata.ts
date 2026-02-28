import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import { getChapterById } from '@/data/chapters';

export async function generateChapterMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const chapterId = parseInt(id);
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return {
      title: 'Chapter Not Found | Bhagavad Gita',
    };
  }

  const title = chapter.number === 0
    ? `Introduction to the Bhagavad Gita | OpenSacred`
    : `Bhagavad Gita Chapter ${chapter.number}: ${chapter.englishTitle} (${chapter.sanskritTitle})`;

  const description = chapter.number === 0
    ? `An introduction to the Bhagavad Gita — its origin, significance, and the setting of the great battle of Kurukshetra where Krishna imparts divine wisdom to Arjuna.`
    : `Read Bhagavad Gita Chapter ${chapter.number} — ${chapter.englishTitle} (${chapter.sanskritTitle}). ${chapter.summary} Contains ${chapter.verseCount} verses with Sanskrit, transliteration, English translation, and commentary.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/chapters/${chapter.number}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/chapters/${chapter.number}`,
      type: 'article',
    },
  };
}

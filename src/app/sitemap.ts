import { MetadataRoute } from 'next';
import { chapters } from '@/data/chapters';
import { getVersesByChapter } from '@/data/verses';

import { SITE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/chapters`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // /search intentionally excluded — search result pages should not be indexed
    // /bookmarks intentionally excluded — user-specific, not public content
  ];

  // Chapter pages (1–18 only; chapter 0 is intro/thin content)
  const chapterPages: MetadataRoute.Sitemap = chapters
    .filter((c) => c.number > 0)
    .map((chapter) => ({
      url: `${SITE_URL}/chapters/${chapter.number}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  // Verse pages
  const versePages: MetadataRoute.Sitemap = chapters
    .filter((c) => c.number > 0)
    .flatMap((chapter) => {
      const verses = getVersesByChapter(chapter.number);
      return verses.map((verse) => ({
        url: `${SITE_URL}/chapters/${chapter.number}/verses/${verse.verseNumber}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    });

  return [...staticPages, ...chapterPages, ...versePages];
}

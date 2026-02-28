import { Metadata } from 'next';
import { SITE_URL } from '@/lib/config';
import Link from 'next/link';
import Image from 'next/image';
import { chapters } from '@/data/chapters';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All 18 Chapters of the Bhagavad Gita | Sanskrit & English',
  description:
    'All 18 chapters of the Bhagavad Gita — Sanskrit title, verse count, summary & full verse-by-verse reading. From Arjuna\'s Dilemma (Ch 1) to Liberation (Ch 18).',
  alternates: {
    canonical: `${SITE_URL}/chapters`,
  },
  openGraph: {
    title: 'All 18 Chapters of the Bhagavad Gita',
    description:
      'All 700 verses across 18 chapters — Sanskrit, transliteration, English translation & Advaita, Vishishtadvaita & Dvaita commentary.',
    url: `${SITE_URL}/chapters`,
  },
};

export default function ChaptersPage() {
  // Chapter 0 is the Introduction entry — exclude it from displayed stats
  const namedChapters = chapters.filter(c => c.number > 0);
  const totalVerses = namedChapters.reduce((total, chapter) => total + chapter.verseCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-r [background:linear-gradient(135deg,var(--brand-subtle)_0%,transparent_70%)]">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-3 sm:mb-4 text-muted-foreground hover:text-foreground touch-target">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Library
            </Button>
          </Link>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              All Chapters
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Journey through the divine discourse between Lord Krishna and Arjuna.
            </p>
            <div className="flex items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand" />
                <span className="font-medium">{namedChapters.length} Chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{totalVerses} Verses</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="grid gap-3 sm:gap-4">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/chapters/${chapter.number}`}
                className="group block"
              >
                <Card className="hover:border-brand hover:shadow-md transition-all">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Chapter Thumbnail / Number */}
                      <div className={`relative flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-md group-hover:scale-105 transition-transform overflow-hidden ${
                        chapter.number === 0 
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white'
                          : 'bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)] text-white'
                      }`}>
                        {chapter.imageUrl ? (
                          <Image src={chapter.imageUrl} alt={chapter.englishTitle} fill className="object-cover" />
                        ) : (
                          chapter.number === 0 ? 'ॐ' : chapter.number
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            {chapter.sanskritTitle && (
                              <p className="text-xs text-brand font-medium mb-0.5">
                                {chapter.sanskritTitle}
                              </p>
                            )}
                            <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-brand transition-colors">
                              {chapter.englishTitle}
                            </h2>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-0.5 sm:mt-1">
                              {chapter.summary}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {chapter.verseCount > 0 && (
                              <Badge variant="outline" className="text-xs hidden sm:flex">
                                {chapter.verseCount} verses
                              </Badge>
                            )}
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        
                        {/* Mobile verse count */}
                        {chapter.verseCount > 0 && (
                          <div className="mt-1.5 sm:hidden">
                            <Badge variant="outline" className="text-xs">
                              {chapter.verseCount} verses
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

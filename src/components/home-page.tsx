'use client';

import { useMemo, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { chapters } from '@/data/chapters';
import { verses } from '@/data/verses';
import { getSpeakerById } from '@/data/speakers';
import { useVerseOfTheDay } from '@/hooks/use-verse-of-day';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export default function HomePage() {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const [showSanskrit, setShowSanskrit] = useState(false);

  const getRandomVerseId = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex].id;
  }, []);

  const { verseId } = useVerseOfTheDay(getRandomVerseId);

  const verseOfTheDay = useMemo(() => {
    if (!verseId) return verses[0];
    return verses.find(v => v.id === verseId) || verses[0];
  }, [verseId]);

  const totalVerses = useMemo(() => {
    return chapters.reduce((total, chapter) => total + chapter.verseCount, 0);
  }, []);

  const speaker = getSpeakerById(verseOfTheDay.speaker);

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="border-b border-border/60" style={{ background: 'linear-gradient(135deg, rgba(176,132,57,0.08) 0%, rgba(176,132,57,0.03) 60%, transparent 100%)' }}>
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="max-w-2xl mx-auto text-center">
            {/* Logo mark above title */}
            <div className="flex justify-center mb-5">
              <Image src="/images/logo-no-bg.jpg" alt="" width={56} height={56} className="object-contain opacity-90" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
              <span style={{
                background: 'linear-gradient(135deg, #8a6428 0%, #b08439 50%, #c8a05a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                display: 'inline',
              }}>
                Bhagavad Gita
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-7 leading-relaxed">
              The Song of the Lord — A timeless guide to life, duty, and spiritual liberation
            </p>
            <div className="flex items-center justify-center gap-5 sm:gap-7 text-xs sm:text-sm text-muted-foreground">
              <span>18 Chapters</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{totalVerses} Verses</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>5,000+ Years Old</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Verse of the Day ── */}
      <section className="container mx-auto px-4 py-7 sm:py-9">
        <Card className="max-w-3xl mx-auto" style={{ borderColor: 'var(--brand-border)', background: 'linear-gradient(135deg, var(--brand-subtle) 0%, transparent 70%)' }}>
          <CardContent className="p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--brand)' }}>
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold tracking-wide">Verse of the Day</span>
              <span className="ml-auto text-xs text-muted-foreground">
                Chapter {verseOfTheDay.chapterId}, Verse {verseOfTheDay.verseNumber}
              </span>
            </div>

            <p className="reading-text text-foreground mb-3">
              {verseOfTheDay.englishTranslation}
            </p>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
              {verseOfTheDay.generalMeaning}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSanskrit(!showSanskrit)}
              className="text-xs mr-2 border-brand hover:bg-brand-subtle hover:text-brand"
            >
              {showSanskrit ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
              Sanskrit
            </Button>

            {showSanskrit && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="sanskrit-text mb-2" lang="sa">
                  {verseOfTheDay.sanskrit}
                </p>
                <p className="text-xs text-muted-foreground italic text-center tracking-wide">
                  {verseOfTheDay.transliteration}
                </p>
              </div>
            )}

            {speaker && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden" style={{ border: '1.5px solid var(--brand-border)' }}>
                    <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm text-muted-foreground">{speaker.name}</span>
                </div>
                <Link href={`/chapters/${verseOfTheDay.chapterId}/verses/${verseOfTheDay.verseNumber}`}>
                  <Button variant="ghost" size="sm" className="text-brand hover:text-brand hover:bg-brand-subtle text-sm">
                    Read More <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── All Chapters ── */}
      <section className="container mx-auto px-4 py-4 sm:py-6 pb-8 sm:pb-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-7 flex items-center gap-2.5">
            <BookOpen className="h-5 w-5" style={{ color: 'var(--brand)' }} />
            All Chapters
          </h2>

          <div className="grid gap-2.5 sm:gap-3">
            {chapters.map((chapter) => (
              <Link key={chapter.id} href={`/chapters/${chapter.number}`} className="group block">
                <Card className="card-hover border-border/70 hover:border-brand">
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="flex items-center gap-3.5 sm:gap-4">

                      {/* Chapter badge */}
                      <div className={`flex h-11 w-11 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-xl font-bold text-base sm:text-lg shadow-sm group-hover:scale-105 transition-transform text-white ${
                        chapter.number === 0
                          ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                          : ''
                      }`}
                        style={chapter.number !== 0 ? { background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%)' } : {}}>
                        {chapter.number === 0 ? 'ॐ' : chapter.number}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            {chapter.sanskritTitle && (
                              <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--brand)' }}>
                                {chapter.sanskritTitle}
                              </p>
                            )}
                            <h3 className="text-[0.95rem] sm:text-base font-semibold text-foreground group-hover:text-brand transition-colors leading-snug">
                              {chapter.englishTitle}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                              {chapter.summary}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                            {chapter.verseCount > 0 && (
                              <span className="text-xs text-muted-foreground hidden sm:block whitespace-nowrap">
                                {chapter.verseCount} verses
                              </span>
                            )}
                            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5" />
                          </div>
                        </div>
                        {chapter.verseCount > 0 && (
                          <div className="mt-1.5 sm:hidden">
                            <span className="text-xs text-muted-foreground">{chapter.verseCount} verses</span>
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
      </section>

      {/* ── Footer CTA ── */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <Card style={{ borderColor: 'var(--brand-border)', background: 'linear-gradient(135deg, var(--brand-subtle) 0%, transparent 60%)' }}>
            <CardContent className="p-6 sm:p-9">
              <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                Begin Your Journey
              </h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Start with the Introduction and discover the timeless wisdom of the Gita,
                verse by verse.
              </p>
              <Link href="/chapters/0">
                <Button
                  className="text-white shadow-sm hover:shadow-md transition-shadow"
                  style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%)' }}
                >
                  Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

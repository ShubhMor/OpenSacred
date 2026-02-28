'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Verse } from '@/types/gita';
import { getSpeakerById } from '@/data/speakers';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, ArrowRight, Flame } from 'lucide-react';

interface VerseCardProps {
  verse: Verse;
  showChapter?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  compact?: boolean;
}

export function VerseCard({
  verse,
  showChapter = false,
  isBookmarked = false,
  onToggleBookmark,
  compact = false,
}: VerseCardProps) {
  const speaker = getSpeakerById(verse.speaker);
  const [showSanskrit, setShowSanskrit] = useState(false);

  if (compact) {
    return (
      <Link
        href={`/chapters/${verse.chapterId}/verses/${verse.verseNumber}`}
        className="block p-3 rounded-xl border border-border/70 bg-card hover:bg-brand-subtle hover:border-brand transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-semibold flex-shrink-0 shadow-sm"
            style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 100%)' }}>
            {verse.verseNumber}
          </div>
          <div className="flex-1 min-w-0">
            {showChapter && (
              <span className="text-xs text-muted-foreground">Chapter {verse.chapterId}</span>
            )}
            <p className="text-sm line-clamp-2 group-hover:text-brand transition-colors leading-relaxed">
              {verse.englishTranslation}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {speaker && (
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" />
              </div>
            )}
            <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Card className="group overflow-hidden card-hover border-border/70">
      <CardContent className="p-4 sm:p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href={`/chapters/${verse.chapterId}/verses/${verse.verseNumber}`}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl text-white font-semibold shadow-sm hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand) 60%, var(--brand-light) 100%)' }}
            >
              {verse.verseNumber}
            </Link>
            <div>
              {showChapter && (
                <Link
                  href={`/chapters/${verse.chapterId}`}
                  className="text-xs text-muted-foreground hover:text-brand transition-colors"
                >
                  Chapter {verse.chapterId}
                </Link>
              )}
              {speaker && (
                <div className="flex items-center gap-1.5">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden">
                    <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" />
                  </div>
                  <span className="text-xs text-muted-foreground">{speaker.name}</span>
                </div>
              )}
            </div>
          </div>
          {onToggleBookmark && (
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => { e.preventDefault(); onToggleBookmark(); }}
              className="h-8 w-8 hover:bg-brand-subtle"
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-brand" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Translation */}
        <p className="reading-text text-foreground mb-3">
          {verse.englishTranslation}
        </p>

        {/* Meaning */}
        <p className="text-sm text-muted-foreground mb-3.5 line-clamp-3 leading-relaxed">
          {verse.generalMeaning}
        </p>

        {/* Sanskrit Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSanskrit(!showSanskrit)}
          className="w-full text-xs mb-2 border-brand hover:bg-brand-subtle hover:text-brand transition-colors"
        >
          {showSanskrit ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
          {showSanskrit ? 'Hide' : 'Show'} Sanskrit
        </Button>

        {showSanskrit && (
          <div className="border-t border-border pt-4 mt-3 space-y-2.5">
            <p className="sanskrit-text" lang="sa">
              {verse.sanskrit}
            </p>
            <p className="text-xs text-muted-foreground italic text-center tracking-wide leading-relaxed">
              {verse.transliteration}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-border">
          <Link
            href={`/chapters/${verse.chapterId}/verses/${verse.verseNumber}`}
            className="text-sm font-medium flex items-center gap-1 hover:gap-1.5 transition-all"
            style={{ color: 'var(--brand)' }}
          >
            Read verse <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <div className="flex items-center gap-2">
            {verse.isHard && (
              <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                <Flame className="h-3 w-3" />
                Hard
              </Badge>
            )}
            {verse.commentaries.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {verse.commentaries.length} {verse.commentaries.length === 1 ? 'commentary' : 'commentaries'}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

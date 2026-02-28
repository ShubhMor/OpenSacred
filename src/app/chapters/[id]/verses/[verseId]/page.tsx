'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { chapters, getChapterById } from '@/data/chapters';
import { getVersesByChapter } from '@/data/verses';
import { getSpeakerById } from '@/data/speakers';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useReadingProgress } from '@/hooks/use-reading-progress';
import { useVerseLikes } from '@/hooks/use-verse-likes';
import { useCommentaryVotes } from '@/hooks/use-commentary-votes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Share2,
  Check,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Heart,
  Flame,
} from 'lucide-react';

interface VersePageProps {
  params: Promise<{ id: string; verseId: string }>;
}

export default function VersePage({ params }: VersePageProps) {
  const resolvedParams = use(params);
  const chapterId = parseInt(resolvedParams.id);
  const verseNumber = parseInt(resolvedParams.verseId);

  const [showSanskrit, setShowSanskrit] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { markRead } = useReadingProgress();

  const chapter = getChapterById(chapterId);
  const chapterVerses = getVersesByChapter(chapterId);
  const verse = chapterVerses.find(v => v.verseNumber === verseNumber);
  const speaker = verse ? getSpeakerById(verse.speaker) : null;

  const { likes, liked, toggleLike } = useVerseLikes(verse?.id ?? '');
  const commentaryIds = verse?.commentaries.map(c => c.id) ?? [];
  const { castVote, getVote } = useCommentaryVotes(commentaryIds);

  useEffect(() => {
    if (verse) markRead(verse.id);
  }, [verse, markRead]);

  if (!chapter || !verse) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-xl font-bold mb-4">Verse Coming Soon</h1>
          <p className="text-muted-foreground mb-6">
            Verse {verseNumber} of Chapter {chapterId} is being prepared.
          </p>
          <Link href={`/chapters/${chapterId}`}>
            <Button>Back to Chapter</Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevVerse = chapterVerses.find(v => v.verseNumber === verseNumber - 1);
  const nextVerse = chapterVerses.find(v => v.verseNumber === verseNumber + 1);
  const prevChapter = chapters.find(c => c.number === chapterId - 1);
  const nextChapter = chapters.find(c => c.number === chapterId + 1);
  const isFirstVerseOfChapter = verseNumber === chapterVerses[0]?.verseNumber;
  const isLastVerseOfChapter = verseNumber === chapterVerses[chapterVerses.length - 1]?.verseNumber;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bhagavad Gita — Chapter ${chapterId}, Verse ${verseNumber}`,
          text: verse.englishTranslation,
          url,
        });
      } catch {
        // cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const bookmarked = isBookmarked(verse.id);

  const traditionColor: Record<string, string> = {
    'Advaita Vedanta': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    'Vishishtadvaita': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Dvaita': 'bg-green-500/10 text-green-600 dark:text-green-400',
    'Vedantic': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    'Karma Yoga tradition': 'bg-brand-subtle text-brand',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Library</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href="/chapters" className="hover:text-foreground transition-colors">Bhagavad Gita</Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <Link href={`/chapters/${chapterId}`} className="hover:text-foreground transition-colors">
              Chapter {chapterId}
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="text-foreground">Verse {verseNumber}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">

          {/* Speaker Card */}
          {speaker && (
            <Card className="mb-4 sm:mb-6 border-brand/20 overflow-hidden">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r [var(--brand-subtle)] to-amber-500/5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-brand/30 flex-shrink-0 shadow-md">
                  <Image src={speaker.imageUrl} alt={speaker.name} fill className="object-cover" priority />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg sm:text-xl font-bold text-foreground">{speaker.name}</h2>
                    <Badge variant="outline" className="text-xs">{speaker.role}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                    {speaker.description}
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-muted/30 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Speaking:</span> Chapter {chapterId}, Verse {verseNumber}
                </p>
              </div>
            </Card>
          )}

          {/* Verse header + actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)] text-white font-bold shadow-md">
                {verse.verseNumber}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">Verse {verse.verseNumber}</p>
                  {verse.isHard && (
                    <Badge className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      Hard Verse
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{chapter.englishTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Like button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLike}
                className={`h-9 px-3 flex items-center gap-1.5 transition-colors ${
                  liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-400'
                }`}
                title={liked ? 'Unlike this verse' : 'Like this verse'}
              >
                <Heart className={`h-4 w-4 transition-all duration-150 ${liked ? 'fill-current scale-110' : ''}`} />
                {likes > 0 && <span className="text-xs font-medium tabular-nums">{likes}</span>}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleBookmark(verse.id, verse.chapterId, verse.verseNumber)}
                className="h-9 w-9"
                title={bookmarked ? 'Remove bookmark' : 'Bookmark verse'}
              >
                {bookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-brand" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="h-9 w-9"
                title={copied ? 'Copied!' : 'Share verse'}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* English Translation */}
          <Card className="mb-4 sm:mb-6">
            <CardContent className="p-4 sm:p-6">
              <p className="text-lg sm:text-xl leading-relaxed text-foreground font-medium">
                {verse.englishTranslation}
              </p>
            </CardContent>
          </Card>

          {/* Meaning */}
          <Card className="mb-4 sm:mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-4 w-4 text-brand" />
                <h3 className="text-sm font-medium text-muted-foreground">Context & Meaning</h3>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                {verse.generalMeaning}
              </p>
            </CardContent>
          </Card>

          {/* Sanskrit Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowSanskrit(!showSanskrit)}
            className="w-full mb-4"
          >
            {showSanskrit ? 'Hide Sanskrit' : 'Show Sanskrit'}
          </Button>

          {showSanskrit && (
            <Card className="mb-4 sm:mb-6 border-brand/10">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Sanskrit</p>
                  <p className="text-lg sm:text-xl leading-loose text-center" lang="sa">
                    {verse.sanskrit}
                  </p>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Transliteration</p>
                  <p className="text-sm italic text-center text-muted-foreground">
                    {verse.transliteration}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Commentaries */}
          {verse.commentaries.length > 0 && (
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Scholar Commentaries</h3>
                <span className="text-xs text-muted-foreground">
                  {verse.commentaries.length} {verse.commentaries.length === 1 ? 'commentary' : 'commentaries'} · Public domain
                </span>
              </div>

              {verse.commentaries.map((commentary) => {
                const vote = getVote(commentary.id);
                const tradClass = commentary.tradition
                  ? (traditionColor[commentary.tradition] ?? 'bg-muted/60 text-muted-foreground')
                  : '';
                return (
                  <Card key={commentary.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{commentary.scholar}</p>
                          {commentary.tradition && (
                            <span className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${tradClass}`}>
                              {commentary.tradition}
                            </span>
                          )}
                        </div>
                        {commentary.source && (
                          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{commentary.source}</span>
                        )}
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/90 mb-4">
                        {commentary.text}
                      </p>
                      {/* Like / dislike */}
                      <div className="flex items-center gap-2 pt-3 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => castVote(commentary.id, 'like')}
                          className={`h-8 px-3 text-xs gap-1.5 transition-colors ${
                            vote.userVote === 'like'
                              ? 'text-green-600 bg-green-500/10 dark:text-green-400'
                              : 'text-muted-foreground hover:text-green-600'
                          }`}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {vote.likes > 0 ? <span className="tabular-nums">{vote.likes}</span> : 'Helpful'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => castVote(commentary.id, 'dislike')}
                          className={`h-8 px-3 text-xs gap-1.5 transition-colors ${
                            vote.userVote === 'dislike'
                              ? 'text-red-600 bg-red-500/10 dark:text-red-400'
                              : 'text-muted-foreground hover:text-red-600'
                          }`}
                        >
                          <ThumbsDown className="h-3.5 w-3.5" />
                          {vote.dislikes > 0 ? <span className="tabular-nums">{vote.dislikes}</span> : 'Not helpful'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Verse Navigation */}
          <div className="flex items-center justify-between gap-3 py-4 border-t border-border">
            {prevVerse ? (
              <Link href={`/chapters/${chapterId}/verses/${prevVerse.verseNumber}`} className="flex-1">
                <Button variant="outline" className="w-full group touch-target">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Verse {prevVerse.verseNumber}</span>
                  <span className="sm:hidden">Previous</span>
                </Button>
              </Link>
            ) : isFirstVerseOfChapter && prevChapter ? (
              <Link href={`/chapters/${prevChapter.number}`} className="flex-1">
                <Button variant="outline" className="w-full group touch-target text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Ch {prevChapter.number}</span>
                  <span className="sm:hidden">Prev Ch</span>
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextVerse ? (
              <Link href={`/chapters/${chapterId}/verses/${nextVerse.verseNumber}`} className="flex-1">
                <Button variant="outline" className="w-full group touch-target">
                  <span className="hidden sm:inline">Verse {nextVerse.verseNumber}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : isLastVerseOfChapter && nextChapter ? (
              <Link href={`/chapters/${nextChapter.number}`} className="flex-1">
                <Button variant="outline" className="w-full group touch-target text-brand border-brand/30">
                  <span className="hidden sm:inline">Ch {nextChapter.number}: {nextChapter.englishTitle}</span>
                  <span className="sm:hidden">Next Ch</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Back to Chapter */}
          <Link href={`/chapters/${chapterId}`}>
            <Button variant="ghost" className="w-full mt-2 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapter {chapterId}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

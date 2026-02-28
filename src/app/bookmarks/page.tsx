'use client';

import Link from 'next/link';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { verses } from '@/data/verses';
import { VerseCard } from '@/components/verse-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bookmark, ArrowLeft, Trash2 } from 'lucide-react';

export default function BookmarksPage() {
  const { bookmarks, clearBookmarks, toggleBookmark, isBookmarked } = useBookmarks();

  const bookmarkedVerses = bookmarks
    .map(bookmark => verses.find(v => v.id === bookmark.verseId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b [--tw-gradient-from:var(--brand-subtle)] to-background">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground text-xs">
              <ArrowLeft className="mr-2 h-3 w-3" />
              Home
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground mb-1">
                Bookmarks
              </h1>
              <p className="text-xs text-muted-foreground">
                {bookmarks.length} verse{bookmarks.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            {bookmarks.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearBookmarks}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="mr-1.5 h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Bookmarked Verses */}
      <div className="container mx-auto px-4 py-4 max-w-2xl">
        {bookmarkedVerses.length > 0 ? (
          <div className="space-y-3">
            {bookmarkedVerses.map((verse) => (
              verse && (
                <VerseCard
                  key={verse.id}
                  verse={verse}
                  showChapter
                  isBookmarked={isBookmarked(verse.id)}
                  onToggleBookmark={() => toggleBookmark(verse.id, verse.chapterId, verse.verseNumber)}
                />
              )
            ))}
          </div>
        ) : (
          <Card className="bg-muted/30">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-subtle dark:bg-brand-subtle">
                  <Bookmark className="h-6 w-6 text-brand dark:text-brand-light" />
                </div>
              </div>
              <h2 className="text-base font-semibold text-foreground mb-2">No Bookmarks Yet</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Bookmark verses while reading for quick access later.
              </p>
              <Link href="/chapters">
                <Button className="bg-brand hover:bg-brand-dark text-white">
                  Explore Chapters
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

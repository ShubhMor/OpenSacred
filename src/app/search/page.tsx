'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSearch } from '@/hooks/use-search';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, BookOpen, FileText, Loader2, X } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const { query, searchResults, isSearching, handleSearch, clearSearch } = useSearch();

  // Seed from URL param on mount
  useEffect(() => {
    if (initialQuery) handleSearch(initialQuery);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Search the Gita
        </h1>

        {/* Live Search Input */}
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search verses, chapters, or keywords..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-10 h-12"
            autoFocus
          />
          {hasQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Spinner while debounce pending */}
      {isSearching && (
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Searching...</span>
        </div>
      )}

      {/* Results */}
      {!isSearching && hasQuery && (
        <div>
          <p className="text-muted-foreground mb-4">
            {searchResults.length === 0
              ? `No results for "${query}"`
              : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${query}"`}
          </p>

          {searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={result.type === 'verse' 
                    ? `/chapters/${result.chapterId}/verses/${result.verseNumber}`
                    : `/chapters/${result.chapterId}`
                  }
                  className="block"
                >
                  <Card className="hover:border-brand/30 hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${
                          result.type === 'chapter' 
                            ? 'bg-gradient-to-br from-blue-500 to-indigo-600' 
                            : 'bg-gradient-to-br [background:linear-gradient(135deg,var(--brand-dark)_0%,var(--brand)_60%,var(--brand-light)_100%)]'
                        } text-white`}>
                          {result.type === 'chapter' ? (
                            <BookOpen className="h-5 w-5" />
                          ) : (
                            <FileText className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {result.title}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.preview}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="bg-muted/30">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  No results found. Try different keywords or browse chapters directly.
                </p>
                <Link href="/chapters">
                  <Button variant="outline">Browse All Chapters</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Initial empty state */}
      {!hasQuery && !isSearching && (
        <Card className="bg-muted/30">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Type to search across all chapters and verses of the Bhagavad Gita.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

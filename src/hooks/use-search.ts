'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { SearchResult } from '@/types/gita';
import { verses } from '@/data/verses';
import { chapters } from '@/data/chapters';

export function useSearch(debounceMs = 200) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce: only update debouncedQuery after user stops typing
  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery('');
      return;
    }
    const t = setTimeout(() => setDebouncedQuery(query), debounceMs);
    return () => clearTimeout(t);
  }, [query, debounceMs]);

  const isSearching = query !== debouncedQuery && query.trim() !== '';

  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase().trim();
    const results: SearchResult[] = [];

    verses.forEach(verse => {
      if (
        verse.englishTranslation.toLowerCase().includes(q) ||
        verse.sanskrit.includes(debouncedQuery) ||
        verse.transliteration.toLowerCase().includes(q) ||
        verse.generalMeaning.toLowerCase().includes(q) ||
        verse.speaker.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'verse',
          id: verse.id,
          title: `Chapter ${verse.chapterId}, Verse ${verse.verseNumber}`,
          preview: verse.englishTranslation.substring(0, 150) + (verse.englishTranslation.length > 150 ? '...' : ''),
          chapterId: verse.chapterId,
          verseNumber: verse.verseNumber
        });
      }
    });

    chapters.forEach(chapter => {
      if (
        chapter.englishTitle.toLowerCase().includes(q) ||
        chapter.sanskritTitle.includes(debouncedQuery) ||
        chapter.summary.toLowerCase().includes(q) ||
        chapter.introduction.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'chapter',
          id: chapter.id.toString(),
          title: `Chapter ${chapter.number}: ${chapter.englishTitle}`,
          preview: chapter.summary.substring(0, 150) + (chapter.summary.length > 150 ? '...' : ''),
          chapterId: chapter.id
        });
      }
    });

    return results;
  }, [debouncedQuery]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    searchResults,
    isSearching,
    handleSearch,
    clearSearch
  };
}

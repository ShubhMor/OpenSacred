'use client';

import { useState, useEffect, useCallback } from 'react';
import { Bookmark } from '@/types/gita';

const BOOKMARKS_KEY = 'gita_bookmarks';

function getBookmarksFromStorage(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(BOOKMARKS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage after mount (client-side only)
  useEffect(() => {
    const stored = getBookmarksFromStorage();
    setBookmarks(stored);
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((verseId: string, chapterId: number, verseNumber: number) => {
    setBookmarks(prev => {
      if (prev.some(b => b.verseId === verseId)) {
        return prev;
      }
      return [...prev, {
        verseId,
        chapterId,
        verseNumber,
        savedAt: new Date().toISOString()
      }];
    });
  }, []);

  const removeBookmark = useCallback((verseId: string) => {
    setBookmarks(prev => prev.filter(b => b.verseId !== verseId));
  }, []);

  const toggleBookmark = useCallback((verseId: string, chapterId: number, verseNumber: number) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.verseId === verseId);
      if (exists) {
        return prev.filter(b => b.verseId !== verseId);
      }
      return [...prev, {
        verseId,
        chapterId,
        verseNumber,
        savedAt: new Date().toISOString()
      }];
    });
  }, []);

  const isBookmarked = useCallback((verseId: string) => {
    return bookmarks.some(b => b.verseId === verseId);
  }, [bookmarks]);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    clearBookmarks,
    isLoaded
  };
}

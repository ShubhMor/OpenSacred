'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'gita_read_verses';

function getRead(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function useReadingProgress() {
  const [readVerses, setReadVerses] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setReadVerses(getRead());
    setLoaded(true);
  }, []);

  const markRead = useCallback((verseId: string) => {
    setReadVerses(prev => {
      if (prev.has(verseId)) return prev;
      const next = new Set(prev);
      next.add(verseId);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const isRead = useCallback((verseId: string) => readVerses.has(verseId), [readVerses]);

  const getChapterProgress = useCallback(
    (chapterId: number, totalVerses: number) => {
      if (totalVerses === 0 || !loaded) return 0;
      let count = 0;
      readVerses.forEach(id => {
        if (id.startsWith(`${chapterId}-`)) count++;
      });
      return Math.min(count, totalVerses);
    },
    [readVerses, loaded]
  );

  return { markRead, isRead, getChapterProgress, loaded };
}

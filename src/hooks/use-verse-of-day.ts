'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const VERSE_OF_THE_DAY_KEY = 'gita_verse_of_the_day';
const VERSE_OF_THE_DAY_DATE_KEY = 'gita_verse_of_the_day_date';

export function useVerseOfTheDay(getRandomVerseId: () => string) {
  const [verseId, setVerseId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use a ref so the effect only runs once on mount, regardless of whether
  // the caller passes a stable/memoized function or not.
  const getRandomVerseIdRef = useRef(getRandomVerseId);
  useEffect(() => {
    getRandomVerseIdRef.current = getRandomVerseId;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(VERSE_OF_THE_DAY_DATE_KEY);
    const storedVerseId = localStorage.getItem(VERSE_OF_THE_DAY_KEY);

    let finalVerseId: string;

    if (storedDate === today && storedVerseId) {
      finalVerseId = storedVerseId;
    } else {
      finalVerseId = getRandomVerseIdRef.current();
      localStorage.setItem(VERSE_OF_THE_DAY_KEY, finalVerseId);
      localStorage.setItem(VERSE_OF_THE_DAY_DATE_KEY, today);
    }

    setVerseId(finalVerseId);
    setIsLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once on mount

  const refreshVerseOfTheDay = useCallback(() => {
    const newVerseId = getRandomVerseIdRef.current();
    setVerseId(newVerseId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(VERSE_OF_THE_DAY_KEY, newVerseId);
    }
  }, []);

  return { verseId, refreshVerseOfTheDay, isLoaded };
}

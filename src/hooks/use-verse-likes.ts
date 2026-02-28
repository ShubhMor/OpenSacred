'use client';

import { useState, useEffect, useCallback } from 'react';

const VERSE_LIKES_KEY = 'gita_verse_likes';
const VERSE_LIKED_IDS_KEY = 'gita_verse_liked_ids';

interface VerseLikesStore {
  [verseId: string]: number;
}

interface LikedIdsStore {
  [verseId: string]: boolean;
}

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function useVerseLikes(verseId: string) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const allLikes: VerseLikesStore = getFromStorage(VERSE_LIKES_KEY, {});
    const likedIds: LikedIdsStore = getFromStorage(VERSE_LIKED_IDS_KEY, {});
    setLikes(allLikes[verseId] ?? 0);
    setLiked(likedIds[verseId] ?? false);
    setIsLoaded(true);
  }, [verseId]);

  const toggleLike = useCallback(() => {
    if (!isLoaded) return;
    setLikes(prev => {
      const allLikes: VerseLikesStore = getFromStorage(VERSE_LIKES_KEY, {});
      const likedIds: LikedIdsStore = getFromStorage(VERSE_LIKED_IDS_KEY, {});
      const isCurrentlyLiked = likedIds[verseId] ?? false;
      const newLiked = !isCurrentlyLiked;
      const newCount = Math.max(0, (allLikes[verseId] ?? 0) + (newLiked ? 1 : -1));

      localStorage.setItem(VERSE_LIKES_KEY, JSON.stringify({ ...allLikes, [verseId]: newCount }));
      localStorage.setItem(VERSE_LIKED_IDS_KEY, JSON.stringify({ ...likedIds, [verseId]: newLiked }));

      setLiked(newLiked);
      return newCount;
    });
  }, [verseId, isLoaded]);

  return { likes, liked, toggleLike, isLoaded };
}

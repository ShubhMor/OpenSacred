'use client';

import { useState, useEffect, useCallback } from 'react';

const COMMENTARY_VOTES_KEY = 'gita_commentary_votes';

interface CommentaryVoteData {
  likes: number;
  dislikes: number;
  userVote: 'like' | 'dislike' | null;
}

type CommentaryVoteStore = Record<string, CommentaryVoteData>;

function getStore(): CommentaryVoteStore {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(COMMENTARY_VOTES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveStore(store: CommentaryVoteStore) {
  localStorage.setItem(COMMENTARY_VOTES_KEY, JSON.stringify(store));
}

export function useCommentaryVotes(commentaryIds: string[]) {
  const [votes, setVotes] = useState<CommentaryVoteStore>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const store = getStore();
    const initial: CommentaryVoteStore = {};
    for (const id of commentaryIds) {
      initial[id] = store[id] ?? { likes: 0, dislikes: 0, userVote: null };
    }
    setVotes(initial);
    setIsLoaded(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentaryIds.join(',')]);

  const castVote = useCallback((commentaryId: string, vote: 'like' | 'dislike') => {
    setVotes(prev => {
      const current = prev[commentaryId] ?? { likes: 0, dislikes: 0, userVote: null };
      const next = { ...current };

      if (current.userVote === vote) {
        // Toggle off
        next.userVote = null;
        if (vote === 'like') next.likes = Math.max(0, current.likes - 1);
        else next.dislikes = Math.max(0, current.dislikes - 1);
      } else {
        // Undo previous vote
        if (current.userVote === 'like') next.likes = Math.max(0, current.likes - 1);
        if (current.userVote === 'dislike') next.dislikes = Math.max(0, current.dislikes - 1);
        // Apply new vote
        next.userVote = vote;
        if (vote === 'like') next.likes += 1;
        else next.dislikes += 1;
      }

      const updated = { ...prev, [commentaryId]: next };
      // Merge with existing store so other verse votes aren't lost
      const store = getStore();
      saveStore({ ...store, ...updated });
      return updated;
    });
  }, []);

  const getVote = useCallback((commentaryId: string): CommentaryVoteData => {
    return votes[commentaryId] ?? { likes: 0, dislikes: 0, userVote: null };
  }, [votes]);

  return { castVote, getVote, isLoaded };
}

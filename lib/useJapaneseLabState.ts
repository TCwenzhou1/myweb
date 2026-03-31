'use client';

import { useEffect, useMemo, useState } from 'react';
import { applySm2, createInitialSrsState, isDue, ReviewRating, SrsCardState } from '@/lib/srs';

interface LabState {
  favorites: string[];
  review: Record<string, SrsCardState>;
}

const STORAGE_KEY = 'japanese-lab-state-v3';

export function useJapaneseLabState() {
  const [state, setState] = useState<LabState>({
    favorites: [],
    review: {}
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as LabState;
      setState(parsed);
    } catch (error) {
      console.error('Failed to load Japanese Lab state:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const favoriteSet = useMemo(() => new Set(state.favorites), [state.favorites]);

  const toggleFavorite = (id: string) => {
    setState((prev) => {
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((item) => item !== id)
          : [...prev.favorites, id]
      };
    });
  };

  const getCardState = (id: string) => state.review[id];

  const reviewCard = (id: string, rating: ReviewRating) => {
    setState((prev) => {
      const next = applySm2(prev.review[id], rating);
      return {
        ...prev,
        review: {
          ...prev.review,
          [id]: next
        }
      };
    });
  };

  const seedReviewCard = (id: string) => {
    setState((prev) => {
      if (prev.review[id]) return prev;
      return {
        ...prev,
        review: {
          ...prev.review,
          [id]: createInitialSrsState()
        }
      };
    });
  };

  const isCardDue = (id: string) => isDue(state.review[id]);

  const resetAll = () => {
    setState({
      favorites: [],
      review: {}
    });
  };

  return {
    state,
    favoriteSet,
    toggleFavorite,
    getCardState,
    reviewCard,
    seedReviewCard,
    isCardDue,
    resetAll
  };
}

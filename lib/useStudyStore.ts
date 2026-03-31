'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

interface ReviewItem {
  intervalDays: number;
  repetitions: number;
  easeFactor: number;
  dueAt: string;
  lastReviewedAt?: string;
}

interface StudyState {
  favorites: string[];
  reviewMap: Record<string, ReviewItem>;
}

const STORAGE_KEY = 'jp-lab-study-store-v3';

function addDays(days: number) {
  const next = new Date();
  next.setDate(next.getDate() + days);
  return next.toISOString();
}

function isDue(dueAt: string) {
  return new Date(dueAt).getTime() <= Date.now();
}

export function useStudyStore() {
  const [state, setState] = useState<StudyState>({
    favorites: [],
    reviewMap: {}
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as StudyState;
      setState(parsed);
    } catch (error) {
      console.error('Failed to parse study store:', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const toggleFavorite = useCallback((id: string) => {
    setState((prev) => {
      const exists = prev.favorites.includes(id);
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((item) => item !== id)
          : [...prev.favorites, id]
      };
    });
  }, []);

  const toggleReviewQueue = useCallback((id: string) => {
    setState((prev) => {
      const exists = Boolean(prev.reviewMap[id]);
      if (exists) {
        const nextMap = { ...prev.reviewMap };
        delete nextMap[id];
        return { ...prev, reviewMap: nextMap };
      }

      return {
        ...prev,
        reviewMap: {
          ...prev.reviewMap,
          [id]: {
            intervalDays: 0,
            repetitions: 0,
            easeFactor: 2.5,
            dueAt: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  const reviewCard = useCallback((id: string, rating: ReviewRating) => {
    setState((prev) => {
      const current = prev.reviewMap[id] ?? {
        intervalDays: 0,
        repetitions: 0,
        easeFactor: 2.5,
        dueAt: new Date().toISOString()
      };

      let repetitions = current.repetitions;
      let intervalDays = current.intervalDays;
      let easeFactor = current.easeFactor;

      if (rating === 'again') {
        repetitions = 0;
        intervalDays = 1;
        easeFactor = Math.max(1.3, easeFactor - 0.2);
      } else if (rating === 'hard') {
        repetitions += 1;
        intervalDays = Math.max(1, intervalDays <= 1 ? 2 : Math.round(intervalDays * 1.2));
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (rating === 'good') {
        repetitions += 1;
        if (repetitions === 1) intervalDays = 1;
        else if (repetitions === 2) intervalDays = 3;
        else intervalDays = Math.max(4, Math.round(intervalDays * easeFactor));
      } else if (rating === 'easy') {
        repetitions += 1;
        if (repetitions === 1) intervalDays = 3;
        else if (repetitions === 2) intervalDays = 7;
        else intervalDays = Math.max(7, Math.round(intervalDays * (easeFactor + 0.3)));
        easeFactor += 0.15;
      }

      return {
        ...prev,
        reviewMap: {
          ...prev.reviewMap,
          [id]: {
            intervalDays,
            repetitions,
            easeFactor,
            dueAt: addDays(intervalDays),
            lastReviewedAt: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    setState({ favorites: [], reviewMap: {} });
  }, []);

  const dueTodayIds = useMemo(() => {
    return Object.entries(state.reviewMap)
      .filter(([, item]) => isDue(item.dueAt))
      .map(([id]) => id);
  }, [state.reviewMap]);

  return {
    favorites: state.favorites,
    reviewMap: state.reviewMap,
    dueTodayIds,
    toggleFavorite,
    toggleReviewQueue,
    reviewCard,
    resetAll
  };
}

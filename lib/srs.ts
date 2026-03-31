export type ReviewRating = 'again' | 'hard' | 'good' | 'easy';

export interface SrsCardState {
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  dueAt: string;
  lastReviewedAt?: string;
  lapses: number;
}

export function createInitialSrsState(now: Date = new Date()): SrsCardState {
  return {
    repetitions: 0,
    easeFactor: 2.5,
    intervalDays: 0,
    dueAt: now.toISOString(),
    lastReviewedAt: undefined,
    lapses: 0
  };
}

export function isDue(state: SrsCardState | undefined, now: Date = new Date()) {
  if (!state) return true;
  return new Date(state.dueAt).getTime() <= now.getTime();
}

function ratingToQuality(rating: ReviewRating) {
  switch (rating) {
    case 'again':
      return 0;
    case 'hard':
      return 3;
    case 'good':
      return 4;
    case 'easy':
      return 5;
    default:
      return 4;
  }
}

export function applySm2(
  state: SrsCardState | undefined,
  rating: ReviewRating,
  now: Date = new Date()
): SrsCardState {
  const current = state ?? createInitialSrsState(now);
  const quality = ratingToQuality(rating);

  if (quality < 3) {
    return {
      repetitions: 0,
      easeFactor: Math.max(1.3, current.easeFactor - 0.2),
      intervalDays: 1,
      dueAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
      lastReviewedAt: now.toISOString(),
      lapses: current.lapses + 1
    };
  }

  let repetitions = current.repetitions + 1;
  let intervalDays = 1;

  if (repetitions === 1) {
    intervalDays = rating === 'easy' ? 3 : 1;
  } else if (repetitions === 2) {
    intervalDays = rating === 'easy' ? 6 : rating === 'hard' ? 3 : 4;
  } else {
    const modifier =
      rating === 'easy' ? 1.3 :
      rating === 'hard' ? 0.8 :
      1.0;

    intervalDays = Math.max(
      1,
      Math.round(current.intervalDays * current.easeFactor * modifier)
    );
  }

  const easeFactor = Math.max(
    1.3,
    current.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  return {
    repetitions,
    easeFactor,
    intervalDays,
    dueAt: new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000).toISOString(),
    lastReviewedAt: now.toISOString(),
    lapses: current.lapses
  };
}

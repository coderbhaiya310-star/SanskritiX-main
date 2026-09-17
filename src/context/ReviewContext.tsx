import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { PlaceReview, GuideReview, GuideCategoryRatings, TourRequest } from '../types';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../lib/storage';
import placesSeed from '../data/places.json';
import guidesSeed from '../data/guides.json';

interface ReviewContextValue {
  placeReviews: PlaceReview[];
  guideReviews: GuideReview[];
  tourRequests: TourRequest[];
  addPlaceReview: (review: Omit<PlaceReview, 'id' | 'date'>) => void;
  addGuideReview: (review: Omit<GuideReview, 'id'>) => void;
  requestTour: (req: Omit<TourRequest, 'id' | 'status'>) => void;
  reviewsForPlace: (placeId: string) => PlaceReview[];
  reviewsForGuide: (guideId: string) => GuideReview[];
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

function seedPlaceReviews(): PlaceReview[] {
  return (placesSeed as any[]).flatMap((p) => (p.reviews as PlaceReview[]).map((r) => ({ ...r, placeId: p.id })));
}

function seedGuideReviews(): GuideReview[] {
  return (guidesSeed as any[]).flatMap((g) => (g.reviews as GuideReview[]).map((r) => ({ ...r, guideId: g.id })));
}

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [placeReviews, setPlaceReviews] = useState<PlaceReview[]>(() =>
    loadJSON<PlaceReview[]>(STORAGE_KEYS.placeReviews, seedPlaceReviews())
  );
  const [guideReviews, setGuideReviews] = useState<GuideReview[]>(() =>
    loadJSON<GuideReview[]>(STORAGE_KEYS.guideReviews, seedGuideReviews())
  );
  const [tourRequests, setTourRequests] = useState<TourRequest[]>(() =>
    loadJSON<TourRequest[]>(STORAGE_KEYS.tourRequests, [])
  );

  const addPlaceReview = useCallback((review: Omit<PlaceReview, 'id' | 'date'>) => {
    setPlaceReviews((prev) => {
      const next: PlaceReview[] = [
        { ...review, id: `pr-user-${Date.now()}`, date: new Date().toISOString().slice(0, 10) },
        ...prev,
      ];
      saveJSON(STORAGE_KEYS.placeReviews, next);
      return next;
    });
  }, []);

  const addGuideReview = useCallback((review: Omit<GuideReview, 'id'>) => {
    setGuideReviews((prev) => {
      const next: GuideReview[] = [{ ...review, id: `gr-user-${Date.now()}` }, ...prev];
      saveJSON(STORAGE_KEYS.guideReviews, next);
      return next;
    });
  }, []);

  const requestTour = useCallback((req: Omit<TourRequest, 'id' | 'status'>) => {
    setTourRequests((prev) => {
      const next: TourRequest[] = [...prev, { ...req, id: `tour-${Date.now()}`, status: 'requested' }];
      saveJSON(STORAGE_KEYS.tourRequests, next);
      return next;
    });
  }, []);

  const reviewsForPlace = useCallback((placeId: string) => placeReviews.filter((r) => r.placeId === placeId), [placeReviews]);
  const reviewsForGuide = useCallback((guideId: string) => guideReviews.filter((r) => r.guideId === guideId), [guideReviews]);

  const value = useMemo(
    () => ({ placeReviews, guideReviews, tourRequests, addPlaceReview, addGuideReview, requestTour, reviewsForPlace, reviewsForGuide }),
    [placeReviews, guideReviews, tourRequests, addPlaceReview, addGuideReview, requestTour, reviewsForPlace, reviewsForGuide]
  );

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

export function useReviews() {
  const ctx = useContext(ReviewContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewProvider');
  return ctx;
}

export type { GuideCategoryRatings };

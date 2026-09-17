import { useParams, Link } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import Section from '../components/Section';
import MediaGallery from '../components/MediaGallery';
import CulturalEtiquette from '../components/CulturalEtiquette';
import SaveButton from '../components/SaveButton';
import ReviewCard from '../components/ReviewCard';
import EmptyState from '../components/EmptyState';
import RatingStars from '../components/RatingStars';
import NotFoundBlock from '../components/NotFoundBlock';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { getPlaceById, getDestinationById } from '../data/repository';

export default function PlacePage() {
  const { placeId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { reviewsForPlace, addPlaceReview } = useReviews();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  const place = placeId ? getPlaceById(placeId) : undefined;

  if (!place) {
    return (
      <NotFoundBlock
        title="Place not found"
        description="This place isn't part of the SanskritiX  yet."
        backTo="/explore"
        backLabel="Back to Explore"
      />
    );
  }

  const destination = getDestinationById(place.destinationId);
  const reviews = reviewsForPlace(place.id);
  const avgRating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!place || !text.trim()) return;
    addPlaceReview({ placeId: place.id, visitorName: user?.name ?? 'Guest Traveler', rating, text: text.trim() });
    setText('');
    setRating(5);
  }

  const facts: { label: string; value: string }[] = [
    { label: 'Built', value: place.built },
    { label: 'Commissioned by', value: place.builder },
    { label: 'Period', value: place.period },
  ];

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          {destination && (
            <Link to={`/destination/${destination.id}`} className="text-sm font-semibold text-madder hover:underline">
              {`\u2039 Back to ${destination.name}`}
            </Link>
          )}
          <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{place.name}</h1>
              <p className="mt-1 text-sm text-muted">{place.location}</p>
              <p className="mt-2 inline-block rounded-full bg-cream2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-inksoft">{place.category}</p>
            </div>
            <SaveButton id={place.id} />
          </div>
          <p className="mt-4 max-w-2xl text-inksoft">{place.intro}</p>
          {avgRating && (
            <div className="mt-3">
              <RatingStars rating={avgRating} reviewCount={reviews.length} size="md" />
            </div>
          )}
        </div>
      </div>

      <Section title={t('mediaGallery')}>
        <MediaGallery media={place.media} name={place.name} />
      </Section>

      <Section title="Historical facts" className="pt-0">
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-stoneline bg-white p-4">
              <dt className="text-xs font-bold uppercase tracking-wide text-marigold">{f.label}</dt>
              <dd className="mt-1 text-sm text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={t('aboutThisPlace')} className="pt-0">
        <p className="max-w-3xl text-inksoft">{place.significance}</p>
        <p className="mt-3 max-w-3xl text-inksoft">
          <span className="font-semibold text-ink">Architecture: </span>
          {place.architecture}
        </p>
        <p className="mt-3 max-w-3xl text-inksoft">
          <span className="font-semibold text-ink">Cultural importance: </span>
          {place.culturalImportance}
        </p>
      </Section>

      <Section title={t('whyFamous')} className="pt-0">
        <p className="max-w-3xl text-inksoft">{place.whyFamous}</p>
        <p className="mt-3 text-sm text-muted">
          <span className="font-semibold text-ink">Best time to visit: </span>
          {place.bestTime}
        </p>
      </Section>

      <Section title="Experiences here" className="pt-0">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {place.experiences.map((exp) => (
            <li key={exp} className="rounded-xl border border-stoneline bg-white p-4 text-sm text-inksoft">
              {exp}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t('culturalEtiquette')} className="pt-0">
        <CulturalEtiquette tips={place.etiquette} />
      </Section>

      <Section title={t('reviews')}>
        {reviews.length === 0 ? (
          <EmptyState title={t('noReviewsTitle')} icon="✎" />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {reviews.map((r) => (
              <ReviewCard key={r.id} visitorName={r.visitorName} rating={r.rating} text={r.text} date={r.date} />
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-3 rounded-2xl border border-stoneline bg-white p-5">
          <p className="font-semibold text-ink">Share your experience</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`} className="text-xl text-marigold">
                {n <= rating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <label htmlFor="place-review-text" className="sr-only">
            Your review
          </label>
          <textarea
            id="place-review-text"
            required
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What stood out about your visit?"
            className="w-full rounded-xl border border-stoneline px-4 py-3 text-sm outline-none focus:border-madder"
          />
          <button type="submit" className="rounded-full bg-madder px-5 py-2.5 text-sm font-semibold text-white hover:bg-madderdark">
            {t('submit')}
          </button>
        </form>
      </Section>
    </div>
  );
}

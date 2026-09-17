import { useParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import Section from '../components/Section';
import RatingStars from '../components/RatingStars';
import PlaceholderImage from '../components/PlaceholderImage';
import NotFoundBlock from '../components/NotFoundBlock';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useReviews } from '../context/ReviewContext';
import { getGuideById, getDestinationById } from '../data/repository';

const CATEGORY_LABELS: { key: 'communication' | 'knowledge' | 'friendliness' | 'cultural' | 'punctuality'; label: string }[] = [
  { key: 'communication', label: 'Communication' },
  { key: 'knowledge', label: 'Knowledge' },
  { key: 'friendliness', label: 'Friendliness' },
  { key: 'cultural', label: 'Cultural insight' },
  { key: 'punctuality', label: 'Punctuality' },
];

export default function GuideProfile() {
  const { guideId } = useParams();
  const { t } = useLanguage();
  const { user } = useAuth();
  const { reviewsForGuide, requestTour, tourRequests } = useReviews();
  const [requested, setRequested] = useState(false);
  const [date, setDate] = useState('');

  const guide = guideId ? getGuideById(guideId) : undefined;

  if (!guide) {
    return (
      <NotFoundBlock title="Guide not found" description="This guide profile isn't part of the  yet." backTo="/guides" backLabel="Back to Guides" />
    );
  }

  const destination = getDestinationById(guide.destinationId);
  const reviews = reviewsForGuide(guide.id);
  const avgOverall = reviews.length ? reviews.reduce((sum, r) => sum + r.ratings.overall, 0) / reviews.length : guide.baseRating;
  const alreadyRequested = tourRequests.some((r) => r.guideId === guide.id && r.visitorName === (user?.name ?? 'Guest Traveler'));

  function handleRequest(e: FormEvent) {
    e.preventDefault();
    if (!guide || !date) return;
    requestTour({ guideId: guide.id, destinationId: guide.destinationId, visitorName: user?.name ?? 'Guest Traveler', date });
    setRequested(true);
  }

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <PlaceholderImage src={guide.photo} alt={guide.name} ratio="aspect-square" className="h-16 w-16 max-h-16 max-w-16 flex-shrink-0 rounded-2xl object-cover" />
            <div>
              <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">{guide.name}</h1>
              <p className="mt-1 text-inksoft">
                {destination ? `${guide.city}, near ${destination.name}` : guide.city}
              </p>
              <div className="mt-2">
                <RatingStars rating={avgOverall} reviewCount={guide.tours} size="md" />
              </div>
              <p className="mt-2 text-sm text-muted">Speaks {guide.languages.join(', ')}, with {guide.experience} of experience.</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {guide.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-cream2 px-2.5 py-0.5 text-xs font-medium text-inksoft">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section title="About this guide">
        <p className="max-w-2xl text-inksoft">{guide.bio}</p>
        <p className="mt-3 text-sm font-medium text-muted">{guide.tours} tours completed on SanskritiX.</p>
      </Section>

      <Section title={t('requestTour')} className="pt-0">
        {requested || alreadyRequested ? (
          <div className="max-w-md rounded-2xl border border-stoneline bg-white p-6">
            <p className="font-semibold text-ink">Tour requested.</p>
            <p className="mt-1 text-sm text-muted">
              This is a  flow — in a live product, {guide.name.split(' ')[0]} would confirm availability directly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRequest} className="max-w-md space-y-4 rounded-2xl border border-stoneline bg-white p-6">
            <div>
              <label htmlFor="tour-date" className="mb-1 block text-sm font-semibold text-ink">
                Preferred date
              </label>
              <input
                id="tour-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
              />
            </div>
            <button type="submit" className="rounded-full bg-madder px-6 py-2.5 text-sm font-semibold text-white hover:bg-madderdark">
              {t('requestTour')}
            </button>
          </form>
        )}
      </Section>

      <Section title={t('reviews')}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-stoneline bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">{r.visitorName}</p>
                <RatingStars rating={r.ratings.overall} />
              </div>
              <p className="text-xs text-muted">{r.visitorContext}</p>
              <p className="mt-2 text-sm text-inksoft">{r.text}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {CATEGORY_LABELS.map((c) => (
                  <span key={c.key} className="rounded-full bg-cream2 px-2 py-0.5 text-xs font-medium text-inksoft">
                    {c.label} {r.ratings[c.key]}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

import { useState, type FormEvent } from 'react';
import { useLanguage } from '../context/LanguageContext';
import RatingStars from './RatingStars';

export default function FeedbackForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    //  only: feedback is not sent anywhere, simply acknowledged in the UI.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center">
        <p className="font-display text-xl text-ink">Thank you for helping shape SanskritiX.</p>
        <p className="mt-2 text-sm text-ink/60">Your feedback has been recorded for this session.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink">Rate your SanskritiX experience</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className="text-2xl text-marigold"
            >
              {n <= rating ? '★' : '☆'}
            </button>
          ))}
          <RatingStars rating={rating} />
        </div>
      </div>
      <div>
        <label htmlFor="feedback-message" className="mb-2 block text-sm font-semibold text-ink">
          Share your improvement ideas
        </label>
        <textarea
          id="feedback-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm text-ink outline-none focus:border-indigo"
          placeholder="What would make SanskritiX more useful on your next trip?"
        />
      </div>
      <button type="submit" className="rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madder/90">
        {t('submit')}
      </button>
    </form>
  );
}

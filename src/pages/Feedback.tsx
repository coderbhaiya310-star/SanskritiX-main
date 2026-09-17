import Section from '../components/Section';
import FeedbackForm from '../components/FeedbackForm';

export default function Feedback() {
  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">Rate SanskritiX</h1>
          <p className="mt-2 text-inksoft">
            Your feedback helps improve the experience. Rate the experience so far and tell us what would make it more useful.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <FeedbackForm />
      </div>
    </div>
  );
}

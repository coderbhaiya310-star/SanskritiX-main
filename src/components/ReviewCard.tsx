import RatingStars from './RatingStars';

interface Props {
  visitorName: string;
  rating: number;
  text: string;
  date: string;
}

export default function ReviewCard({ visitorName, rating, text, date }: Props) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-ink">{visitorName}</p>
        <RatingStars rating={rating} />
      </div>
      <p className="mt-2 text-sm text-ink/75">{text}</p>
      <p className="mt-2 text-xs text-ink/40">{date}</p>
    </div>
  );
}

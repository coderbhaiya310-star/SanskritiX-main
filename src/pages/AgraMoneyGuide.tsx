import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PriceGuideCard from '../components/PriceGuideCard';
import data from '../data/agraFeatures.json';

type PriceItem = (typeof data.transportPrices)[number];

export default function AgraMoneyGuide() {
  const [selectedService, setSelectedService] = useState('');
  const [quotedPrice, setQuotedPrice] = useState('');

  const selectedItem = useMemo<PriceItem | undefined>(
    () =>
      data.transportPrices.find(
        (item) =>
          `${item.category}-${item.service}` === selectedService
      ),
    [selectedService]
  );

  const priceNumber = Number(quotedPrice);

  const result = useMemo(() => {
    if (!selectedItem || !priceNumber || priceNumber <= 0) {
      return null;
    } 

    const [min, max] = selectedItem.priceRange
      .replace(/₹/g, '')
      .split('–')
      .map((value: string) => Number(value.replace(/,/g, '').trim()));

    if (priceNumber < min) {
      return {
        type: 'low',
        title: 'Very good price',
        message:
          'This is below the typical range. Check the service quality and conditions before accepting.',
        icon: '🟢',
      };
    }

    if (priceNumber <= max) {
      return {
        type: 'fair',
        title: 'Fair Price',
        message:
          'This price is within the typical local range.',
        icon: '🟢',
      };
    }

    const difference = Math.round(
      ((priceNumber - max) / max) * 100
    );

    return {
      type: 'high',
      title: 'Higher than typical',
      message: `This is around ${difference}% above the typical upper range. Try negotiating.`,
      icon: '⚠️',
    };
  }, [selectedItem, priceNumber]);

  return (
    <main className="min-h-screen bg-paper">
      {/* Header */}
      <section className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link
            to="/agra"
            className="text-sm font-semibold text-marigold hover:underline"
          >
            ← Back to Agra
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-marigold">
            Agra Travel Guide
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Fair Price Guide
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-inksoft">
            Check typical Agra prices before booking a ride,
            hiring a guide or buying local food.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">

        {/* Price Checker */}
        <section className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">
            Price Checker
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
            Is this price fair?
          </h2>

          <p className="mt-2 text-sm leading-6 text-ink/60">
            Select a service and enter the price someone quoted you.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">

            {/* Service */}
            <div>
              <label className="text-sm font-semibold text-ink">
                What are you paying for?
              </label>

              <select
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setQuotedPrice('');
                }}
                className="mt-2 w-full rounded-2xl border border-stoneline bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink"
              >
                <option value="">
                  Select a service
                </option>

                {data.transportPrices.map((item) => (
                  <option
                    key={`${item.category}-${item.service}`}
                    value={`${item.category}-${item.service}`}
                  >
                    {item.service}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm font-semibold text-ink">
                Price quoted to you
              </label>

              <div className="mt-2 flex overflow-hidden rounded-2xl border border-stoneline">
                <span className="flex items-center bg-paper px-4 text-sm font-semibold text-ink/60">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  value={quotedPrice}
                  onChange={(e) =>
                    setQuotedPrice(e.target.value)
                  }
                  placeholder="Example: 300"
                  className="w-full px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>
          </div>

          {/* Typical Range */}
          {selectedItem && (
            <div className="mt-6 rounded-2xl bg-paper p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-ink/50">
                Typical Range
              </p>

              <p className="mt-2 font-display text-3xl font-semibold text-ink">
                {selectedItem.priceRange}
              </p>

              <p className="mt-1 text-sm text-ink/60">
                {selectedItem.service}
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div
              className={`mt-6 rounded-2xl border p-5 ${
                result.type === 'high'
                  ? 'border-red-200 bg-red-50'
                  : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {result.icon}
                </span>

                <div>
                  <h3 className="font-semibold text-ink">
                    {result.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-ink/70">
                    {result.message}
                  </p>
                </div>
              </div>

              {result.type === 'high' && (
                <div className="mt-4 rounded-xl bg-white/70 p-4 text-sm text-ink">
                  💬 <strong>Tip:</strong> Try negotiating closer
                  to the typical price range.
                </div>
              )}
            </div>
          )}
        </section>

        {/* All Prices */}
        <section className="mt-10">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wide text-marigold">
              Local Reference
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
              Typical Agra Prices
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-ink/60">
              Use these ranges as a reference when negotiating
              locally.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.transportPrices.map((item) => (
              <PriceGuideCard
  key={item.service}
  category={item.category}
  service={item.service}
  price={item.priceRange}
  note={item.note}
/>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-8 rounded-2xl border border-marigold/30 bg-marigold/5 p-5 text-sm leading-6 text-inksoft">
          <strong className="text-ink">
            Important:
          </strong>{' '}
          Prices shown here are typical estimates. Actual prices
          can vary depending on distance, season, demand, timing,
          vehicle condition, service quality and negotiation.
        </section>

      </div>
    </main>
  );
}
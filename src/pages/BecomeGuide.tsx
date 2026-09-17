import { useState, type FormEvent } from 'react';
import Section from '../components/Section';

export default function BecomeGuide() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', languages: '', experience: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">Become a Local Guide</h1>
          <p className="mt-2 text-inksoft">
            SanskritiX connects travelers with people who know a place from the inside. This application is not
            connected to a real verification backend yet — submissions are recorded locally for this on this device.
          </p>
        </div>
      </div>

      <Section title="Guide application">
        {submitted ? (
          <div className="max-w-lg rounded-2xl border border-stoneline bg-white p-8 text-center">
            <p className="font-display text-xl text-ink">Thank you for your interest, {form.name.split(' ')[0] || 'traveler'}.</p>
            <p className="mt-2 text-sm text-inksoft">
              In a live product, our team would review this application and reach out about verification next steps.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg space-y-4 rounded-2xl border border-stoneline bg-white p-6 sm:p-8">
            <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="City / base location" value={form.city} onChange={(v) => setForm({ ...form, city: v })} required />
            <Field label="Languages you speak" value={form.languages} onChange={(v) => setForm({ ...form, languages: v })} required />
            <div>
              <label className="mb-1 block text-sm font-semibold text-ink">Tell us about your experience</label>
              <textarea
                required
                rows={4}
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full rounded-xl border border-stoneline px-4 py-3 text-sm outline-none focus:border-madder"
                placeholder="Where have you guided before, and what do you enjoy sharing most?"
              />
            </div>
            <button type="submit" className="rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madderdark">
              Submit application
            </button>
          </form>
        )}
      </Section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-ink">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-stoneline px-4 py-2.5 text-sm outline-none focus:border-madder"
      />
    </div>
  );
}

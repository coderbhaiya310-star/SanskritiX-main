import Section from '../components/Section';
import MotifDivider from '../components/MotifDivider';

export default function About() {
  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">About SanskritiX</h1>
          <p className="mt-4 text-inksoft">
            SanskritiX is designed to make cultural exploration easier for both domestic and international visitors,
            bringing heritage, food, festivals, rituals, local stories, hidden destinations, local guides and multilingual
            information into a single companion.
          </p>
        </div>
      </div>

      <Section title="Why SanskritiX exists">
        <p className="max-w-2xl text-inksoft">
          A visitor arriving somewhere new — whether from abroad or from another part of India — often hesitates to ask
          questions of strangers, especially across a language barrier. SanskritiX is built so that same person can quietly
          discover what to see, what to eat, what's happening culturally, and how to behave respectfully, entirely on their
          own terms.
        </p>
      </Section>

      <MotifDivider />

      <Section title="What SanskritiX offers" className="pt-0">
        <ul className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            'Multilingual interface across five languages',
            'A complete Agra cultural journey',
            'Accounts, guides, ratings and reviews',
            'A frontend architecture ready for a real backend later',
          ].map((item) => (
            <li key={item} className="rounded-xl border border-stoneline bg-white p-4 text-sm text-inksoft">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="A note on our content" className="pt-0">
        <p className="max-w-2xl text-inksoft">
          Photos and videos have been deliberately left as placeholders throughout SanskritiX, to be added manually once
          real, rights-cleared media is available. Historical claims that are uncertain or legendary are marked as local
          tradition rather than presented as settled fact.
        </p>
      </Section>
    </div>
  );
}

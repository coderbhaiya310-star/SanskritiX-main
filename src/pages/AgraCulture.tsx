import Section from '../components/Section';
import MotifDivider from '../components/MotifDivider';
import { Link } from 'react-router-dom';

const cultureItems = [
  {
    icon: '🏛️',
    title: 'Mughal Heritage',
    description:
      'Agra has a deep connection with Mughal architecture, history, gardens and artistic traditions.',
  },
  {
    icon: '🪨',
    title: 'Marble Inlay',
    description:
      'Explore the traditional marble inlay craft associated with Agra and its skilled artisans.',
  },
  {
    icon: '🧵',
    title: 'Zardozi & Embroidery',
    description:
      'Discover decorative embroidery traditions and the craftsmanship found in local markets.',
  },
  {
    icon: '🍬',
    title: 'Agra Petha',
    description:
      'Learn about the famous sweet of Agra and its place in the city food culture',
  },
  {
    icon: '🎭',
    title: 'Ram Barat',
    description:
      'A major traditional celebration connected with the cultural life of Agra.',
  },
  {
    icon: '🌈',
    title: 'Braj Cultural Connection',
    description:
      'Agra sits close to the Braj cultural region, creating strong connections with Holi, Krishna traditions and folk culture.',
  },
];

export default function AgraCulture() {
  return (
    <div>

      {/* Header */}
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">

          <p className="text-xs font-bold uppercase tracking-wide text-marigold">
            SanskritiX • Agra
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold text-ink">
            Culture & Traditions of Agra
          </h1>

          <p className="mt-4 max-w-3xl text-inksoft">
            Agra is more than monuments. Its identity comes from heritage,
            craftsmanship, food, festivals, local stories and everyday
            traditions.
          </p>

        </div>
      </div>


      {/* Culture Cards */}
      <Section
        title="Discover Agra's Culture"
        subtitle="Understand the traditions and cultural experiences behind the city."
      >

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {cultureItems.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-4xl">
                {item.icon}
              </div>

              <h2 className="mt-4 font-display text-xl font-semibold text-ink">
                {item.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-inksoft">
                {item.description}
              </p>

            </article>
          ))}

        </div>

      </Section>


      <MotifDivider variant="ink" />


      {/* Local Experience */}
      <Section
        title="Experience Culture Like a Local"
        subtitle="A few simple ways tourists can experience Agra beyond the famous monuments."
      >

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div className="rounded-2xl border border-stoneline bg-white p-6">

            <h3 className="font-display text-xl font-semibold text-ink">
              🛍️ Explore Local Markets
            </h3>

            <p className="mt-3 leading-relaxed text-inksoft">
              Explore traditional markets to discover marble work,
              handicrafts, textiles, embroidery and local food.
            </p>

          </div>


          <div className="rounded-2xl border border-stoneline bg-white p-6">

            <h3 className="font-display text-xl font-semibold text-ink">
              🍛 Try Local Food
            </h3>

            <p className="mt-3 leading-relaxed text-inksoft">
              Experience Agra through its street food, sweets,
              traditional snacks and local restaurants.
            </p>

          </div>


          <div className="rounded-2xl border border-stoneline bg-white p-6">

            <h3 className="font-display text-xl font-semibold text-ink">
              🎨 Meet Artisans
            </h3>

            <p className="mt-3 leading-relaxed text-inksoft">
              Learn how traditional crafts are made and understand
              the skill behind Agra's handmade products.
            </p>

          </div>


          <div className="rounded-2xl border border-stoneline bg-white p-6">

            <h3 className="font-display text-xl font-semibold text-ink">
              🪔 Respect Local Traditions
            </h3>

            <p className="mt-3 leading-relaxed text-inksoft">
              Dress appropriately at religious places, ask before
              photographing people and respect local customs.
            </p>

          </div>

        </div>

      </Section>


      <Section title="" className="pt-0">

        <Link
          to="/destination/agra"
          className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-madder"
        >
          ← Back to Agra
        </Link>

      </Section>

    </div>
  );
}
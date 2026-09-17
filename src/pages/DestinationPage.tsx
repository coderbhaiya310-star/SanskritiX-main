import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import MotifDivider from '../components/MotifDivider';
import VideoPlayer from '../components/VideoPlayer';
import PlaceCard from '../components/PlaceCard';
import StreetCard from '../components/StreetCard';
import FoodCard from '../components/FoodCard';
import FestivalCard from '../components/FestivalCard';
import RitualCard from '../components/RitualCard';
import ActivityCard from '../components/ActivityCard';
import LocalStoryCard from '../components/LocalStoryCard';
import NotFoundBlock from '../components/NotFoundBlock';
import AskAI from '../components/AskAI';
import GuideCard from '../components/GuideCard';
import { useLanguage } from '../context/LanguageContext';
import { getDestinationById, getPlacesByIds, getGuidesByDestination } from '../data/repository';
import { api } from '../lib/api';
import type { Guide } from '../types';

export default function DestinationPage() {
  const { destinationId } = useParams();
  const { t } = useLanguage();
  const destination = destinationId ? getDestinationById(destinationId) : undefined;
  const [remoteGuides, setRemoteGuides] = useState<Guide[] | null>(null);

  useEffect(() => {
    if (!destination) return;
    api.guides(destination.name).then((data) => setRemoteGuides(data as Guide[])).catch(() => setRemoteGuides(null));
  }, [destination?.id, destination?.name]);

  if (!destination) return <NotFoundBlock title="Destination not found" description="This destination isn't available right now." backTo="/explore" backLabel="Back to Explore" />;

  const places = getPlacesByIds(destination.placeIds);
  const hiddenGemPlaces = getPlacesByIds(destination.hiddenGemIds);
  const guides = remoteGuides ?? getGuidesByDestination(destination.id);
  const guideNames = guides.length ? guides.map(g => g.name).join(', ') : '';
  const card = 'sanskriti-card group rounded-2xl border border-stoneline p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md';

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">Explore {destination.name}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">{destination.name}</h1>
          <p className="mt-3 max-w-3xl text-inksoft">{destination.intro}</p>
        </div>
      </div>

      <Section title={`Experience ${destination.name}`}> <VideoPlayer video={destination.video} /> </Section>
      <MotifDivider />

      <Section title={`Discover ${destination.name}`} subtitle={`Explore ${destination.name} through its places, streets, food, festivals, traditions and local experiences.`}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['🏛️','Places',`Discover the main sights and heritage around ${destination.name}.`,'#places'],
            ['🚶','Streets',`Walk through local markets and neighbourhoods of ${destination.name}.`,'#streets'],
            ['🍛','Food',`Taste local dishes and understand the food culture of ${destination.name}.`,'#food'],
            ['🎉','Festivals',`See celebrations, fairs and cultural occasions connected with ${destination.name}.`,'#festivals'],
            ['🪔','Traditions',`Learn about local customs and respectful ways to experience them.`,'#rituals'],
            ['🎨','Activities',`Find cultural, creative and outdoor experiences.`,'#activities'],
            ['📖','Local Stories',`Explore stories, memories and folklore, clearly labelled when uncertain.`,'#stories'],
            ['🧳','Make My Trip',`Build a personalised day plan for ${destination.name}.`,`/destination/${destination.id}/plan`],
          ].map(([icon,title,desc,target]) => <a key={title} href={target} className={`${card} ${title === 'Make My Trip' ? 'border-marigold bg-marigold/95' : ''}`}><div className="text-4xl">{icon}</div><h3 className={`mt-4 font-display text-xl font-semibold ${title === 'Make My Trip' ? 'text-[#17213b]' : 'text-ink'}`}>{title}</h3><p className={`mt-2 text-sm leading-6 ${title === 'Make My Trip' ? 'text-[#334155]' : 'text-inksoft'}`}>{desc}</p><span className={`mt-4 inline-block text-sm font-semibold ${title === 'Make My Trip' ? 'text-[#17213b]' : 'text-marigold'}`}>{title === 'Make My Trip' ? 'Plan My Trip →' : 'Explore →'}</span></a>)}
        </div>
      </Section>

      <Section title="Ask SanskritiX" subtitle={`Ask questions about ${destination.name} and get city-aware travel suggestions.`}>
        <div className="sanskriti-card rounded-3xl border border-stoneline p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">Your travel companion</p><h2 className="mt-2 font-display text-2xl font-semibold text-ink">Ask anything about {destination.name}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Food, heritage, quiet places, local culture, routes and planning.</p></div><button onClick={() => document.querySelector('[aria-label="Ask SanskritiX Assistant"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))} className="rounded-full bg-madder px-6 py-3 text-sm font-bold text-white hover:bg-madderdark">✨ Ask SanskritiX</button></div>
        </div>
      </Section>

      <Section title={`What's happening in ${destination.name}`} subtitle="Festivals and cultural occasions from this destination's current catalogue.">
        {destination.festivals.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destination.festivals.map(f => <FestivalCard key={f.id} item={f} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">No events are listed for this destination yet.</div>}
      </Section>

      <Section title={t('places')} subtitle={`Explore places currently listed for ${destination.name}.`} id="places">
        {places.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{places.map(p => <PlaceCard key={p.id} place={p} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">Place details are being added for {destination.name}. Search the destination above to explore its available cultural information.</div>}
      </Section>

      <Section title={t('streets')} className="pt-0" id="streets">
        {destination.streets.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destination.streets.map(s => <StreetCard key={s.id} item={s} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">Local street information is coming soon for {destination.name}.</div>}
      </Section>

      <Section title={t('food')} className="pt-0" id="food">
        {destination.food.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destination.food.map(f => <FoodCard key={f.id} item={f} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">Food information is coming soon for {destination.name}.</div>}
      </Section>

      <Section title={t('festivals')} className="pt-0" id="festivals">
        {destination.festivals.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destination.festivals.map(f => <FestivalCard key={f.id} item={f} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">Festival information is coming soon for {destination.name}.</div>}
      </Section>

      <Section title={t('rituals')} className="pt-0" id="rituals">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{destination.rituals.map(r => <RitualCard key={r.id} item={r} />)}</div>
      </Section>

      <Section title={t('activities')} className="pt-0" id="activities">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{destination.activities.map(a => <ActivityCard key={a.id} item={a} />)}</div>
      </Section>

      <MotifDivider />
      <Section title={`Hidden ${destination.name}`} subtitle={destination.hiddenGemsNote}>
        {hiddenGemPlaces.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{hiddenGemPlaces.map(p => <PlaceCard key={p.id} place={p} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">Hidden-place details are being expanded for {destination.name}.</div>}
      </Section>

      <Section title={t('history')} className="pt-0"><div className="sanskriti-card max-w-4xl rounded-3xl border border-stoneline p-7 leading-7 text-inksoft">{destination.history}</div></Section>

      <Section title={t('stories')} className="pt-0" id="stories">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{destination.localStories.map(s => <LocalStoryCard key={s.id} story={s} />)}</div>
      </Section>

      <Section title={`Local guides in ${destination.name}`} subtitle={guides.length ? `Meet guides connected with ${destination.name}.` : `Local guides for ${destination.name} will appear here as they are onboarded.`}>
        {guides.length ? <div className="grid grid-cols-1 gap-5 md:grid-cols-2">{guides.map(g => <GuideCard key={g.id} guide={g} />)}</div> : <div className="sanskriti-card rounded-2xl border border-stoneline p-6 text-sm text-inksoft">No local guides are listed for {destination.name} yet. {guideNames}</div>}
      </Section>

      <AskAI city={destination.name} />
    </div>
  );
}

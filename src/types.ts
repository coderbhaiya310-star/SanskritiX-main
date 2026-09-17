export type LangCode = 'en' | 'hi' | 'ta' | 'bn' | 'fr';

export interface LocalizedText {
  en: string;
  hi?: string;
  ta?: string;
  bn?: string;
  fr?: string;
}

export interface StateEntry {
  id: string;
  name: string;
  description: string;
  tag: string;
  destinationIds: string[];
  image: string; // empty string => placeholder
}

export interface VideoBlock {
  title: string;
  duration: string;
  src: string; // empty => "coming soon" placeholder
  description: string;
}

export interface PlaceReview {
  id: string;
  placeId: string;
  visitorName: string;
  rating: number;
  text: string;
  tags?: string[];
  date: string;
}

export interface FoodItem {
  id: string;
  name: string;
  veg: boolean;
  area: string;
  desc: string;
  why: string;
  img: string;
}

export interface StreetItem {
  id: string;
  name: string;
  location: string;
  knownFor: string;
  experience: string;
  time: string;
  food: string;
  images: string[]
}

export interface FestivalItem {
  id: string;
  name: string;
  season: string;
  desc: string;
  significance: string;
  whatToSee: string;
  clothing: string;
  etiquette: string;
  images?: string[];
}

export interface RitualItem {
  id: string;
  name: string;
  community: string;
  desc: string;
  how: string;
  whatVisitors: string;
  wear: string;
  etiquette: string[];
  note: string;
  images?: string[];
}

export interface ActivityItem {
  id: string;
  name: string;
  desc: string;
}

export interface LocalStory {
  id: string;
  title: string;
  body: string;
  folklore?: boolean;
}

export interface Destination {
  id: string;
  stateId: string;
  name: string;
  intro: string;
  video: VideoBlock;
  history: string;
  hiddenGemsNote: string;
  placeIds: string[];
  hiddenGemIds: string[];
  streets: StreetItem[];
  food: FoodItem[];
  festivals: FestivalItem[];
  rituals: RitualItem[];
  activities: ActivityItem[];
  localStories: LocalStory[];
}

export interface PlaceMedia {
  images: string[]; // fixed length 4, may contain empty strings
  video: string;
}

export interface Place {
  id: string;
  destinationId: string;
  name: string;
  location: string;
  category: string;
  intro: string;
  built: string;
  builder: string;
  period: string;
  significance: string;
  whyFamous: string;
  architecture: string;
  culturalImportance: string;
  experiences: string[];
  bestTime: string;
  etiquette: string[];
  media: PlaceMedia;
  reviews: PlaceReview[];
}

export interface GuideCategoryRatings {
  communication: number;
  knowledge: number;
  friendliness: number;
  cultural: number;
  punctuality: number;
  overall: number;
}

export interface GuideReview {
  id: string;
  guideId: string;
  visitorName: string;
  visitorContext: string; // e.g. "French visitor", "Domestic visitor"
  text: string;
  ratings: GuideCategoryRatings;
}

export interface Guide {
  id: string;
  name: string;
  photo: string;
  city: string;
  destinationId: string;
  languages: string[];
  specialties: string[];
  experience: string; // e.g. "8 years"
  bio: string;
  baseRating: number;
  tours: number;
  reviews: GuideReview[];
}

export interface MockUser {
  name: string;
  email: string;
  password: string;
  preferredLanguage: LangCode;
  country: string;
  travelInterests: string[];
}

export interface TourRequest {
  id: string;
  guideId: string;
  destinationId: string;
  visitorName: string;
  date: string;
  status: 'requested' | 'confirmed' | 'completed';
}

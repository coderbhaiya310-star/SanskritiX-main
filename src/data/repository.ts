import statesData from '../data/states.json';
import destinationsData from '../data/destinations.json';
import placesData from '../data/places.json';
import guidesData from '../data/guides.json';
import type { StateEntry, Destination, Place, Guide } from '../types';

// This module is the single seam between the UI and  data.
// A real backend could later replace these functions with API calls
// without requiring changes to any component.

const states = statesData as StateEntry[];
const destinations = destinationsData as unknown as Destination[];
const places = placesData as unknown as Place[];
const guides = guidesData as unknown as Guide[];

export function getStates(): StateEntry[] {
  return states;
}

export function getStateById(id: string): StateEntry | undefined {
  return states.find((s) => s.id === id);
}

export function getDestinationsByState(stateId: string): Destination[] {
  return destinations.filter((d) => d.stateId === stateId);
}

export function getDestinationById(id: string): Destination | undefined {
  return destinations.find((d) => d.id === id);
}

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getPlacesByIds(ids: string[]): Place[] {
  return ids.map((id) => places.find((p) => p.id === id)).filter(Boolean) as Place[];
}

export function getAllPlaces(): Place[] {
  return places;
}

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuideById(id: string): Guide | undefined {
  return guides.find((g) => g.id === id);
}

export function getGuidesByDestination(destinationId: string): Guide[] {
  return guides.filter((g) => g.destinationId === destinationId);
}

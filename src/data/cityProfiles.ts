export type CityProfile = {
  id: string;
  name: string;
  state: string;
  theme: string;
  highlights: string[];
  foods: string[];
  festivals: string[];
  hidden: string[];
  etiquette: string[];
};

export const cityProfiles: CityProfile[] = [
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', theme: 'Royal heritage, crafts, bazaars and local food', highlights: ['Amber Fort', 'City Palace', 'Old City bazaars'], foods: ['Dal Baati Churma', 'Pyaaz Kachori', 'Ghevar'], festivals: ['Teej', 'Gangaur'], hidden: ['Craft lanes', 'Traditional block-printing workshops'], etiquette: ['Ask before photographing artisans', 'Respect temple and palace entry rules'] },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', theme: 'Ghats, living traditions, music and spiritual culture', highlights: ['Ganga ghats', 'Old lanes', 'Evening river rituals'], foods: ['Kachori Sabzi', 'Banarasi Paan', 'Malaiyyo'], festivals: ['Dev Deepawali', 'Mahashivratri'], hidden: ['Weaving neighbourhoods', 'Quiet heritage lanes'], etiquette: ['Dress respectfully near sacred spaces', 'Ask before photographing rituals'] },
  { id: 'delhi', name: 'Delhi', state: 'Delhi', theme: 'Historic neighbourhoods, food and layered cultures', highlights: ['Red Fort area', 'Old Delhi', 'Humayun’s Tomb'], foods: ['Chole Bhature', 'Paratha', 'Kebabs'], festivals: ['Diwali', 'Holi'], hidden: ['Old neighbourhood lanes', 'Craft and food markets'], etiquette: ['Respect religious spaces', 'Keep valuables secure in crowded markets'] },
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', theme: 'Coastal life, cinema, markets and neighbourhood culture', highlights: ['Gateway area', 'Colaba', 'Historic precincts'], foods: ['Vada Pav', 'Pav Bhaji', 'Misal'], festivals: ['Ganesh Chaturthi', 'Gudi Padwa'], hidden: ['Heritage streets', 'Local food neighbourhoods'], etiquette: ['Follow photography restrictions', 'Respect queues and crowded public spaces'] },
  { id: 'udaipur', name: 'Udaipur', state: 'Rajasthan', theme: 'Lakes, palace architecture, miniature art and crafts', highlights: ['City Palace', 'Lake Pichola', 'Old City'], foods: ['Dal Baati Churma', 'Gatte', 'Kachori'], festivals: ['Mewar Festival', 'Gangaur'], hidden: ['Craft studios', 'Old-city lanes'], etiquette: ['Ask before photographing workshops', 'Respect palace and temple rules'] },
  { id: 'jodhpur', name: 'Jodhpur', state: 'Rajasthan', theme: 'Fort heritage, blue lanes, folk culture and crafts', highlights: ['Mehrangarh area', 'Blue City', 'Old markets'], foods: ['Makhaniya Lassi', 'Mirchi Vada', 'Dal Baati'], festivals: ['Marwar Festival', 'Gangaur'], hidden: ['Craft markets', 'Old blue-city lanes'], etiquette: ['Dress respectfully at sacred places', 'Ask before photographing residents'] },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', theme: 'Nawabi heritage, Awadhi food, chikankari and tehzeeb', highlights: ['Bara Imambara', 'Old Lucknow', 'Heritage architecture'], foods: ['Galouti Kebab', 'Awadhi Biryani', 'Basket Chaat'], festivals: ['Chhath', 'Diwali'], hidden: ['Chikankari workshops', 'Old food lanes'], etiquette: ['Ask before photographing artisans', 'Respect religious spaces'] },
  { id: 'amritsar', name: 'Amritsar', state: 'Punjab', theme: 'Sikh heritage, food, community traditions and old markets', highlights: ['Golden Temple area', 'Jallianwala Bagh', 'Old market streets'], foods: ['Amritsari Kulcha', 'Chole', 'Lassi'], festivals: ['Baisakhi', 'Gurpurab'], hidden: ['Local food lanes', 'Traditional craft markets'], etiquette: ['Cover your head in gurdwaras', 'Follow footwear and photography rules'] },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', theme: 'Literature, arts, food, colonial-era streets and festivals', highlights: ['College Street', 'Victoria area', 'Kumartuli'], foods: ['Kathi Roll', 'Mishti Doi', 'Rosogolla'], festivals: ['Durga Puja', 'Poila Boishakh'], hidden: ['Artist workshops', 'Book and craft lanes'], etiquette: ['Ask before photographing artisans', 'Respect festival spaces'] },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', theme: 'Coastal heritage, art, spices and multicultural neighbourhoods', highlights: ['Fort Kochi', 'Mattancherry', 'Waterfront'], foods: ['Appam and Stew', 'Sadya', 'Kerala Parotta'], festivals: ['Onam', 'Vishu'], hidden: ['Art spaces', 'Spice-market lanes'], etiquette: ['Dress appropriately at temples', 'Ask before photographing people'] },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', theme: 'Tamil heritage, temples, music, dance and coastal food', highlights: ['Mylapore', 'Marina area', 'Heritage temples'], foods: ['Idli', 'Dosa', 'Filter Coffee'], festivals: ['Pongal', 'Navaratri'], hidden: ['Music and craft spaces', 'Traditional neighbourhoods'], etiquette: ['Dress respectfully at temples', 'Remove footwear where required'] },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', theme: 'Deccan heritage, food, pearls and old-city culture', highlights: ['Charminar area', 'Golconda Fort', 'Old City'], foods: ['Hyderabadi Biryani', 'Haleem', 'Irani Chai'], festivals: ['Bonalu', 'Ramzan markets'], hidden: ['Old food lanes', 'Pearl and craft markets'], etiquette: ['Respect mosque and shrine rules', 'Ask before photographing people'] },
  { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', theme: 'Gardens, old neighbourhoods, technology and contemporary culture', highlights: ['Old Bengaluru', 'Markets', 'Garden spaces'], foods: ['Masala Dosa', 'Bisi Bele Bath', 'Filter Coffee'], festivals: ['Karaga', 'Ugadi'], hidden: ['Old market lanes', 'Local art spaces'], etiquette: ['Respect temple rules', 'Ask before photographing performances'] },
  { id: 'srinagar', name: 'Srinagar', state: 'Jammu & Kashmir', theme: 'Lakes, gardens, crafts, cuisine and mountain culture', highlights: ['Dal Lake', 'Old Srinagar', 'Mughal gardens'], foods: ['Rogan Josh', 'Kahwa', 'Yakhni'], festivals: ['Eid celebrations', 'Tulip season'], hidden: ['Craft workshops', 'Old-city lanes'], etiquette: ['Respect local customs and religious spaces', 'Ask before photographing people'] },
  { id: 'mathura', name: 'Mathura', state: 'Uttar Pradesh', theme: 'Krishna traditions, temples, sweets and Braj culture', highlights: ['Old temple areas', 'Braj streets', 'Riverfront'], foods: ['Peda', 'Kachori', 'Lassi'], festivals: ['Holi', 'Janmashtami'], hidden: ['Braj craft lanes', 'Local sweet shops'], etiquette: ['Dress respectfully in temple areas', 'Follow ritual and photography guidance'] },
];

export function getCityProfile(id: string) {
  return cityProfiles.find((city) => city.id === id);
}

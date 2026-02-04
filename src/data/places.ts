export interface Place {
  id: string;
  name: string;
  type: 'nursing' | 'changing' | 'both';
  lat: number;
  lng: number;
  address?: string;
  city: string;
  citySlug: string;
  accessible?: boolean;
  openHours?: string;
  isPublic?: boolean;
  description?: string;
  osmId?: string;
  slug: string;
}

export interface City {
  name: string;
  slug: string;
  count: number;
  lat: number;
  lng: number;
  region?: string;
}

export const cities: City[] = [
  { name: 'Stockholm', slug: 'stockholm', count: 156, lat: 59.3293, lng: 18.0686, region: 'Stockholms län' },
  { name: 'Göteborg', slug: 'goteborg', count: 89, lat: 57.7089, lng: 11.9746, region: 'Västra Götalands län' },
  { name: 'Malmö', slug: 'malmo', count: 67, lat: 55.6050, lng: 13.0038, region: 'Skåne län' },
  { name: 'Uppsala', slug: 'uppsala', count: 45, lat: 59.8586, lng: 17.6389, region: 'Uppsala län' },
  { name: 'Linköping', slug: 'linkoping', count: 32, lat: 58.4108, lng: 15.6214, region: 'Östergötlands län' },
  { name: 'Örebro', slug: 'orebro', count: 28, lat: 59.2753, lng: 15.2134, region: 'Örebro län' },
  { name: 'Västerås', slug: 'vasteras', count: 25, lat: 59.6099, lng: 16.5448, region: 'Västmanlands län' },
  { name: 'Helsingborg', slug: 'helsingborg', count: 22, lat: 56.0465, lng: 12.6945, region: 'Skåne län' },
];

// Mock data for demonstration - in production, this would come from Overpass API
export const mockPlaces: Place[] = [
  {
    id: '1',
    name: 'Mall of Scandinavia',
    type: 'both',
    lat: 59.3700,
    lng: 18.0040,
    address: 'Stjärntorget 2, 169 79 Solna',
    city: 'Stockholm',
    citySlug: 'stockholm',
    accessible: true,
    openHours: '10:00-21:00',
    isPublic: true,
    description: 'Rymligt skötrum med amningshörna. Mikrovågsugn finns tillgänglig.',
    osmId: 'node/123456789',
    slug: 'skotrum-stockholm-mall-of-scandinavia',
  },
  {
    id: '2',
    name: 'NK Stockholm',
    type: 'both',
    lat: 59.3333,
    lng: 18.0712,
    address: 'Hamngatan 18-20, 111 47 Stockholm',
    city: 'Stockholm',
    citySlug: 'stockholm',
    accessible: true,
    openHours: '10:00-20:00',
    isPublic: true,
    description: 'Lyxigt familjerum med bekväma sittplatser.',
    osmId: 'node/234567890',
    slug: 'amningsrum-stockholm-nk',
  },
  {
    id: '3',
    name: 'Centralstationen',
    type: 'changing',
    lat: 59.3307,
    lng: 18.0573,
    address: 'Centralplan 15, 111 20 Stockholm',
    city: 'Stockholm',
    citySlug: 'stockholm',
    accessible: true,
    openHours: 'Dygnet runt',
    isPublic: true,
    osmId: 'node/345678901',
    slug: 'skotrum-stockholm-centralstationen',
  },
  {
    id: '4',
    name: 'Nordstan',
    type: 'both',
    lat: 57.7077,
    lng: 11.9693,
    address: 'Nordstadstorget, 411 05 Göteborg',
    city: 'Göteborg',
    citySlug: 'goteborg',
    accessible: true,
    openHours: '10:00-20:00',
    isPublic: true,
    description: 'Stort familjerum med flera skötbord.',
    osmId: 'node/456789012',
    slug: 'skotrum-goteborg-nordstan',
  },
  {
    id: '5',
    name: 'Emporia',
    type: 'both',
    lat: 55.5608,
    lng: 12.9748,
    address: 'Hyllie Boulevard 19, 215 32 Malmö',
    city: 'Malmö',
    citySlug: 'malmo',
    accessible: true,
    openHours: '10:00-21:00',
    isPublic: true,
    description: 'Modern familjelounge med amningsrum och skötrum.',
    osmId: 'node/567890123',
    slug: 'amningsrum-malmo-emporia',
  },
  {
    id: '6',
    name: 'Uppsala Resecentrum',
    type: 'changing',
    lat: 59.8582,
    lng: 17.6470,
    address: 'Stationsgatan 12, 753 40 Uppsala',
    city: 'Uppsala',
    citySlug: 'uppsala',
    accessible: true,
    openHours: '05:00-00:00',
    isPublic: true,
    osmId: 'node/678901234',
    slug: 'skotrum-uppsala-resecentrum',
  },
  {
    id: '7',
    name: 'Galleria Boulevard',
    type: 'nursing',
    lat: 59.6162,
    lng: 16.5501,
    address: 'Vasagatan 18, 722 15 Västerås',
    city: 'Västerås',
    citySlug: 'vasteras',
    accessible: true,
    openHours: '10:00-19:00',
    isPublic: true,
    description: 'Lugn amningshörna med bekväma fåtöljer.',
    osmId: 'node/789012345',
    slug: 'amningsrum-vasteras-galleria-boulevard',
  },
  {
    id: '8',
    name: 'Väla Centrum',
    type: 'both',
    lat: 56.0802,
    lng: 12.7539,
    address: 'Marknadsvägen 9, 260 35 Ödåkra',
    city: 'Helsingborg',
    citySlug: 'helsingborg',
    accessible: true,
    openHours: '10:00-20:00',
    isPublic: true,
    description: 'Familjevänligt skötrum nära lekplats.',
    osmId: 'node/890123456',
    slug: 'skotrum-helsingborg-vala-centrum',
  },
];

export function getPlacesByCity(citySlug: string): Place[] {
  return mockPlaces.filter(place => place.citySlug === citySlug);
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return mockPlaces.find(place => place.slug === slug);
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find(city => city.slug === slug);
}

export function getPlaceTypeLabel(type: Place['type']): string {
  switch (type) {
    case 'nursing':
      return 'Amningsrum';
    case 'changing':
      return 'Skötrum';
    case 'both':
      return 'Amningsrum & Skötrum';
  }
}

export function getPlaceTypeEmoji(type: Place['type']): string {
  switch (type) {
    case 'nursing':
      return '👶';
    case 'changing':
      return '🚼';
    case 'both':
      return '👶🚼';
  }
}

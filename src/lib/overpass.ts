// Overpass API integration for fetching nursing rooms and changing tables from OpenStreetMap

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';

// Sweden bounding box
const SWEDEN_BBOX = {
  south: 55.0,
  west: 10.5,
  north: 69.1,
  east: 24.2,
};

export interface OSMNode {
  type: 'node';
  id: number;
  lat: number;
  lon: number;
  tags: Record<string, string>;
}

export interface OSMWay {
  type: 'way';
  id: number;
  center?: { lat: number; lon: number };
  tags: Record<string, string>;
}

export type OSMElement = OSMNode | OSMWay;

export interface OverpassResponse {
  elements: OSMElement[];
}

// Build Overpass QL query for nursing rooms and changing tables in Sweden
function buildOverpassQuery(cityBbox?: { south: number; west: number; north: number; east: number }): string {
  const bbox = cityBbox || SWEDEN_BBOX;
  const bboxStr = `${bbox.south},${bbox.west},${bbox.north},${bbox.east}`;
  
  return `
[out:json][timeout:60];
(
  // Changing tables
  node["changing_table"="yes"](${bboxStr});
  way["changing_table"="yes"](${bboxStr});
  node["diaper"="yes"](${bboxStr});
  way["diaper"="yes"](${bboxStr});
  
  // Nursing/breastfeeding rooms
  node["baby_feeding"="yes"](${bboxStr});
  way["baby_feeding"="yes"](${bboxStr});
  node["nursing_room"="yes"](${bboxStr});
  way["nursing_room"="yes"](${bboxStr});
  node["amenity"="nursing_room"](${bboxStr});
  way["amenity"="nursing_room"](${bboxStr});
  
  // Baby care rooms (often have both)
  node["amenity"="baby_care"](${bboxStr});
  way["amenity"="baby_care"](${bboxStr});
  
  // Toilets with changing tables
  node["amenity"="toilets"]["changing_table"](${bboxStr});
  way["amenity"="toilets"]["changing_table"](${bboxStr});
);
out center;
  `.trim();
}

// Parse OSM element to determine place type
function determineType(tags: Record<string, string>): 'nursing' | 'changing' | 'both' {
  const hasNursing = tags['baby_feeding'] === 'yes' || 
                     tags['nursing_room'] === 'yes' || 
                     tags['amenity'] === 'nursing_room';
  
  const hasChanging = tags['changing_table'] === 'yes' || 
                      tags['changing_table'] !== undefined ||
                      tags['diaper'] === 'yes';
  
  const isBabyCare = tags['amenity'] === 'baby_care';
  
  if (isBabyCare || (hasNursing && hasChanging)) return 'both';
  if (hasNursing) return 'nursing';
  return 'changing';
}

// Generate a name for the place
function generateName(tags: Record<string, string>, type: 'nursing' | 'changing' | 'both'): string {
  if (tags['name']) return tags['name'];
  
  const location = tags['changing_table:location'] || tags['location'] || '';
  const amenity = tags['amenity'] || '';
  
  let baseName = '';
  
  if (type === 'nursing') {
    baseName = 'Amningsrum';
  } else if (type === 'changing') {
    baseName = 'Skötrum';
  } else {
    baseName = 'Amnings- och skötrum';
  }
  
  if (tags['brand'] || tags['operator']) {
    return `${baseName} – ${tags['brand'] || tags['operator']}`;
  }
  
  if (location) {
    const locationNames: Record<string, string> = {
      'mall': 'köpcentrum',
      'shop': 'butik',
      'airport': 'flygplats',
      'train_station': 'tågstation',
      'restaurant': 'restaurang',
      'supermarket': 'matbutik',
      'department_store': 'varuhus',
    };
    return `${baseName} – ${locationNames[location] || location}`;
  }
  
  if (amenity === 'toilets') {
    return `${baseName} – toalett`;
  }
  
  return baseName;
}

// Generate slug from name and id
function generateSlug(name: string, id: number): string {
  const baseSlug = name
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  return `${baseSlug}-${id}`;
}

// Determine city from coordinates (simplified reverse geocoding)
function determineCity(lat: number, lon: number): string {
  // Major Swedish cities with approximate bounding boxes
  const cities: { name: string; slug: string; bounds: { minLat: number; maxLat: number; minLon: number; maxLon: number } }[] = [
    { name: 'Stockholm', slug: 'stockholm', bounds: { minLat: 59.2, maxLat: 59.5, minLon: 17.8, maxLon: 18.3 } },
    { name: 'Göteborg', slug: 'goteborg', bounds: { minLat: 57.6, maxLat: 57.8, minLon: 11.8, maxLon: 12.1 } },
    { name: 'Malmö', slug: 'malmo', bounds: { minLat: 55.5, maxLat: 55.7, minLon: 12.9, maxLon: 13.1 } },
    { name: 'Uppsala', slug: 'uppsala', bounds: { minLat: 59.8, maxLat: 59.9, minLon: 17.5, maxLon: 17.7 } },
    { name: 'Västerås', slug: 'vasteras', bounds: { minLat: 59.55, maxLat: 59.7, minLon: 16.4, maxLon: 16.7 } },
    { name: 'Örebro', slug: 'orebro', bounds: { minLat: 59.2, maxLat: 59.35, minLon: 15.1, maxLon: 15.3 } },
    { name: 'Linköping', slug: 'linkoping', bounds: { minLat: 58.35, maxLat: 58.45, minLon: 15.5, maxLon: 15.7 } },
    { name: 'Helsingborg', slug: 'helsingborg', bounds: { minLat: 56.0, maxLat: 56.1, minLon: 12.65, maxLon: 12.8 } },
    { name: 'Jönköping', slug: 'jonkoping', bounds: { minLat: 57.75, maxLat: 57.85, minLon: 14.1, maxLon: 14.3 } },
    { name: 'Norrköping', slug: 'norrkoping', bounds: { minLat: 58.55, maxLat: 58.65, minLon: 16.1, maxLon: 16.3 } },
    { name: 'Lund', slug: 'lund', bounds: { minLat: 55.68, maxLat: 55.73, minLon: 13.15, maxLon: 13.25 } },
    { name: 'Umeå', slug: 'umea', bounds: { minLat: 63.8, maxLat: 63.85, minLon: 20.2, maxLon: 20.35 } },
    { name: 'Gävle', slug: 'gavle', bounds: { minLat: 60.65, maxLat: 60.72, minLon: 17.1, maxLon: 17.2 } },
    { name: 'Borås', slug: 'boras', bounds: { minLat: 57.7, maxLat: 57.75, minLon: 12.9, maxLon: 13.0 } },
    { name: 'Sundsvall', slug: 'sundsvall', bounds: { minLat: 62.35, maxLat: 62.45, minLon: 17.25, maxLon: 17.4 } },
  ];
  
  for (const city of cities) {
    if (lat >= city.bounds.minLat && lat <= city.bounds.maxLat &&
        lon >= city.bounds.minLon && lon <= city.bounds.maxLon) {
      return city.slug;
    }
  }
  
  return 'ovriga';
}

// City bounding boxes for filtered queries
export const CITY_BBOXES: Record<string, { south: number; west: number; north: number; east: number; name: string }> = {
  stockholm: { south: 59.2, west: 17.8, north: 59.5, east: 18.3, name: 'Stockholm' },
  goteborg: { south: 57.6, west: 11.8, north: 57.8, east: 12.1, name: 'Göteborg' },
  malmo: { south: 55.5, west: 12.9, north: 55.7, east: 13.1, name: 'Malmö' },
  uppsala: { south: 59.8, west: 17.5, north: 59.9, east: 17.7, name: 'Uppsala' },
  vasteras: { south: 59.55, west: 16.4, north: 59.7, east: 16.7, name: 'Västerås' },
  orebro: { south: 59.2, west: 15.1, north: 59.35, east: 15.3, name: 'Örebro' },
  linkoping: { south: 58.35, west: 15.5, north: 58.45, east: 15.7, name: 'Linköping' },
  helsingborg: { south: 56.0, west: 12.65, north: 56.1, east: 12.8, name: 'Helsingborg' },
  jonkoping: { south: 57.75, west: 14.1, north: 57.85, east: 14.3, name: 'Jönköping' },
  norrkoping: { south: 58.55, west: 16.1, north: 58.65, east: 16.3, name: 'Norrköping' },
  lund: { south: 55.68, west: 13.15, north: 55.73, east: 13.25, name: 'Lund' },
  umea: { south: 63.8, west: 20.2, north: 63.85, east: 20.35, name: 'Umeå' },
  gavle: { south: 60.65, west: 17.1, north: 60.72, east: 17.2, name: 'Gävle' },
  boras: { south: 57.7, west: 12.9, north: 57.75, east: 13.0, name: 'Borås' },
  sundsvall: { south: 62.35, west: 17.25, north: 62.45, east: 17.4, name: 'Sundsvall' },
};

// Convert OSM element to Place format
import type { Place } from '@/data/places';

export function osmElementToPlace(element: OSMElement): Place {
  const lat = element.type === 'node' ? element.lat : element.center?.lat || 0;
  const lon = element.type === 'node' ? element.lon : element.center?.lon || 0;
  const tags = element.tags || {};
  
  const type = determineType(tags);
  const name = generateName(tags, type);
  const slug = generateSlug(name, element.id);
  const citySlug = determineCity(lat, lon);
  
  // Build address from OSM tags
  const addressParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:postcode'],
    tags['addr:city'],
  ].filter(Boolean);
  
  const address = addressParts.length > 0 
    ? addressParts.join(' ') 
    : tags['address'] || undefined;
  
  // Determine accessibility
  const wheelchair = tags['wheelchair'] === 'yes' || tags['wheelchair'] === 'limited';
  
  // Opening hours
  const openingHours = tags['opening_hours'];
  
  // Description from tags
  const description = tags['description'] || tags['note'];
  
  return {
    id: `osm-${element.id}`,
    name,
    slug,
    type,
    citySlug,
    lat,
    lng: lon,
    address,
    description,
    accessibility: wheelchair,
    openingHours,
    osmId: element.id,
  };
}

// Fetch places from Overpass API
export async function fetchPlacesFromOSM(citySlug?: string): Promise<Place[]> {
  const cityBbox = citySlug ? CITY_BBOXES[citySlug] : undefined;
  const query = buildOverpassQuery(cityBbox);
  
  try {
    const response = await fetch(OVERPASS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }
    
    const data: OverpassResponse = await response.json();
    
    // Convert OSM elements to Place objects
    const places = data.elements
      .filter(el => {
        // Filter out elements without coordinates
        if (el.type === 'node') return el.lat && el.lon;
        if (el.type === 'way') return el.center?.lat && el.center?.lon;
        return false;
      })
      .map(osmElementToPlace);
    
    // If filtering by city, only return places in that city
    if (citySlug) {
      return places.filter(p => p.citySlug === citySlug);
    }
    
    return places;
  } catch (error) {
    console.error('Error fetching from Overpass API:', error);
    throw error;
  }
}

import { useQuery } from '@tanstack/react-query';
import { fetchPlacesFromOSM, CITY_BBOXES } from '@/lib/overpass';
import type { Place } from '@/data/places';
import { mockPlaces } from '@/data/places';

// Cache time: 1 hour (data doesn't change frequently)
const STALE_TIME = 1000 * 60 * 60;

export function usePlaces(citySlug?: string) {
  return useQuery<Place[]>({
    queryKey: ['places', citySlug || 'all'],
    queryFn: async () => {
      try {
        const osmPlaces = await fetchPlacesFromOSM(citySlug);
        
        // If we got results from OSM, use them
        if (osmPlaces.length > 0) {
          return osmPlaces;
        }
        
        // Fallback to mock data if no OSM data available
        console.log('No OSM data found, using mock data');
        if (citySlug) {
          return mockPlaces.filter(p => p.citySlug === citySlug);
        }
        return mockPlaces;
      } catch (error) {
        console.error('Error fetching places:', error);
        // Fallback to mock data on error
        if (citySlug) {
          return mockPlaces.filter(p => p.citySlug === citySlug);
        }
        return mockPlaces;
      }
    },
    staleTime: STALE_TIME,
    retry: 2,
  });
}

export function usePlace(slug: string) {
  const { data: places, isLoading, error } = usePlaces();
  
  const place = places?.find(p => p.slug === slug);
  
  return {
    data: place,
    isLoading,
    error,
  };
}

export function useCityInfo(citySlug: string) {
  const cityInfo = CITY_BBOXES[citySlug];
  
  if (!cityInfo) {
    return null;
  }
  
  return {
    name: cityInfo.name,
    slug: citySlug,
    center: [
      (cityInfo.south + cityInfo.north) / 2,
      (cityInfo.west + cityInfo.east) / 2,
    ] as [number, number],
  };
}

export function useAllCities() {
  return Object.entries(CITY_BBOXES).map(([slug, info]) => ({
    name: info.name,
    slug,
    center: [
      (info.south + info.north) / 2,
      (info.west + info.east) / 2,
    ] as [number, number],
  }));
}

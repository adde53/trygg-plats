import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Place, getPlaceTypeLabel, getPlaceTypeEmoji } from '@/data/places';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';

// Fix for default markers in react-leaflet
const fixDefaultIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};

fixDefaultIcon();

// Custom icons for different place types
const createCustomIcon = (type: Place['type']) => {
  const colors = {
    nursing: '#F5D0C5',
    changing: '#D4E9F7',
    both: '#E8B4B8',
  };
  
  const bgColor = colors[type];
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: ${bgColor};
        border: 3px solid #4A9D8E;
        border-radius: 50% 50% 50% 0;
        height: 36px;
        width: 36px;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      ">
        <span style="transform: rotate(45deg); font-size: 16px;">
          ${type === 'nursing' ? '👶' : type === 'changing' ? '🚼' : '👶'}
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  });
};

interface MapViewProps {
  places: Place[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  height?: string;
  showUserLocation?: boolean;
  interactive?: boolean;
}

// Component to handle map updates
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
}

// Component to handle user location
function LocationButton({ map }: { map: L.Map | null }) {
  const handleLocate = useCallback(() => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 14);
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  }, [map]);

  return (
    <Button
      variant="secondary"
      size="icon"
      className="absolute bottom-4 right-4 z-[1000] shadow-card bg-card hover:bg-muted"
      onClick={handleLocate}
      aria-label="Visa min position"
    >
      <Navigation className="h-5 w-5" />
    </Button>
  );
}

export function MapView({ 
  places, 
  center = [62.0, 15.0], 
  zoom = 5,
  className = "",
  height = "400px",
  showUserLocation = false,
  interactive = true
}: MapViewProps) {
  const [map, setMap] = useState<L.Map | null>(null);

  return (
    <div className={`relative map-container ${className}`} style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        className={`h-full w-full ${className.includes('rounded-none') ? '' : 'rounded-2xl'}`}
        scrollWheelZoom={interactive}
        dragging={interactive}
        touchZoom={interactive}
        doubleClickZoom={interactive}
        zoomControl={interactive}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={center} zoom={zoom} />
        
        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(place.type)}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getPlaceTypeEmoji(place.type)}</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                    {getPlaceTypeLabel(place.type)}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {place.name}
                </h3>
                {place.address && (
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {place.address}
                  </p>
                )}
                <Link to={`/plats/${place.slug}`}>
                  <Button size="sm" className="w-full">
                    Visa detaljer
                  </Button>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {showUserLocation && map && (
        <LocationButton map={map} />
      )}
    </div>
  );
}

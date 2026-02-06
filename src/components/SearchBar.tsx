import { Search, MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlaces } from '@/hooks/usePlaces';
import { getPlaceTypeLabel } from '@/data/places';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onLocateMe?: () => void;
  placeholder?: string;
  showLocateButton?: boolean;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  onLocateMe,
  placeholder = "Sök stad, adress eller plats...",
  showLocateButton = true,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { data: places = [] } = usePlaces();

  // Filter places based on query
  const filteredPlaces = query.length >= 2 
    ? places.filter(place => {
        const searchLower = query.toLowerCase();
        return (
          place.name.toLowerCase().includes(searchLower) ||
          place.address?.toLowerCase().includes(searchLower) ||
          place.city?.toLowerCase().includes(searchLower) ||
          place.citySlug?.toLowerCase().includes(searchLower)
        );
      }).slice(0, 8)
    : [];

  // City suggestions
  const cityRoutes: Record<string, { name: string; path: string }> = {
    'stockholm': { name: 'Stockholm', path: '/stockholm' },
    'göteborg': { name: 'Göteborg', path: '/goteborg' },
    'goteborg': { name: 'Göteborg', path: '/goteborg' },
    'malmö': { name: 'Malmö', path: '/malmo' },
    'malmo': { name: 'Malmö', path: '/malmo' },
    'uppsala': { name: 'Uppsala', path: '/uppsala' },
  };

  const matchingCities = query.length >= 2
    ? Object.entries(cityRoutes)
        .filter(([key]) => key.includes(query.toLowerCase()))
        .map(([, value]) => value)
        .filter((v, i, a) => a.findIndex(t => t.path === v.path) === i)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    // Check for city match
    const cityMatch = query.toLowerCase().trim();
    if (cityRoutes[cityMatch]) {
      navigate(cityRoutes[cityMatch].path);
      setShowResults(false);
    }
  };

  const handlePlaceClick = (slug: string) => {
    navigate(`/plats/${slug}`);
    setQuery('');
    setShowResults(false);
  };

  const handleCityClick = (path: string) => {
    navigate(path);
    setQuery('');
    setShowResults(false);
  };

  const handleLocateMe = () => {
    if (onLocateMe) {
      onLocateMe();
    } else if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          console.log('Location:', position.coords);
          // Could extend this to find nearest places
        },
        (error) => {
          setIsLocating(false);
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  const hasResults = filteredPlaces.length > 0 || matchingCities.length > 0;

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`relative flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
    >
      <div className="relative flex-1">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          placeholder={placeholder}
          className="search-input w-full pl-16 pr-5 text-base"
          aria-label="Sök efter amningsrum eller skötrum"
          autoComplete="off"
        />

        {/* Search results dropdown */}
        <AnimatePresence>
          {showResults && hasResults && (
            <motion.div
              ref={resultsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-elevated overflow-hidden z-[9999]"
            >
              {/* Cities */}
              {matchingCities.length > 0 && (
                <div className="p-2 border-b border-border">
                  <p className="text-xs font-medium text-muted-foreground px-3 py-1">Städer</p>
                  {matchingCities.map((city) => (
                    <button
                      key={city.path}
                      type="button"
                      onClick={() => handleCityClick(city.path)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-left"
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="font-medium">{city.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Places */}
              {filteredPlaces.length > 0 && (
                <div className="p-2 max-h-80 overflow-y-auto">
                  <p className="text-xs font-medium text-muted-foreground px-3 py-1">Platser</p>
                  {filteredPlaces.map((place) => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => handlePlaceClick(place.slug)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted transition-colors text-left"
                    >
                      <span className="text-lg">{place.type === 'nursing' ? '👶' : place.type === 'both' ? '🍼' : '🚼'}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{place.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {getPlaceTypeLabel(place.type)} • {place.address || place.city || 'Sverige'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {showLocateButton && (
        <Button
          type="button"
          variant="soft"
          size="lg"
          onClick={handleLocateMe}
          className="hidden sm:flex gap-2 font-bold"
          aria-label="Hitta nära mig"
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Navigation className="h-5 w-5" />
          )}
          <span className="hidden md:inline">Nära mig</span>
        </Button>
      )}
      
      <Button type="submit" variant="hero" size="lg" className="gap-2 font-bold">
        <MapPin className="h-5 w-5" />
        <span className="hidden sm:inline">Sök</span>
      </Button>
    </motion.form>
  );
}

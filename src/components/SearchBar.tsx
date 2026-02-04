import { Search, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    // Simple city matching for demo
    const cityMatch = query.toLowerCase().trim();
    const cityRoutes: Record<string, string> = {
      'stockholm': '/stockholm',
      'göteborg': '/goteborg',
      'goteborg': '/goteborg',
      'malmö': '/malmo',
      'malmo': '/malmo',
      'uppsala': '/uppsala',
    };
    if (cityRoutes[cityMatch]) {
      navigate(cityRoutes[cityMatch]);
    }
  };

  const handleLocateMe = () => {
    if (onLocateMe) {
      onLocateMe();
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords);
          // In production, this would search for nearby places
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className={`relative flex items-center gap-3 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="relative flex-1">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="search-input w-full pl-14 pr-4"
          aria-label="Sök efter amningsrum eller skötrum"
        />
      </div>
      
      {showLocateButton && (
        <Button
          type="button"
          variant="soft"
          size="lg"
          onClick={handleLocateMe}
          className="hidden sm:flex gap-2"
          aria-label="Hitta nära mig"
        >
          <Navigation className="h-5 w-5" />
          <span className="hidden md:inline">Nära mig</span>
        </Button>
      )}
      
      <Button type="submit" variant="hero" size="lg" className="gap-2">
        <MapPin className="h-5 w-5" />
        <span className="hidden sm:inline">Sök</span>
      </Button>
    </motion.form>
  );
}

import { Link } from 'react-router-dom';
import { MapPin, Accessibility, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Place, getPlaceTypeLabel, getPlaceTypeEmoji } from '@/data/places';
import { CITY_BBOXES } from '@/lib/overpass';
import { motion } from 'framer-motion';

interface PlaceCardProps {
  place: Place;
  index?: number;
  showDistance?: boolean;
  distance?: number;
}

export function PlaceCard({ place, index = 0, showDistance, distance }: PlaceCardProps) {
  const typeColors = {
    nursing: 'bg-gradient-peach text-peach-foreground',
    changing: 'bg-gradient-sky text-sky-foreground',
    both: 'bg-coral-light text-coral',
  };

  // Get city name from citySlug if city property is not available
  const cityName = place.city || (place.citySlug && CITY_BBOXES[place.citySlug]?.name) || '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
    >
      <Link to={`/plats/${place.slug}`}>
        <Card variant="place" className="group p-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl ${typeColors[place.type]} flex items-center justify-center shadow-soft`}>
              <span className="text-2xl" aria-hidden="true">
                {getPlaceTypeEmoji(place.type)}
              </span>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge className={`${typeColors[place.type]} shadow-xs font-semibold text-xs`}>
                  {getPlaceTypeLabel(place.type)}
                </Badge>
                {(place.accessible || place.accessibility) && (
                  <Badge variant="outline" className="gap-1 border-sage-light text-xs">
                    <Accessibility className="h-3 w-3" />
                    <span className="hidden sm:inline">Tillgängligt</span>
                  </Badge>
                )}
              </div>
              
              <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300 truncate mb-1">
                {place.name}
              </h3>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-sage" />
                <span className="truncate">{place.address || cityName}</span>
              </div>
              
              {(place.openHours || place.openingHours) && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 flex-shrink-0 text-sage" />
                  <span className="truncate">{place.openHours || place.openingHours}</span>
                </div>
              )}

              {showDistance && distance !== undefined && (
                <p className="mt-2 text-sm font-bold text-primary">
                  {distance < 1000
                    ? `${Math.round(distance)} m bort`
                    : `${(distance / 1000).toFixed(1)} km bort`
                  }
                </p>
              )}
            </div>
            
            {/* Arrow */}
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-4" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

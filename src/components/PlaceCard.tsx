import { Link } from 'react-router-dom';
import { MapPin, Accessibility, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Place, getPlaceTypeLabel, getPlaceTypeEmoji } from '@/data/places';
import { motion } from 'framer-motion';

interface PlaceCardProps {
  place: Place;
  index?: number;
  showDistance?: boolean;
  distance?: number;
}

export function PlaceCard({ place, index = 0, showDistance, distance }: PlaceCardProps) {
  const typeColors = {
    nursing: 'bg-peach text-peach-foreground',
    changing: 'bg-sky text-sky-foreground',
    both: 'bg-coral-light text-coral',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link to={`/plats/${place.slug}`}>
        <Card variant="place" className="group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">
                  {getPlaceTypeEmoji(place.type)}
                </span>
                <Badge className={typeColors[place.type]}>
                  {getPlaceTypeLabel(place.type)}
                </Badge>
                {place.accessible && (
                  <Badge variant="outline" className="gap-1">
                    <Accessibility className="h-3 w-3" />
                    <span className="sr-only sm:not-sr-only">Tillgängligt</span>
                  </Badge>
                )}
              </div>
              
              <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {place.name}
              </h3>
              
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{place.address || place.city}</span>
              </div>
              
              {place.openHours && (
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{place.openHours}</span>
                </div>
              )}

              {showDistance && distance !== undefined && (
                <p className="mt-2 text-sm font-medium text-primary">
                  {distance < 1000 
                    ? `${Math.round(distance)} m bort`
                    : `${(distance / 1000).toFixed(1)} km bort`
                  }
                </p>
              )}
            </div>
            
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

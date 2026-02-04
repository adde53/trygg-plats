import { Link } from 'react-router-dom';
import { MapPin, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { City } from '@/data/places';
import { motion } from 'framer-motion';

interface CityCardProps {
  city: City;
  index?: number;
}

export function CityCard({ city, index = 0 }: CityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/${city.slug}`}>
        <Card variant="city" className="group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage-light text-sage group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {city.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {city.count} platser
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

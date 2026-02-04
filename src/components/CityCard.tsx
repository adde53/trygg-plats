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
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link to={`/${city.slug}`}>
        <Card variant="city" className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-sage opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-sage text-white shadow-soft group-hover:shadow-card group-hover:scale-110 transition-all duration-500">
                <MapPin className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-1">
                  {city.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {city.count} platser
                </p>
              </div>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

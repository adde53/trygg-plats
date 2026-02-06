import { motion } from 'framer-motion';
import { Baby, Accessibility } from 'lucide-react';

export type FilterType = 'all' | 'nursing' | 'changing' | 'accessible';

interface PlaceFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts?: {
    all: number;
    nursing: number;
    changing: number;
    accessible: number;
  };
}

const filters: { id: FilterType; label: string; emoji: string; icon?: React.ReactNode }[] = [
  { id: 'all', label: 'Alla', emoji: '📍' },
  { id: 'nursing', label: 'Amningsrum', emoji: '👶' },
  { id: 'changing', label: 'Skötrum', emoji: '🚼' },
  { id: 'accessible', label: 'Tillgängligt', emoji: '♿' },
];

export function PlaceFilters({ activeFilter, onFilterChange, counts }: PlaceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = counts?.[filter.id];
        
        return (
          <motion.button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              transition-all duration-200 border-2
              ${isActive 
                ? 'bg-primary text-primary-foreground border-primary shadow-soft' 
                : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{filter.emoji}</span>
            <span>{filter.label}</span>
            {count !== undefined && (
              <span className={`
                text-xs px-1.5 py-0.5 rounded-full
                ${isActive ? 'bg-primary-foreground/20' : 'bg-muted-foreground/10'}
              `}>
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

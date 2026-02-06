import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { CityCard } from '@/components/CityCard';
import { MapView } from '@/components/MapView';
import { FAQ } from '@/components/FAQ';
import { cities } from '@/data/places';
import { usePlaces } from '@/hooks/usePlaces';
import { motion } from 'framer-motion';
import { Loader2, Hand } from 'lucide-react';

const Index = () => {
  const { data: places = [], isLoading } = usePlaces();
  const [mapActivated, setMapActivated] = useState(false);

  return (
    <>
      <Header />
      <main>
        {/* Hero Map Section - Full viewport */}
        <section className="relative h-[100dvh] flex flex-col isolate">
          {/* Top bar with search - must be above map */}
          <div className="bg-background border-b border-border/50 px-4 py-4 md:py-5 relative z-[1000]">
            <div className="max-w-xl mx-auto space-y-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl">👶</span>
                <h1 className="font-display text-lg md:text-xl font-bold text-foreground">
                  Hitta amningsrum & skötrum
                </h1>
              </div>
              <SearchBar />
            </div>
          </div>
          
          {/* Map fills remaining space - lower z-index */}
          <div className="flex-1 relative z-0" onClick={() => setMapActivated(true)}>
            {/* Click to activate overlay */}
            {!mapActivated && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-background/20 backdrop-blur-[2px] cursor-pointer"
                onClick={() => setMapActivated(true)}
              >
                <div className="glass px-6 py-4 rounded-2xl shadow-card text-center">
                  <Hand className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-foreground">Klicka för att utforska kartan</p>
                  <p className="text-sm text-muted-foreground">Scrolla efter att du klickat</p>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-md flex items-center justify-center z-10">
                <div className="flex items-center gap-3 glass px-6 py-3 rounded-full shadow-card">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm font-semibold">Hämtar platser...</span>
                </div>
              </div>
            )}
            
            <MapView
              places={places}
              center={[62.5, 17.5]}
              zoom={5}
              height="100%"
              showUserLocation
              className="rounded-none"
              interactive={mapActivated}
            />
            
            {/* Stats badge */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <div className="glass px-4 py-2 rounded-full shadow-card flex items-center gap-2">
                <span className="text-lg">📍</span>
                <span className="text-sm font-medium text-foreground">
                  {isLoading ? 'Laddar...' : `${places.length} platser`}
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Cities Grid */}
        <section className="py-20 md:py-28 bg-cream-medium" aria-labelledby="cities-heading">
          <div className="container">
            <div className="text-center mb-14">
              <h2 id="cities-heading" className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Populära städer
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                Välj en stad för att se alla tillgängliga amningsrum och skötrum.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {cities.map((city, index) => (
                <CityCard key={city.slug} city={city} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

      </main>
      <Footer />
    </>
  );
};

export default Index;

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { CityCard } from '@/components/CityCard';
import { MapView } from '@/components/MapView';
import { FAQ } from '@/components/FAQ';
import { cities } from '@/data/places';
import { usePlaces } from '@/hooks/usePlaces';
import { motion } from 'framer-motion';
import { MapPin, Baby, Shield, Clock, Loader2 } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.png';

const Index = () => {
  const { data: places = [], isLoading } = usePlaces();
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-28 lg:py-36 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
            <img
              src={heroImage} 
              alt="" 
              className="w-full h-full object-cover object-right-bottom"
              aria-hidden="true"
            />
          </div>
          <div className="container relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.div
                className="feature-badge mb-8 inline-flex"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-2xl">👶</span>
                <span className="text-sm font-semibold text-muted-foreground">
                  {isLoading ? 'Laddar...' : `${places.length}+ platser i hela Sverige`}
                </span>
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 text-balance leading-tight tracking-tight">
                Amningsrum och skötrum i hela Sverige
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
                Hitta snabbt närmaste amningsrum eller skötrum.
                Sök på stad, adress eller använd din position.
              </p>
              
              <SearchBar className="max-w-2xl mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 bg-card border-y border-border/50">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
              {[
                { icon: MapPin, label: 'Hela Sverige', desc: 'Alla städer', gradient: 'bg-gradient-sage' },
                { icon: Baby, label: 'Amning & blöjbyte', desc: 'Båda typer', gradient: 'bg-gradient-peach' },
                { icon: Shield, label: 'Tillgänglighet', desc: 'Rullstolsanpassat', gradient: 'bg-gradient-sky' },
                { icon: Clock, label: 'Öppettider', desc: 'Alltid uppdaterat', gradient: 'bg-mint' },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                >
                  <div className={`h-16 w-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-4 shadow-soft transition-all duration-300 hover:shadow-card hover:-translate-y-1`}>
                    <feature.icon className="h-7 w-7 text-sage-dark" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg mb-1">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Preview */}
        <section className="py-20 md:py-28" aria-labelledby="map-heading">
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="map-heading" className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Utforska kartan
              </h2>
              <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
                Se alla amningsrum och skötrum på kartan. Klicka på en markör för mer information.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              {isLoading && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-md rounded-3xl flex items-center justify-center z-10">
                  <div className="flex items-center gap-3 glass px-6 py-3 rounded-full shadow-card">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="text-sm font-semibold">Hämtar platser från OpenStreetMap...</span>
                  </div>
                </div>
              )}
              <div className="rounded-3xl overflow-hidden shadow-elevated ring-1 ring-border/30">
                <MapView
                  places={places}
                  center={[59.3293, 18.0686]}
                  zoom={6}
                  height="550px"
                  showUserLocation
                />
              </div>
            </motion.div>
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

        {/* CTA Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-sage-light/40"></div>
          <div className="absolute top-10 left-10 w-96 h-96 blob-bg-sage blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 blob-bg-peach blur-3xl"></div>
          <div className="container relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-peach shadow-card mb-8">
                <span className="text-5xl">🍼</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance tracking-tight">
                Känner du till ett amningsrum?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
                Hjälp andra föräldrar genom att lägga till platser som saknas.
                Ju fler som bidrar, desto bättre blir tjänsten för alla.
              </p>
              <a 
                href="https://www.openstreetmap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-elevated hover:shadow-glow hover:-translate-y-1 transition-all duration-300"
              >
                Lägg till på OpenStreetMap
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;

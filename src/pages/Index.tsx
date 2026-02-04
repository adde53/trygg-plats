import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { CityCard } from '@/components/CityCard';
import { MapView } from '@/components/MapView';
import { FAQ } from '@/components/FAQ';
import { cities, mockPlaces } from '@/data/places';
import { motion } from 'framer-motion';
import { MapPin, Baby, Shield, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-illustration.png';

const Index = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.07]">
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
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-soft mb-6">
                <span className="text-xl">👶</span>
                <span className="text-sm font-medium text-muted-foreground">
                  {mockPlaces.length}+ platser i hela Sverige
                </span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
                Amningsrum och skötrum i hela Sverige
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
                Hitta snabbt närmaste amningsrum eller skötrum. 
                Sök på stad, adress eller använd din position.
              </p>
              
              <SearchBar className="max-w-2xl mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-16 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: MapPin, label: 'Hela Sverige', desc: 'Alla städer' },
                { icon: Baby, label: 'Amning & blöjbyte', desc: 'Båda typer' },
                { icon: Shield, label: 'Tillgänglighet', desc: 'Rullstolsanpassat' },
                { icon: Clock, label: 'Öppettider', desc: 'Alltid uppdaterat' },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="h-12 w-12 rounded-xl bg-sage-light flex items-center justify-center mb-3">
                    <feature.icon className="h-6 w-6 text-sage" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">{feature.label}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Preview */}
        <section className="py-16 md:py-24" aria-labelledby="map-heading">
          <div className="container">
            <div className="text-center mb-10">
              <h2 id="map-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Utforska kartan
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Se alla amningsrum och skötrum på kartan. Klicka på en markör för mer information.
              </p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MapView 
                places={mockPlaces} 
                center={[59.3293, 18.0686]} 
                zoom={6}
                height="500px"
                showUserLocation
              />
            </motion.div>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-16 md:py-24 bg-cream-dark" aria-labelledby="cities-heading">
          <div className="container">
            <div className="text-center mb-12">
              <h2 id="cities-heading" className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Populära städer
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Välj en stad för att se alla tillgängliga amningsrum och skötrum.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {cities.map((city, index) => (
                <CityCard key={city.slug} city={city} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-sage-light">
          <div className="container">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-4xl mb-4 block">🍼</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Känner du till ett amningsrum?
              </h2>
              <p className="text-muted-foreground mb-6">
                Hjälp andra föräldrar genom att lägga till platser som saknas. 
                Ju fler som bidrar, desto bättre blir tjänsten för alla.
              </p>
              <a 
                href="https://www.openstreetmap.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-card hover:shadow-elevated hover:-translate-y-0.5 transition-all"
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

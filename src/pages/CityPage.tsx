import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapView } from '@/components/MapView';
import { PlaceCard } from '@/components/PlaceCard';
import { SearchBar } from '@/components/SearchBar';
import { getCityBySlug } from '@/data/places';
import { usePlaces, useCityInfo } from '@/hooks/usePlaces';
import { ChevronRight, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CityPage() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = citySlug ? getCityBySlug(citySlug) : undefined;
  const cityInfo = citySlug ? useCityInfo(citySlug) : null;
  const { data: places = [], isLoading } = usePlaces(citySlug);

  if (!city) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Staden hittades inte</h1>
            <p className="text-muted-foreground mb-6">
              Vi kunde inte hitta någon stad med det namnet.
            </p>
            <Link to="/" className="text-primary hover:underline">
              Tillbaka till startsidan
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="bg-cream-dark py-3 border-b border-border" aria-label="Brödsmulor">
          <div className="container">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Startsida
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <span className="text-foreground font-medium">{city.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-gradient py-12 md:py-20">
          <div className="container">
            <motion.div 
              className="max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-5 w-5" />
                <span>{city.region}</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Amningsrum och skötrum i {city.name}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Hämtar platser från OpenStreetMap...
                  </span>
                ) : (
                  <>Hitta {places.length} amningsrum och skötrum i {city.name}. Använd kartan eller listan nedan för att hitta närmaste plats.</>
                )}
              </p>
              
              <SearchBar 
                placeholder={`Sök i ${city.name}...`}
                className="max-w-xl"
              />
            </motion.div>
          </div>
        </section>

        {/* Map + List */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="order-2 lg:order-1">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Karta över {city.name}
                </h2>
                <MapView 
                  places={places}
                  center={[city.lat, city.lng]}
                  zoom={12}
                  height="500px"
                  showUserLocation
                />
              </div>

              {/* List */}
              <div className="order-1 lg:order-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Alla platser
                  </h2>
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {isLoading ? 'Laddar...' : `${places.length} platser`}
                  </span>
                </div>
                
                {isLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-muted rounded-2xl p-6 animate-pulse">
                        <div className="h-4 bg-muted-foreground/20 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : places.length > 0 ? (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                    {places.map((place, index) => (
                      <PlaceCard key={place.id} place={place} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted rounded-2xl p-8 text-center">
                    <p className="text-muted-foreground">
                      Inga platser hittades i {city.name} ännu. Data hämtas från OpenStreetMap.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-cream-dark">
          <div className="container">
            <div className="max-w-3xl mx-auto prose prose-sage">
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Om amningsrum i {city.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {city.name} erbjuder ett växande antal amningsrum och skötrum för föräldrar. 
                Många köpcentrum, bibliotek, vårdcentraler och offentliga byggnader har 
                dedikerade utrymmen där du kan amma eller byta blöja i lugn och ro.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De flesta platser är tillgänglighetsanpassade och gratis att använda. 
                Vissa platser erbjuder även extra bekvämligheter som mikrovågsugn, 
                bekväma sittplatser och skötbord med väggar för extra avskildhet.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Om du känner till ett amningsrum eller skötrum som saknas i vår lista, 
                kan du hjälpa till genom att lägga till det i OpenStreetMap.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

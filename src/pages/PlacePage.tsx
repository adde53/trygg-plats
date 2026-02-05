import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MapView } from '@/components/MapView';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getPlaceTypeLabel, getPlaceTypeEmoji } from '@/data/places';
import { usePlaces } from '@/hooks/usePlaces';
import { CITY_BBOXES } from '@/lib/overpass';
import {
  ChevronRight, 
  MapPin, 
  Clock, 
  Accessibility, 
  Navigation, 
  Flag,
  ExternalLink,
  Building,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlacePage() {
  const { placeSlug } = useParams<{ placeSlug: string }>();

  // Get all places from API
  const { data: places = [], isLoading } = usePlaces();
  const place = places.find(p => p.slug === placeSlug);

  // Get city name
  const cityName = place?.city || (place?.citySlug && CITY_BBOXES[place.citySlug]?.name) || 'Okänd stad';

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Laddar plats...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!place) {
    return (
      <>
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">Platsen hittades inte</h1>
            <p className="text-muted-foreground mb-6">
              Vi kunde inte hitta någon plats med det namnet.
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

  const typeColors = {
    nursing: 'bg-peach text-peach-foreground',
    changing: 'bg-sky text-sky-foreground',
    both: 'bg-coral-light text-coral',
  };

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
  const osmUrl = place.osmId ? `https://www.openstreetmap.org/node/${place.osmId}` : 'https://www.openstreetmap.org';

  return (
    <>
      <Header />
      <main>
        {/* Breadcrumb */}
        <nav className="bg-cream-dark py-3 border-b border-border" aria-label="Brödsmulor">
          <div className="container">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Startsida
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <Link 
                  to={`/${place.citySlug}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {cityName}
                </Link>
              </li>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <li>
                <span className="text-foreground font-medium">{place.name}</span>
              </li>
            </ol>
          </div>
        </nav>

        {/* Main content */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Info Column */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{getPlaceTypeEmoji(place.type)}</span>
                  <Badge className={`${typeColors[place.type]} text-sm px-3 py-1`}>
                    {getPlaceTypeLabel(place.type)}
                  </Badge>
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {place.name}
                </h1>

                <div className="space-y-4 mb-8">
                  {place.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{place.address}</p>
                        <p className="text-sm text-muted-foreground">{cityName}</p>
                      </div>
                    </div>
                  )}

                  {(place.openHours || place.openingHours) && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <p className="text-foreground">{place.openHours || place.openingHours}</p>
                    </div>
                  )}

                  {(place.accessible || place.accessibility) && (
                    <div className="flex items-center gap-3">
                      <Accessibility className="h-5 w-5 text-muted-foreground" />
                      <p className="text-foreground">Tillgänglighetsanpassat</p>
                    </div>
                  )}

                  {place.isPublic !== undefined && (
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <p className="text-foreground">
                        {place.isPublic ? 'Offentlig plats' : 'Privat verksamhet'}
                      </p>
                    </div>
                  )}
                </div>

                {place.description && (
                  <Card variant="default" className="p-5 mb-6">
                    <h2 className="font-display font-bold text-foreground mb-2">Beskrivning</h2>
                    <p className="text-muted-foreground">{place.description}</p>
                  </Card>
                )}

                {/* Actions */}
                <div className="space-y-3">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="w-full gap-2"
                    asChild
                  >
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-5 w-5" />
                      Visa vägbeskrivning
                    </a>
                  </Button>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="default" asChild>
                      <a href={osmUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        OpenStreetMap
                      </a>
                    </Button>

                    <Button variant="soft" size="default" className="gap-2">
                      <Flag className="h-4 w-4" />
                      Rapportera fel
                    </Button>
                  </div>
                </div>

                {/* Source */}
                <p className="text-xs text-muted-foreground mt-6">
                  Data från OpenStreetMap. Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
                </p>
              </motion.div>

              {/* Map Column */}
              <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <MapView 
                  places={[place]}
                  center={[place.lat, place.lng]}
                  zoom={16}
                  height="500px"
                  showUserLocation
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related places link */}
        <section className="py-12 bg-cream-dark">
          <div className="container text-center">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Fler platser i {cityName}
            </h2>
            <Button variant="default" asChild>
              <Link to={`/${place.citySlug}`}>
                Se alla platser i {cityName}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-border py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">👶</span>
              <span className="font-display text-xl font-bold text-foreground">
                amningsrum.se
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Sveriges mest kompletta guide till amningsrum och skötrum. 
              Hitta snabbt närmaste plats för att amma eller byta blöja.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-foreground mb-4">Populära städer</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/stockholm" className="text-muted-foreground hover:text-primary transition-colors">
                  Stockholm
                </Link>
              </li>
              <li>
                <Link to="/goteborg" className="text-muted-foreground hover:text-primary transition-colors">
                  Göteborg
                </Link>
              </li>
              <li>
                <Link to="/malmo" className="text-muted-foreground hover:text-primary transition-colors">
                  Malmö
                </Link>
              </li>
              <li>
                <Link to="/uppsala" className="text-muted-foreground hover:text-primary transition-colors">
                  Uppsala
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-foreground mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/om-oss" className="text-muted-foreground hover:text-primary transition-colors">
                  Om amningsrum.se
                </Link>
              </li>
              <li>
                <Link to="/lagg-till" className="text-muted-foreground hover:text-primary transition-colors">
                  Lägg till plats
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.openstreetmap.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Data från OpenStreetMap
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} amningsrum.se. Alla rättigheter förbehållna.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Skapad med <Heart className="h-4 w-4 text-coral fill-coral" /> för föräldrar i Sverige
          </p>
        </div>
      </div>
    </footer>
  );
}

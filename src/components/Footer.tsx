import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-border/50 py-16 md:py-20">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">👶</span>
              <span className="font-display text-2xl font-bold text-foreground">
                amningsrum.se
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed text-base">
              Sveriges mest kompletta guide till amningsrum och skötrum.
              Hitta snabbt närmaste plats för att amma eller byta blöja.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-foreground mb-5 text-lg">Populära städer</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/stockholm" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Stockholm
                </Link>
              </li>
              <li>
                <Link to="/goteborg" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Göteborg
                </Link>
              </li>
              <li>
                <Link to="/malmo" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Malmö
                </Link>
              </li>
              <li>
                <Link to="/uppsala" className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Uppsala
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-foreground mb-5 text-lg">Information</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.openstreetmap.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Data från OpenStreetMap
                </a>
              </li>
              <li>
                <a 
                  href="https://wiki.openstreetmap.org/wiki/Key:changing_table" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium inline-flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sage group-hover:bg-primary transition-colors"></span>
                  Bidra med data
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © {new Date().getFullYear()} amningsrum.se. Alla rättigheter förbehållna.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-2 font-medium">
            Skapad med <Heart className="h-4 w-4 text-coral fill-coral animate-pulse" /> för föräldrar i Sverige
          </p>
        </div>
      </div>
    </footer>
  );
}

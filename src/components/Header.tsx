import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">👶</span>
          <span className="font-display text-xl font-bold text-foreground">
            amningsrum.se
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Huvudnavigation">
          <Link 
            to="/stockholm" 
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Stockholm
          </Link>
          <Link 
            to="/goteborg" 
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Göteborg
          </Link>
          <Link 
            to="/malmo" 
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Malmö
          </Link>
          <Button variant="soft" size="sm" asChild>
            <Link to="/lagg-till">Lägg till plats</Link>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Öppna meny"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4" aria-label="Mobilnavigation">
          <div className="flex flex-col gap-3">
            <Link 
              to="/stockholm" 
              className="py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Stockholm
            </Link>
            <Link 
              to="/goteborg" 
              className="py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Göteborg
            </Link>
            <Link 
              to="/malmo" 
              className="py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Malmö
            </Link>
            <Link 
              to="/uppsala" 
              className="py-2 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Uppsala
            </Link>
            <hr className="border-border my-2" />
            <Button variant="soft" asChild>
              <Link to="/lagg-till" onClick={() => setIsMenuOpen(false)}>
                Lägg till plats
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}

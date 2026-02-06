import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">👶</span>
          <span className="font-display text-2xl font-bold text-foreground">
            amningsrum.se
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Huvudnavigation">
          <Link
            to="/stockholm" 
            className="text-muted-foreground hover:text-primary transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Stockholm
          </Link>
          <Link 
            to="/goteborg" 
            className="text-muted-foreground hover:text-primary transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Göteborg
          </Link>
          <Link 
            to="/malmo" 
            className="text-muted-foreground hover:text-primary transition-all duration-300 font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Malmö
          </Link>
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
        <nav className="md:hidden border-t border-border/50 glass p-6" aria-label="Mobilnavigation">
          <div className="flex flex-col gap-3">
            <Link 
              to="/stockholm" 
              className="py-3 px-5 rounded-xl text-foreground hover:bg-sage-light transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Stockholm
            </Link>
            <Link 
              to="/goteborg" 
              className="py-3 px-5 rounded-xl text-foreground hover:bg-sage-light transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Göteborg
            </Link>
            <Link 
              to="/malmo" 
              className="py-3 px-5 rounded-xl text-foreground hover:bg-sage-light transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Malmö
            </Link>
            <Link 
              to="/uppsala" 
              className="py-3 px-5 rounded-xl text-foreground hover:bg-sage-light transition-all duration-300 font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Uppsala
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

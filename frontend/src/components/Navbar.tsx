import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Building2, Flower2, Phone, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  
  // Directly derive the current language. The hook handles re-renders automatically!
  const currentLang = i18n.language || 'en';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    // We use .startsWith('en') just in case the browser sets 'en-US' or 'en-GB'
    const newLang = currentLang.startsWith('en') ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-wider text-foreground">Patel Darwaza</span>
              <span className="text-xs text-muted-foreground -mt-1">Materials & Supply</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('catalog')} className="text-muted-foreground hover:text-foreground transition-colors font-medium">Products</button>
            <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-foreground transition-colors font-medium">About Us</button>
            <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-foreground transition-colors font-medium">Contact</button>
          </div>

          {/* CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleLanguage}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Languages className="w-4 h-4" />
              {currentLang.startsWith('en') ? 'EN' : 'HI'}
            </Button>

            <Button onClick={() => scrollToSection('contact')} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Phone className="w-4 h-4" /> Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('catalog')} className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"><Building2 className="w-5 h-5 text-primary" /> Products</button>
              <button onClick={() => scrollToSection('about')} className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"><Flower2 className="w-5 h-5 text-accent" /> About Us</button>
              <button onClick={() => scrollToSection('contact')} className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"><Phone className="w-5 h-5 text-primary" /> Contact</button>
              
              <div className="flex gap-4 px-4">
                <Button variant="outline" onClick={toggleLanguage} className="flex-1">
                  {currentLang.startsWith('en') ? 'Switch to Hindi (हिन्दी)' : 'Switch to English'}
                </Button>
                <Button onClick={() => scrollToSection('contact')} className="flex-1 bg-primary text-primary-foreground">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { Building2, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl tracking-wider">Patel Darwaza</span>
                <span className="text-xs text-background/60 -mt-1">Materials & Supply</span>
              </div>
            </div>
            <p className="text-background/60 max-w-sm leading-relaxed">
              Your trusted partner for premium construction and farming materials. 
              Building strong foundations since 1995.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalog" className="text-background/60 hover:text-background transition-colors">Products</a>
              </li>
              <li>
                <a href="#about" className="text-background/60 hover:text-background transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="text-background/60 hover:text-background transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg tracking-wide mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-background/60">Roshan Daan</span>
              </li>
              <li>
                <span className="text-background/60">Boundary Pillars</span>
              </li>
              <li>
                <span className="text-background/60">Construction Sand</span>
              </li>
              <li>
                <span className="text-background/60">Farming & Designer Pots</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/40 text-sm">
              © {currentYear} PATEL DARWAZA Materials & Supply. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              
            
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

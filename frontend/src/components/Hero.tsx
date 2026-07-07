import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';
import { useTranslation } from 'react-i18next'; // 👇 Import added

const Hero = () => {
  const { t } = useTranslation(); // 👇 Hook initialized

  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-earth/80 via-earth/60 to-earth/90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-secondary text-sm font-medium">
              {t('hero_badge')}
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-secondary tracking-wider mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('hero_title_1')}
            <span className="block text-accent">{t('hero_title_2')}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-secondary/80 max-w-2xl mx-auto mb-10 animate-fade-up font-body" style={{ animationDelay: '0.2s' }}>
            {t('hero_subtitle')}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={scrollToCatalog}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {t('hero_btn_catalog')}
            </Button>
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              size="lg"
              className="border-2 border-secondary/50 text-secondary hover:bg-secondary/10 px-8 py-6 text-lg"
            >
              {t('hero_btn_quote')}
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-secondary">50+</div>
              <div className="text-secondary/60 text-sm">{t('hero_stat_products')}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-secondary">20+</div>
              <div className="text-secondary/60 text-sm">{t('hero_stat_years')}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl text-secondary">5K+</div>
              <div className="text-secondary/60 text-sm">{t('hero_stat_customers')}</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <button onClick={scrollToCatalog} className="text-secondary/60 hover:text-secondary transition-colors">
            <ArrowDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
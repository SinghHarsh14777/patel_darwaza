import { Shield, Award, Truck, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 👇 Hook import kiya

// 👇 Hardcoded text ki jagah translation keys add ki hain
const features = [
  {
    icon: Shield,
    titleKey: 'feat_premium_title',
    descKey: 'feat_premium_desc',
  },
  {
    icon: Award,
    titleKey: 'feat_cert_title',
    descKey: 'feat_cert_desc',
  },
  {
    icon: Truck,
    titleKey: 'feat_delivery_title',
    descKey: 'feat_delivery_desc',
  },
  {
    icon: Wrench,
    titleKey: 'feat_custom_title',
    descKey: 'feat_custom_desc',
  },
];

const About = () => {
  const { t } = useTranslation(); // 👇 Hook initialize kiya

  return (
    <section id="about" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-primary font-medium mb-2 block">
              {t('about_why_choose')}
            </span>
            <h2 className="section-heading mb-6">
              {t('about_heading')}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              {t('about_desc')}
            </p>
            
            {/* Customization Highlight */}
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 mb-8">
              <h4 className="font-display text-xl text-foreground mb-2">
                {t('about_custom_title')}
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {/* <strong> tag ko preserve karne ke liye text ko 3 parts me divide kiya hai */}
                {t('about_custom_desc_1')} 
                <strong>{t('about_custom_desc_bold')}</strong> 
                {t('about_custom_desc_2')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-1 bg-primary rounded-full" />
              <span className="text-foreground font-medium">
                {t('about_trust_line')}
              </span>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl tracking-wide text-foreground mb-2">
                  {/* 👇 Array se aayi key ko t() me pass kiya */}
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(feature.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
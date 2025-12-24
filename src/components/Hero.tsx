import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-gujarat.jpg";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gujarat farmland at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full mb-6 animate-fade-up">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-background leading-tight mb-6 animate-fade-up animation-delay-100 whitespace-pre-line">
            {t('hero.title')}
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg lg:text-xl text-background/90 mb-8 animate-fade-up animation-delay-200 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Crop Tags */}
          <div className="flex flex-wrap gap-2 mb-8 animate-fade-up animation-delay-200">
            <span className="px-3 py-1 bg-onion/80 text-background text-sm font-medium rounded-full">{t('crop.onion')}</span>
            <span className="px-3 py-1 bg-cotton text-foreground text-sm font-medium rounded-full">{t('crop.cotton')}</span>
            <span className="px-3 py-1 bg-groundnut/80 text-background text-sm font-medium rounded-full">{t('crop.groundnut')}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <Button asChild variant="hero" size="xl" className="group">
              <Link to="/appointments">
                {t('hero.cta.book')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="xl" 
              className="bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background"
            >
              <a href="tel:+919876543210">
                {t('hero.cta.call')}
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 sm:gap-10 mt-10 pt-8 border-t border-background/20 animate-fade-up animation-delay-400">
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-display">200+</p>
              <p className="text-sm text-background/70">{t('stats.farmers')}</p>
            </div>
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-display">15+</p>
              <p className="text-sm text-background/70">{t('stats.implements')}</p>
            </div>
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-display">50+</p>
              <p className="text-sm text-background/70">{t('stats.villages')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

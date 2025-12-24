import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-tractor.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tractor working in golden wheat field at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-12 md:py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-4 py-2 rounded-full mb-6 animate-fade-up">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Serving Regional Australia</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-background leading-tight mb-6 animate-fade-up animation-delay-100">
            Quality Tractor Implements for Your Farm
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-background/90 mb-8 animate-fade-up animation-delay-200">
            Rent reliable, well-maintained agricultural equipment at affordable rates. 
            Delivered to your property across regional areas.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <Button variant="hero" size="xl" className="group">
              Browse Equipment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="bg-background/10 text-background border-background/30 hover:bg-background/20 hover:text-background"
            >
              Call Us Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-background/20 animate-fade-up animation-delay-400">
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-serif">500+</p>
              <p className="text-sm text-background/70">Rentals Completed</p>
            </div>
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-serif">50+</p>
              <p className="text-sm text-background/70">Implements Available</p>
            </div>
            <div className="text-background">
              <p className="text-2xl md:text-3xl font-serif">100km</p>
              <p className="text-sm text-background/70">Delivery Radius</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

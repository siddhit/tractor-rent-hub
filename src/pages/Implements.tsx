import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImplementCard from "@/components/ImplementCard";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImplementsByCrop, implements_data } from "@/data/implements";

const Implements = () => {
  const { t } = useLanguage();
  const [activeCrop, setActiveCrop] = useState<'all' | 'onion' | 'cotton' | 'groundnut'>('all');

  const filteredImplements = getImplementsByCrop(activeCrop);
  const crops: ('all' | 'onion' | 'cotton' | 'groundnut')[] = ['all', 'onion', 'cotton', 'groundnut'];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
                {t('implements.title')}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('implements.subtitle')}
              </p>
            </div>

            {/* Crop Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {crops.map((crop) => (
                <Button
                  key={crop}
                  variant={activeCrop === crop ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCrop(crop)}
                  className="rounded-full"
                >
                  {t(`crop.${crop}`)}
                </Button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImplements.map((implement) => (
                <ImplementCard key={implement.id} implement={implement} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Implements;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import ImplementCard from "./ImplementCard";
import { getPopularImplements } from "@/data/implements";

const PopularImplements = () => {
  const { t } = useLanguage();
  const popularImplements = getPopularImplements();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
            {t('common.brand')}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
            {t('implements.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('implements.subtitle')}
          </p>
        </div>

        {/* Implements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularImplements.map((implement, index) => (
            <div
              key={implement.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ImplementCard implement={implement} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/implements">
              {t('implements.viewAll')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularImplements;

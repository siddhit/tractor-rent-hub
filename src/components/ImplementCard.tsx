import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Implement } from "@/data/implements";

interface ImplementCardProps {
  implement: Implement;
}

const ImplementCard = ({ implement }: ImplementCardProps) => {
  const { language, t } = useLanguage();
  const name = implement.name[language];
  const description = implement.description[language];

  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1 bg-card">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={implement.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge
          className={`absolute top-3 right-3 ${
            implement.available
              ? "bg-success text-primary-foreground"
              : "bg-muted-foreground text-primary-foreground"
          }`}
        >
          {implement.available ? t('implements.available') : t('implements.onRent')}
        </Badge>
        
        {/* Crop Tags */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {implement.crops.map((crop) => (
            <span
              key={crop}
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                crop === 'onion' ? 'bg-onion/90 text-background' :
                crop === 'cotton' ? 'bg-cotton text-foreground' :
                'bg-groundnut/90 text-background'
              }`}
            >
              {t(`crop.${crop}`)}
            </span>
          ))}
        </div>
      </div>

      <CardContent className="p-4 md:p-5">
        {/* Brand */}
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
          {implement.brand}
        </p>

        {/* Name */}
        <h3 className="font-display text-lg md:text-xl text-foreground mb-2 line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>

        {/* Specs */}
        <ul className="flex flex-wrap gap-2 mb-4">
          {implement.specs.slice(0, 2).map((spec, index) => (
            <li
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
            >
              {spec}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <p className="text-2xl font-display text-foreground">
              ₹{implement.pricePerDay.toLocaleString('en-IN')}
              <span className="text-sm font-sans text-muted-foreground">{t('implements.perDay')}</span>
            </p>
          </div>
          <Button asChild variant="default" size="sm" disabled={!implement.available}>
            <Link to={`/appointments?implement=${implement.id}`}>
              {t('implements.book')}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImplementCard;

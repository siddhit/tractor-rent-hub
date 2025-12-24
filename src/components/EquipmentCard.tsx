import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EquipmentCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  available: boolean;
  specs: string[];
}

const EquipmentCard = ({
  name,
  category,
  image,
  pricePerDay,
  available,
  specs,
}: EquipmentCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge
          className={`absolute top-3 right-3 ${
            available
              ? "bg-success text-background"
              : "bg-muted-foreground text-background"
          }`}
        >
          {available ? "Available" : "On Hire"}
        </Badge>
      </div>

      <CardContent className="p-4 md:p-5">
        {/* Category */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {category}
        </p>

        {/* Name */}
        <h3 className="font-serif text-lg md:text-xl text-foreground mb-2">
          {name}
        </h3>

        {/* Specs */}
        <ul className="flex flex-wrap gap-2 mb-4">
          {specs.slice(0, 3).map((spec, index) => (
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
            <p className="text-2xl font-serif text-foreground">
              ${pricePerDay}
              <span className="text-sm font-sans text-muted-foreground">/day</span>
            </p>
          </div>
          <Button variant="default" size="sm" disabled={!available}>
            {available ? "Enquire" : "Waitlist"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;

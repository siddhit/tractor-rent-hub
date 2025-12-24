import { useState } from "react";
import EquipmentCard from "./EquipmentCard";
import { Button } from "@/components/ui/button";

import harrowImage from "@/assets/equipment-harrow.jpg";
import seederImage from "@/assets/equipment-seeder.jpg";
import cultivatorImage from "@/assets/equipment-cultivator.jpg";
import sprayerImage from "@/assets/equipment-sprayer.jpg";
import augerImage from "@/assets/equipment-auger.jpg";
import slasherImage from "@/assets/equipment-slasher.jpg";

const categories = [
  "All",
  "Tillage",
  "Planting",
  "Spraying",
  "Mowing",
  "Post Hole",
];

const equipment = [
  {
    id: "1",
    name: "Heavy Duty Disc Harrow",
    category: "Tillage",
    image: harrowImage,
    pricePerDay: 180,
    available: true,
    specs: ["3.6m Width", "28 Discs", "3PL Mount"],
  },
  {
    id: "2",
    name: "Precision Seeder Planter",
    category: "Planting",
    image: seederImage,
    pricePerDay: 220,
    available: true,
    specs: ["6 Row", "Adjustable Depth", "GPS Ready"],
  },
  {
    id: "3",
    name: "Rotary Cultivator",
    category: "Tillage",
    image: cultivatorImage,
    pricePerDay: 150,
    available: false,
    specs: ["2.1m Width", "48 Tines", "PTO Driven"],
  },
  {
    id: "4",
    name: "Boom Sprayer 2000L",
    category: "Spraying",
    image: sprayerImage,
    pricePerDay: 250,
    available: true,
    specs: ["12m Boom", "2000L Tank", "Electric Pump"],
  },
  {
    id: "5",
    name: "Post Hole Digger",
    category: "Post Hole",
    image: augerImage,
    pricePerDay: 95,
    available: true,
    specs: ["300mm Auger", "PTO Driven", "Hydraulic"],
  },
  {
    id: "6",
    name: "Heavy Duty Slasher",
    category: "Mowing",
    image: slasherImage,
    pricePerDay: 120,
    available: true,
    specs: ["1.8m Cut", "Rear Wheels", "Chain Guard"],
  },
];

const EquipmentGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredEquipment =
    activeCategory === "All"
      ? equipment
      : equipment.filter((item) => item.category === activeCategory);

  return (
    <section id="equipment" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            Our Fleet
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            Equipment for Every Job
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Well-maintained implements ready to help you get the job done. 
            All equipment is serviced and checked before every rental.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item, index) => (
            <div
              key={item.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <EquipmentCard {...item} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Button variant="outline" size="lg">
            View Full Catalogue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EquipmentGrid;

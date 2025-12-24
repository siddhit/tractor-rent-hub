import { Search, Calendar, Truck, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Equipment",
    description: "Explore our range of quality implements suited for your needs.",
  },
  {
    icon: Calendar,
    title: "Book Your Dates",
    description: "Select your rental period. We offer daily, weekly, and seasonal rates.",
  },
  {
    icon: Truck,
    title: "We Deliver",
    description: "Equipment delivered to your property. Pickup available too.",
  },
  {
    icon: ThumbsUp,
    title: "Get to Work",
    description: "Use the equipment, return it when done. We handle the rest.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 gradient-warm">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Renting equipment should be easy. We've streamlined the process 
            so you can focus on your farm work.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              {/* Icon */}
              <div className="relative mx-auto w-20 h-20 rounded-full gradient-hero flex items-center justify-center mb-5 shadow-card group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-8 h-8 text-primary-foreground" />
                {/* Step Number */}
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Search, Calendar, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Search,
      title: t('how.step1.title'),
      description: t('how.step1.desc'),
    },
    {
      icon: Calendar,
      title: t('how.step2.title'),
      description: t('how.step2.desc'),
    },
    {
      icon: Truck,
      title: t('how.step3.title'),
      description: t('how.step3.desc'),
    },
  ];

  return (
    <section className="py-16 md:py-24 gradient-warm">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-foreground mb-4">
            {t('how.title')}
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Connector Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}

              {/* Icon */}
              <div className="relative mx-auto w-24 h-24 rounded-full gradient-hero flex items-center justify-center mb-6 shadow-glow group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-primary-foreground" />
                {/* Step Number */}
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-green text-accent-foreground text-sm font-bold flex items-center justify-center shadow-green">
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
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

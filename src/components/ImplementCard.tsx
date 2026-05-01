import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Implement } from "@/data/implements";

interface ImplementCardProps {
  implement: Implement;
}

const cropColors: Record<string, string> = {
  onion: 'bg-mauve text-ink',
  cotton: 'bg-ink-soft text-cream',
  groundnut: 'bg-kesar text-ink',
};

const ImplementCard = ({ implement }: ImplementCardProps) => {
  const { language, t } = useLanguage();
  const name = implement.name[language];
  const tagline = implement.tagline[language];

  const specVal = (v: string | { en: string; gu: string }) =>
    typeof v === 'string' ? v : v[language];

  return (
    <div className="group flex flex-col overflow-hidden border-2 border-ink bg-cream-deep rounded-lg shadow-chunky-sm hover:shadow-chunky transition-shadow duration-200">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={implement.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Availability badge */}
        <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold font-mono rounded border-2 border-ink ${
          implement.available ? 'bg-monsoon text-cream' : 'bg-ink-fade text-cream'
        }`}>
          {implement.available ? (language === 'gu' ? 'ઉપલબ્ધ' : 'Available') : (language === 'gu' ? 'ટૂંક સમયમાં' : 'Coming soon')}
        </span>
        {/* Crop chips */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {implement.crops.map((crop) => (
            <span key={crop} className={`px-2 py-0.5 text-xs font-semibold rounded-full ${cropColors[crop] ?? 'bg-cream text-ink'}`}>
              {t(`crop.${crop}`)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4">
        {/* Category eyebrow */}
        <p className="text-xs font-mono uppercase tracking-widest text-ink-fade mb-1">
          {t(`cat.${implement.category}`)}
        </p>

        {/* Name */}
        <h3 className={`font-display text-lg text-ink mb-1 line-clamp-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {name}
        </h3>

        {/* Tagline */}
        <p className={`text-sm text-ink-soft mb-3 line-clamp-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {tagline}
        </p>

        {/* First two specs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {implement.specs.slice(0, 2).map((spec, i) => (
            <span key={i} className="text-xs font-mono bg-cream border border-ink-fade/40 text-ink-soft px-2 py-0.5 rounded">
              {specVal(spec.value)}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-end justify-between pt-3 border-t-2 border-dashed border-ink-fade/40">
          <div>
            {implement.pricePerVigha ? (
              <>
                <span className="text-2xl font-bold text-ink">
                  ₹{implement.pricePerVigha.toLocaleString('en-IN')}
                </span>
                <span className={`block text-xs font-mono text-ink-fade ${language === 'gu' ? 'font-gujarati' : ''}`}>
                  {implement.priceUnit[language]}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-ink-fade">
                {language === 'gu' ? 'ટૂંક સમયમાં' : 'Coming soon'}
              </span>
            )}
          </div>
          <Button
            asChild
            size="sm"
            disabled={!implement.available}
            className="bg-kesar text-ink border-2 border-ink shadow-chunky-sm hover:bg-kesar-deep font-bold"
          >
            <Link to={`/appointments?implement=${implement.id}`}>
              {language === 'gu' ? 'બુક કરો' : 'Book'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImplementCard;

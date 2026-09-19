import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Implement } from "@/data/implements";

interface ImplementCardProps {
  implement: Implement;
}

const toneColors: Record<string, string> = {
  kesar: 'var(--kesar)',
  terracotta: 'var(--terracotta)',
  monsoon: 'var(--monsoon)',
  mauve: 'var(--mauve)',
  ink: 'var(--ink)',
};

const cropColors: Record<string, string> = {
  onion: 'bg-mauve text-ink border-ink',
  cotton: 'bg-ink-soft text-cream border-ink',
  groundnut: 'bg-kesar text-ink border-ink',
};

const ImplementCard = ({ implement }: ImplementCardProps) => {
  const { language, t } = useLanguage();
  const name = implement.name[language];
  const tagline = implement.tagline[language];

  const hasPhoto = implement.image && !implement.image.startsWith('data:');
  const priceUnitLabel = implement.priceBasis === 'hour'
    ? { en: 'per hour', gu: 'કલાક દીઠ' }
    : { en: 'per vigha', gu: 'પ્રતિ વીઘા' };

  return (
    <div className="flex flex-col overflow-hidden border-2 border-ink bg-cream-deep rounded-lg shadow-chunky-sm relative">
      {/* Image or coloured placeholder */}
      <div className="relative overflow-hidden border-b-2 border-ink" style={{ aspectRatio: '4/3' }}>
        {hasPhoto ? (
          <img
            src={implement.image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `repeating-linear-gradient(135deg, rgba(44,24,16,0.08) 0 10px, rgba(44,24,16,0.02) 10px 20px), ${toneColors[implement.tone] ?? 'var(--cream-sunk)'}`,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute', left: 10, bottom: 10, right: 10,
                fontFamily: 'IBM Plex Mono, monospace', fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '0.04em',
                color: implement.tone === 'ink' || implement.tone === 'monsoon' ? 'var(--cream)' : 'var(--ink)',
                background: implement.tone === 'ink' || implement.tone === 'monsoon' ? 'rgba(251,244,230,0.15)' : 'rgba(44,24,16,0.12)',
                padding: '4px 8px', borderRadius: 3, lineHeight: 1.3,
              }}
            >
              {name}
            </span>
          </div>
        )}
        {/* Crop chips */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {implement.crops.map((crop) => (
            <span key={crop} className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${cropColors[crop] ?? 'bg-cream text-ink border-ink'}`}>
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
        <h3 className={`font-bold text-lg text-ink mb-1 leading-snug ${language === 'gu' ? 'font-gujarati' : 'font-display'}`}>
          {name}
        </h3>

        {/* Tagline */}
        <p className={`text-sm text-ink-soft mb-3 leading-snug min-h-[2.5rem] ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {tagline}
        </p>

        {/* Price & CTA */}
        <div className="mt-auto flex items-end justify-between pt-3 border-t-2 border-dashed border-ink/20">
          <div>
            <span className="text-2xl font-bold text-ink">
              ₹{implement.price.toLocaleString('en-IN')}
            </span>
            <span className={`block text-xs font-mono text-ink-fade uppercase tracking-wide ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {priceUnitLabel[language]}
            </span>
          </div>
          {implement.available ? (
            <Link
              to={`/appointments?implement=${implement.id}`}
              className="bg-kesar text-ink border-2 border-ink font-bold text-sm px-3 py-2 rounded shadow-chunky-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              {language === 'gu' ? 'જુઓ →' : 'Open →'}
            </Link>
          ) : (
            <span className="text-xs font-mono text-ink-fade border border-ink-fade/30 px-3 py-2 rounded">
              {language === 'gu' ? 'જલ્દી' : 'Soon'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImplementCard;

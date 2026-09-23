import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Implement } from "@/data/implements";

interface ImplementCardProps {
  implement: Implement;
}

const ImplementCard = ({ implement }: ImplementCardProps) => {
  const { language, t } = useLanguage();
  const name = implement.name[language];
  const tagline = implement.tagline[language];

  const priceUnitLabel = implement.priceBasis === 'hour'
    ? { en: 'per hour', gu: 'કલાક દીઠ' }
    : { en: 'per vigha', gu: 'પ્રતિ વીઘા' };

  return (
    <Link to={`/implements/${implement.id}`} className="card flex flex-col overflow-hidden no-underline">
      <div className="border-b-[1.5px] border-line" style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
        <img
          src={implement.image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-1" style={{ padding: '14px 16px 16px', gap: 4 }}>
        <p className="text-[13px] font-bold text-orange-deep">
          {t(`cat.${implement.category}`)}
        </p>
        <h3 className={`text-xl font-bold text-black leading-snug ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {name}
        </h3>
        <p className={`text-[15px] text-text-2 leading-snug ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {tagline}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-line-soft">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-black">
              ₹{implement.price.toLocaleString('en-IN')}
            </span>
            <span className={`text-sm text-text-3 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {priceUnitLabel[language]}
            </span>
          </div>
          <span className="text-2xl font-extrabold text-black" aria-hidden="true">→</span>
        </div>
      </div>
    </Link>
  );
};

export default ImplementCard;

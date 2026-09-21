import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";
import ImplementCard from "@/components/ImplementCard";

const PopularImplements = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="container">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow-label text-ink-soft mb-2">
              {language === 'gu' ? '◆ ચાર મશીન ◆' : '◆ Four machines ◆'}
            </p>
            <h2
              className="text-ink"
              style={{
                fontFamily: language === 'gu' ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                fontWeight: 800,
                lineHeight: language === 'gu' ? 1.25 : 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {language === 'gu' ? 'ચાર મશીન, એક ટીમ' : 'Four machines, one team'}
            </h2>
          </div>
          <Link
            to="/implements"
            className="shrink-0 border-2 border-ink text-ink font-bold text-sm px-4 py-2 rounded bg-cream-deep shadow-chunky-sm hover:bg-kesar transition-colors"
          >
            {language === 'gu' ? 'બધા જુઓ →' : 'View all →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {implements_data.map((impl) => (
            <ImplementCard key={impl.id} implement={impl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularImplements;

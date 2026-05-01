import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";
import ImplementCard from "@/components/ImplementCard";

// Shows the 3 hero machines on the homepage (vacuum-seeder, bed-former, onion-harvester)
const STRIP_IDS = ['vacuum-seeder', 'bed-former', 'onion-harvester'];

const PopularImplements = () => {
  const { language } = useLanguage();

  const strip = STRIP_IDS
    .map(id => implements_data.find(i => i.id === id))
    .filter(Boolean) as typeof implements_data;

  return (
    <section className="py-12 md:py-16 bg-cream">
      <div className="container">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow-label text-ink-soft mb-2">
              {language === 'gu' ? '◆ સાત મશીન ◆' : '◆ Seven machines ◆'}
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
              {language === 'gu' ? 'સાત મશીન, એક ટીમ' : 'Seven machines, one team'}
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
          {strip.map((impl) => (
            <ImplementCard key={impl.id} implement={impl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularImplements;

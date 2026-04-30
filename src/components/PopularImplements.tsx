import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ImplementCard from "./ImplementCard";
import { getPopularImplements } from "@/data/implements";

const PopularImplements = () => {
  const { language, t } = useLanguage();
  const popular = getPopularImplements();

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="eyebrow-label text-ink-soft mb-3">
              {language === 'gu' ? '◆ ચાર મશીન ◆' : '◆ Top machines ◆'}
            </p>
            <h2 className={`text-4xl md:text-5xl font-display font-black text-ink leading-tight ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {t('implements.title')}
            </h2>
            <p className={`text-ink-soft mt-2 max-w-xl ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {t('implements.subtitle')}
            </p>
          </div>
          <Link
            to="/implements"
            className="inline-flex items-center gap-1 font-semibold text-ink border-b-2 border-ink pb-0.5 whitespace-nowrap self-start sm:self-end hover:text-kesar-deep hover:border-kesar-deep transition-colors"
          >
            {language === 'gu' ? 'બધા જુઓ' : 'See all'} →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popular.map((implement) => (
            <ImplementCard key={implement.id} implement={implement} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularImplements;

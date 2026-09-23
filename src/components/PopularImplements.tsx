import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";
import ImplementCard from "@/components/ImplementCard";

const PopularImplements = () => {
  const { language } = useLanguage();

  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-8">
          <p className={`eyebrow-label mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
            {language === 'gu' ? 'ચાર મશીન' : 'Four machines'}
          </p>
          <h2
            className={`text-black ${language === 'gu' ? 'font-gujarati' : ''}`}
            style={{ fontSize: 'clamp(30px, 7vw, 48px)', lineHeight: language === 'gu' ? 1.3 : 1.2 }}
          >
            {language === 'gu' ? 'ચાર મશીન, એક ટીમ' : 'Four machines, one team'}
          </h2>
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {implements_data.map((impl) => (
            <ImplementCard key={impl.id} implement={impl} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularImplements;

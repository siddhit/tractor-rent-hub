import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const questions = [
  { gu: 'કામ વચ્ચે મશીન બગડે તો?', en: 'What if the machine breaks mid-job?' },
  { gu: 'ભાગીદાર ખેડૂત પણ બુક કરી શકે?', en: 'Can a bhagya farmer book?' },
  { gu: 'વરસાદ પડે ને તારીખ બદલાય તો?', en: 'What if rain delays the date?' },
];

const FaqTeaser = () => {
  const { language } = useLanguage();

  return (
    <section className="py-12 md:py-16 bg-cream-deep">
      <div className="container max-w-2xl">
        <div className="text-center mb-8">
          <p className="eyebrow-label text-ink-soft mb-2 justify-center">
            {language === 'gu' ? 'પહેલાં આ જ પૂછાય' : 'Usually the first questions'}
          </p>
          <h2
            className="text-ink"
            style={{
              fontFamily: language === 'gu' ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(26px, 3.5vw, 36px)',
              fontWeight: 800,
              lineHeight: language === 'gu' ? 1.3 : 1.1,
            }}
          >
            {language === 'gu' ? 'વારંવાર પૂછાતા પ્રશ્નો' : 'Common questions'}
          </h2>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {questions.map((q, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-cream border-2 border-ink rounded-lg shadow-chunky-sm"
            >
              <span className="font-mono font-extrabold text-xl text-kesar-deep shrink-0">
                0{i + 1}
              </span>
              <span className={`font-semibold text-ink flex-1 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu' ? q.gu : q.en}
              </span>
              <span className="text-ink-fade text-lg shrink-0">→</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 border-2 border-ink text-ink font-bold px-5 py-3 rounded bg-cream shadow-chunky-sm hover:bg-kesar transition-colors"
          >
            <span className={language === 'gu' ? 'font-gujarati' : ''}>
              {language === 'gu' ? 'બધા પ્રશ્નો જુઓ' : 'See all questions'}
            </span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FaqTeaser;

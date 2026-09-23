import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const questions = [
  { gu: 'કામ વચ્ચે મશીન બગડે તો?', en: 'What if the machine breaks mid-job?' },
  { gu: 'ભાગીદાર ખેડૂત પણ બુક કરી શકે?', en: 'Can a partner (bhagiya) farmer book?' },
  { gu: 'વરસાદ પડે ને તારીખ બદલાય તો?', en: 'What if rain delays the date?' },
];

const FaqTeaser = () => {
  const { language } = useLanguage();

  return (
    <section className="py-10">
      <div className="container max-w-[600px]">
        <div className="mb-6">
          <p className={`eyebrow-label mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
            {language === 'gu' ? 'પહેલાં આ જ પૂછાય' : 'Usually the first questions'}
          </p>
          <h2
            className={language === 'gu' ? 'font-gujarati' : ''}
            style={{ fontSize: 'clamp(30px, 7vw, 48px)', lineHeight: language === 'gu' ? 1.3 : 1.2 }}
          >
            {language === 'gu' ? 'વારંવાર પૂછાતા પ્રશ્નો' : 'Common questions'}
          </h2>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          {questions.map((q, i) => (
            <div key={i} className="card flex items-center gap-4 p-4">
              <span className="font-mono font-bold text-lg text-orange-deep shrink-0">
                0{i + 1}
              </span>
              <span className={`font-semibold text-black flex-1 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu' ? q.gu : q.en}
              </span>
              <span className="text-text-3 text-lg shrink-0">→</span>
            </div>
          ))}
        </div>

        <Link
          to="/faq"
          className={`press-98 inline-flex items-center justify-center gap-2 h-[52px] px-6 rounded-lg bg-surface border-[1.5px] border-line text-black font-bold ${language === 'gu' ? 'font-gujarati' : ''}`}
        >
          {language === 'gu' ? 'બધા પ્રશ્નો જુઓ' : 'See all questions'} →
        </Link>
      </div>
    </section>
  );
};

export default FaqTeaser;

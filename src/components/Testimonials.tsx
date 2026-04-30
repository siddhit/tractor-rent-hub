import { useLanguage } from "@/contexts/LanguageContext";

const quotes = [
  {
    gu: '"પેલી સિઝનમાં 12 મજૂર શોધવા પડતા. હવે ફોન કરી દઉં ને બીજા દિવસે મશીન ઊભું હોય."',
    en: '"Last season I ran around finding 12 labourers. Now one phone call — machine is there next morning."',
    name: 'Haribhai K.',
    village: { en: 'Mota Asrana', gu: 'મોટા અસરાણા' },
    vigha: '14',
  },
  {
    gu: '"ડુંગળીનું પથારું સરખું થયું એટલે પાણી પણ સરખું ગયું. આ વખતે પાક એકસરખો ઊગ્યો."',
    en: '"Even beds meant even water. My onion came up uniform for the first time."',
    name: 'Meghjibhai P.',
    village: { en: 'Kumbhariya', gu: 'કુંભારિયા' },
    vigha: '9',
  },
  {
    gu: '"દવા ઓછી લાગી, કામ જલ્દી થયું. ભાવ મજૂરી કરતાં ઓછો — ત્રણેય ફાયદો."',
    en: '"Used less chemical, finished faster, paid less than labour. All three at once."',
    name: 'Bhaveshbhai D.',
    village: { en: 'Zanzmer', gu: 'ઝાંઝમેર' },
    vigha: '22',
  },
];

const toneStyles = [
  'bg-mauve/30',
  'bg-monsoon/20',
  'bg-kesar/30',
];

const Testimonials = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-terracotta py-14 md:py-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="eyebrow-label text-cream/70 justify-center mb-3">
            {language === 'gu' ? '◆ પોતાના શબ્દોમાં ◆' : '◆ In their own words ◆'}
          </p>
          <h2 className={`text-4xl md:text-5xl font-display font-black text-cream leading-tight ${language === 'gu' ? 'font-gujarati' : ''}`}>
            {language === 'gu' ? 'ખેડૂત પોતે બોલે છે' : 'Farmers speak for themselves'}
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <div
              key={i}
              className="bg-cream border-2 border-ink rounded-xl p-5 shadow-chunky-sm flex flex-col gap-4"
            >
              {/* Avatar placeholder */}
              <div className={`w-16 h-16 rounded-lg border-2 border-ink ${toneStyles[i]} flex items-center justify-center font-mono text-xl font-black text-ink`}>
                {q.name.charAt(0)}
              </div>

              {/* Quote */}
              <blockquote className={`text-base text-ink leading-relaxed flex-1 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu' ? q.gu : q.en}
              </blockquote>

              {/* Attribution */}
              <div className="border-t-2 border-dashed border-ink-fade/40 pt-3">
                <p className="font-bold text-ink text-sm">{q.name}</p>
                <p className={`text-xs text-ink-soft font-mono ${language === 'gu' ? 'font-gujarati' : ''}`}>
                  {language === 'gu' ? q.village.gu : q.village.en} · {q.vigha} {language === 'gu' ? 'વીઘા' : 'vigha'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

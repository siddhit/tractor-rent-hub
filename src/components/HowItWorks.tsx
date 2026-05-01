import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorks = () => {
  const { language, t } = useLanguage();

  const steps = [
    { num: '01', title: t('how.step1.title'), desc: t('how.step1.desc') },
    { num: '02', title: t('how.step2.title'), desc: t('how.step2.desc') },
    { num: '03', title: t('how.step3.title'), desc: t('how.step3.desc') },
  ];

  return (
    <section className="bg-ink py-14 md:py-20 relative overflow-hidden">
      {/* Subtle bandhani dot pattern */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none bandhani-bg"
        style={{
          opacity: 0.08,
          maskImage: 'radial-gradient(ellipse at right center, black 25%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at right center, black 25%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow-label text-kesar-glow mb-3">
            {language === 'gu' ? '◆ ત્રણ પગલાં ◆' : '◆ Three steps ◆'}
          </p>
          <h2 className={`text-4xl md:text-5xl font-display font-black text-cream leading-tight ${language === 'gu' ? 'font-gujarati' : ''}`}>
            {t('how.title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-4">
              {/* Big number */}
              <div
                className="text-7xl font-black leading-none"
                style={{ color: 'rgba(246,192,85,0.25)', fontVariantNumeric: 'tabular-nums' }}
              >
                {step.num}
              </div>
              {/* Divider */}
              <div className="w-12 h-1 bg-kesar" />
              {/* Content */}
              <h3 className={`text-xl font-bold text-cream ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {step.title}
              </h3>
              <p className={`text-cream-sunk leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Promise footer */}
        <div className="mt-14 pt-8 border-t border-kesar/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {[
            { k: '20 km', l: { en: 'service radius', gu: 'સર્વિસ રેન્જ' } },
            { k: '6',     l: { en: 'machines available', gu: 'મશીન ઉપલબ્ધ' } },
            { k: '100%',  l: { en: 'operator included', gu: 'ઓપરેટર સાથે' } },
          ].map((s, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-kesar-glow leading-none">{s.k}</span>
              <span className={`text-cream-sunk text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu' ? s.l.gu : s.l.en}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

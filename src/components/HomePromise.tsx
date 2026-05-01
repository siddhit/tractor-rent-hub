import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: '20 km', gu: 'સર્વિસ રેન્જ', en: 'Service radius' },
  { value: '7', gu: 'મશીન', en: 'Machines' },
  { value: '3', gu: 'પાક — ડુંગળી, કપાસ, મગફળી', en: 'Crops — onion, cotton, groundnut' },
  { value: '100%', gu: 'ઓપરેટર સાથે', en: 'Operator included' },
];

const HomePromise = () => {
  const { language } = useLanguage();

  return (
    <section
      className="relative overflow-hidden bg-ink text-cream py-14 md:py-20"
    >
      {/* Bandhani dot overlay right side */}
      <div
        className="absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--kesar-glow) 1.5px, transparent 2px)',
          backgroundSize: '24px 24px',
          opacity: 0.18,
          maskImage: 'radial-gradient(ellipse at right center, black 25%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at right center, black 25%, transparent 70%)',
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: promise text */}
          <div>
            <p className="eyebrow-label mb-4" style={{ color: 'var(--kesar-glow)' }}>
              {language === 'gu' ? '◆ અમારું વચન ◆' : '◆ Our promise ◆'}
            </p>
            <h2
              className="text-cream mb-5"
              style={{
                fontFamily: language === 'gu' ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(32px, 5vw, 60px)',
                fontWeight: 800,
                lineHeight: language === 'gu' ? 1.25 : 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {language === 'gu' ? (
                <>
                  મશીન એકલું{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--kesar-glow)' }}>ભાડે નહીં.</span>
                  <br />
                  ઓપરેટર સાથે જ આવે.
                </>
              ) : (
                <>
                  We don't rent{' '}
                  <span style={{ fontStyle: 'italic', color: 'var(--kesar-glow)' }}>machines alone.</span>
                  <br />
                  Operator always comes with it.
                </>
              )}
            </h2>
            <p className={`text-cream/70 text-lg leading-relaxed max-w-lg ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'તમારા પાડોશી જેવો — જે મશીનનો ટ્રેઇનિંગ છે, જે ખેતર સમજે છે. ફક્ત મજૂરી નહીં — કુશળતા.'
                : 'Like a neighbour who happens to be trained on the machine and understands the field. Not just labour — craft.'}
            </p>
          </div>

          {/* Right: stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-lg p-5"
                style={{
                  border: '2px solid var(--kesar)',
                  background: i % 2 === 0 ? 'rgba(232,160,32,0.08)' : 'transparent',
                }}
              >
                <div
                  className="font-bold leading-none mb-2"
                  style={{ fontSize: 52, color: 'var(--kesar-glow)', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </div>
                <div className={`text-cream/70 text-sm leading-snug ${language === 'gu' ? 'font-gujarati' : 'font-mono text-xs uppercase tracking-wide'}`}>
                  {language === 'gu' ? s.gu : s.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePromise;

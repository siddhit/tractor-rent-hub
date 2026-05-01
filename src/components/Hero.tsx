import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";
import onionHarvesterImg from "@/assets/implement-onion-harvester.jpg";

const Hero = () => {
  const { language, t } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે ખેત-સાથી — મારે મશીન વિશે પૂછવું છે.'
    : 'Hello Khet Saathi — I want to ask about machines.';

  return (
    <section className="relative overflow-hidden bg-cream pt-16">
      {/* Bandhani dot pattern top-right */}
      <div
        className="absolute right-0 top-0 w-1/2 h-2/3 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--kesar) 1.5px, transparent 2px)',
          backgroundSize: '22px 22px',
          opacity: 0.32,
          maskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 75%)',
        }}
      />

      <div className="container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left: tagline headline */}
          <div>
            <p className="eyebrow-label text-ink-soft mb-4">
              {language === 'gu' ? 'ખેત-સાથી · મોટા અસરાણા' : 'Khet Saathi · Mota Asrana'}
            </p>

            <h1
              className="text-ink mb-5"
              style={{
                fontFamily: language === 'gu' ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(48px, 8vw, 104px)',
                lineHeight: 1.18,
                letterSpacing: language === 'gu' ? '-0.01em' : '-0.025em',
                fontWeight: 800,
              }}
            >
              {language === 'gu' ? (
                <>
                  ખેતી ના
                  <br />
                  <span style={{ fontStyle: 'italic', color: 'var(--terracotta-deep)' }}>ભરોસાદાર</span>{' '}
                  સાથી
                </>
              ) : (
                <>
                  Farming's
                  <br />
                  <span style={{ fontStyle: 'italic', color: 'var(--terracotta-deep)' }}>trusted</span>{' '}
                  companion
                </>
              )}
            </h1>

            <p className={`text-xl text-ink-soft mb-8 max-w-md leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'સાત મશીન. એક ભરોસાદાર ટીમ. ઓપરેટર સાથે. મોટા અસરાણા થી 20 કિ.મી. સુધી.'
                : 'Seven machines. One reliable team. Operator included. 20 km from Mota Asrana.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={buildWaLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-monsoon text-cream border-2 border-ink font-bold text-lg py-4 px-6 rounded shadow-chunky-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-shadow"
              >
                <span className="w-6 h-6 rounded-full bg-cream text-monsoon flex items-center justify-center text-xs font-black">✓</span>
                <span className={language === 'gu' ? 'font-gujarati' : ''}>{t('hero.cta.whatsapp')}</span>
              </a>
              <Link
                to="/implements"
                className="inline-flex items-center justify-center gap-2 bg-cream-deep border-2 border-ink text-ink font-bold text-lg py-4 px-6 rounded shadow-chunky-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-shadow"
              >
                <span className={language === 'gu' ? 'font-gujarati' : ''}>{t('hero.cta.machines')}</span>
                <span>→</span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { en: '20 km radius', gu: '20 કિ.મી. રેન્જ' },
                { en: 'Operator included', gu: 'ઓપરેટર સાથે' },
                { en: '3 crops', gu: '3 પાક' },
              ].map((b) => (
                <span
                  key={b.en}
                  className="font-mono text-xs uppercase tracking-wider border border-ink/40 text-ink-soft px-3 py-1 rounded-full"
                >
                  {language === 'gu' ? b.gu : b.en}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stacked images */}
          <div className="relative hidden lg:block" style={{ minHeight: 400 }}>
            <div
              className="absolute inset-0 z-10"
              style={{ transform: 'rotate(2deg)', top: 0, bottom: 40, right: 0 }}
            >
              <img
                src={onionHarvesterImg}
                alt="Onion harvester in the field, Mota Asrana"
                className="w-full h-full object-cover"
                style={{ border: '3px solid var(--ink)', boxShadow: '8px 8px 0 var(--ink)', borderRadius: 8, aspectRatio: '1/1' }}
              />
            </div>
            {/* Inset green placeholder bottom-left */}
            <div
              className="absolute bottom-0 left-0 w-2/5 z-20"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <div
                style={{
                  aspectRatio: '4/3',
                  border: '3px solid var(--ink)',
                  boxShadow: '6px 6px 0 var(--ink)',
                  borderRadius: 6,
                  background: 'repeating-linear-gradient(135deg, rgba(44,24,16,0.10) 0 10px, rgba(44,24,16,0.03) 10px 20px), var(--monsoon)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span style={{
                  position: 'absolute', left: 8, bottom: 8, right: 8,
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: 10,
                  textTransform: 'uppercase', letterSpacing: '0.04em',
                  color: 'var(--cream)', background: 'rgba(44,24,16,0.6)',
                  padding: '3px 6px', borderRadius: 2,
                }}>
                  {language === 'gu' ? 'ઓપરેટર + બેડ-ફોર્મર' : 'Operator + bed-former'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="patola-strip mt-2" />
    </section>
  );
};

export default Hero;

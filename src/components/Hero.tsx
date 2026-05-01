import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";
import heroImage from "@/assets/hero-gujarat.jpg";
import onionHarvesterImg from "@/assets/implement-onion-harvester.jpg";

const Hero = () => {
  const { language, t } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે ખેત-સાથી — મારે મશીન વિશે જાણવું છે.'
    : 'Hello Khet Saathi — I want to know about your machines.';

  return (
    <section className="relative pt-16 overflow-hidden bg-cream">
      {/* Bandhani dot pattern top-right */}
      <div
        className="absolute right-0 top-0 w-1/2 h-2/3 bandhani-bg pointer-events-none"
        style={{
          opacity: 0.28,
          maskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top right, black 30%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div>
            {/* Eyebrow */}
            <p className="eyebrow-label text-ink-soft mb-4">
              {t('hero.badge')}
            </p>

            {/* Headline */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-display font-black text-ink mb-4 leading-none ${language === 'gu' ? 'font-gujarati' : ''}`}
            >
              {language === 'gu' ? (
                <>
                  ખેતી{' '}
                  <span className="italic text-terracotta-deep">વધુ</span>{' '}
                  <span
                    className="inline-block bg-kesar border-2 border-ink px-3"
                    style={{ transform: 'rotate(-1.5deg)', boxShadow: '5px 5px 0 #2C1810' }}
                  >
                    કમાણી
                  </span>{' '}
                  ની.
                </>
              ) : (
                <>
                  Farming that{' '}
                  <span className="italic text-terracotta-deep">makes</span>{' '}
                  <span
                    className="inline-block bg-kesar border-2 border-ink px-3"
                    style={{ transform: 'rotate(-1.5deg)', boxShadow: '5px 5px 0 #2C1810' }}
                  >
                    more money
                  </span>
                  .
                </>
              )}
            </h1>

            <p className={`text-lg text-ink-soft mb-8 max-w-md leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={buildWaLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-monsoon text-cream border-2 border-ink font-bold text-lg py-3 px-6 rounded shadow-chunky-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-shadow"
              >
                <span className="w-6 h-6 rounded-full bg-cream text-monsoon flex items-center justify-center text-xs font-black">✓</span>
                <span className={language === 'gu' ? 'font-gujarati' : ''}>{t('hero.cta.whatsapp')}</span>
              </a>
              <Link
                to="/implements"
                className="inline-flex items-center justify-center gap-2 bg-cream-deep border-2 border-ink text-ink font-bold text-lg py-3 px-6 rounded shadow-chunky-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-shadow"
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
                  className="font-mono text-xs uppercase tracking-wider border border-ink-fade/60 text-ink-soft px-3 py-1 rounded-full"
                >
                  {language === 'gu' ? b.gu : b.en}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stacked images */}
          <div className="relative hidden lg:block" style={{ minHeight: 380 }}>
            {/* Main image tilted */}
            <div
              className="absolute inset-0 z-10"
              style={{ transform: 'rotate(2deg)', top: 0, bottom: 40, right: 0 }}
            >
              <img
                src={onionHarvesterImg}
                alt="Onion harvester in the field, Mota Asrana"
                className="w-full h-full object-cover border-2 border-ink"
                style={{ boxShadow: '8px 8px 0 #2C1810', borderRadius: 8 }}
              />
            </div>
            {/* Inset card bottom-left */}
            <div
              className="absolute bottom-0 left-0 w-2/5 z-20"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <img
                src={heroImage}
                alt="Gujarat farmland"
                className="w-full object-cover border-2 border-ink"
                style={{ aspectRatio: '4/3', boxShadow: '5px 5px 0 #2C1810', borderRadius: 6 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom patola strip divider */}
      <div className="patola-strip mt-2" />
    </section>
  );
};

export default Hero;

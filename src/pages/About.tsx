import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";

const About = () => {
  const { language, t } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે Farmulya — મારે સંપર્ક કરવો છે.'
    : 'Hello Farmulya — I would like to get in touch.';

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero band */}
        <section className="bg-ink py-16">
          <div className="container max-w-3xl text-center">
            {/* Brand mark */}
            <div
              className="w-16 h-16 bg-kesar border-2 border-kesar-glow flex items-center justify-center font-black text-3xl text-ink mx-auto mb-6 shadow-chunky-sm"
              style={{ transform: 'rotate(-3deg)', borderRadius: 8 }}
            >
              F
            </div>
            <h1 className={`text-4xl md:text-5xl font-display font-black text-cream mb-3 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {t('about.title')}
            </h1>
            <p className={`font-mono text-xs uppercase tracking-widest text-kesar-glow ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu' ? 'Farmulya · ખેત મશીનરી' : 'FARMULYA · FARM MACHINERY'}
            </p>
          </div>
        </section>

        <div className="patola-strip" style={{ filter: 'invert(1)' }} />

        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            {/* Mission */}
            <div className="border-2 border-ink rounded-lg p-6 md:p-8 bg-cream-deep shadow-chunky-sm mb-6">
              <h2 className={`text-2xl font-display font-black text-ink mb-4 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {t('about.mission')}
              </h2>
              <p className={`text-ink-soft leading-relaxed text-lg ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {t('about.missionText')}
              </p>
            </div>

            {/* Promise box */}
            <div className="border-2 border-kesar rounded-lg p-6 bg-kesar/10 mb-6 flex items-start gap-4">
              <span className="text-3xl font-black text-kesar-deep mt-1">★</span>
              <p className={`text-ink font-semibold text-lg leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu'
                  ? 'ઓપરેટર સાથે જ આવે. મશીન એકલું ભાડે આપવાનો ધંધો નહીં.'
                  : 'Operator always included. We do not rent machines without one.'}
              </p>
            </div>

            {/* Contact */}
            <div className="border-2 border-ink rounded-lg p-6 md:p-8 bg-cream-deep shadow-chunky-sm">
              <h2 className={`text-2xl font-display font-black text-ink mb-6 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {t('contact.title')}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <a
                  href={buildWaLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border-2 border-ink rounded-lg bg-monsoon text-cream hover:bg-monsoon-deep transition-colors shadow-chunky-sm"
                >
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <p className={`text-xs opacity-80 ${language === 'gu' ? 'font-gujarati' : ''}`}>{t('contact.whatsapp')}</p>
                  </div>
                </a>
                <a
                  href="mailto:hello@farmulya.in"
                  className="flex items-center gap-3 p-4 border-2 border-ink rounded-lg bg-cream hover:bg-kesar/20 transition-colors shadow-chunky-sm"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-bold text-ink">hello@farmulya.in</p>
                    <p className="text-xs text-ink-soft">Email</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-4 border-2 border-ink/30 rounded-lg bg-cream-deep">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className={`font-bold text-ink ${language === 'gu' ? 'font-gujarati' : ''}`}>
                      {language === 'gu' ? 'મોટા અસરાણા, મહુવા' : 'Mota Asrana, Mahuva'}
                    </p>
                    <p className="text-xs text-ink-soft">Saurashtra, Gujarat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";
import FarmulyaMark from "@/components/FarmulyaMark";

const About = () => {
  const { language, t } = useLanguage();
  const g = language === 'gu';

  const waMsg = g
    ? 'નમસ્તે Farmulya — મારે સંપર્ક કરવો છે.'
    : 'Hello Farmulya — I would like to get in touch.';

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="bg-black py-16">
          <div className="container max-w-[600px] text-center">
            <div className="flex justify-center mb-6">
              <FarmulyaMark size={64} />
            </div>
            <h1 className={`text-white mb-2 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: g ? 1.3 : 1.2 }}>
              {t('about.title')}
            </h1>
            <p className={`font-mono text-sm ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--orange-glow)' }}>
              {g ? 'Farmulya · ખેત મશીનરી' : 'Farmulya · Farm machinery'}
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container max-w-[600px] flex flex-col gap-5">
            <div className="card p-6">
              <h2 className={`text-2xl mb-3 text-black ${g ? 'font-gujarati' : ''}`}>
                {t('about.mission')}
              </h2>
              <p className={`leading-relaxed text-lg ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--text-2)' }}>
                {t('about.missionText')}
              </p>
            </div>

            <div className="rounded-lg p-5 flex items-start gap-4" style={{ background: 'var(--orange-tint)', border: '1.5px solid var(--line)' }}>
              <span className="text-2xl" style={{ color: 'var(--orange-deep)' }}>★</span>
              <p className={`font-semibold text-lg leading-relaxed text-black ${g ? 'font-gujarati' : ''}`}>
                {g
                  ? 'ઓપરેટર સાથે જ આવે. મશીન એકલું ભાડે આપવાનો ધંધો નહીં.'
                  : 'Operator always included. We do not rent machines without one.'}
              </p>
            </div>

            <div className="card p-6">
              <h2 className={`text-2xl mb-4 text-black ${g ? 'font-gujarati' : ''}`}>
                {t('contact.title')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <a
                  href={buildWaLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg bg-green text-white"
                >
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <p className={`text-xs opacity-80 ${g ? 'font-gujarati' : ''}`}>{t('contact.whatsapp')}</p>
                  </div>
                </a>
                <a
                  href="mailto:hello@farmulya.in"
                  className="card flex items-center gap-3 p-4"
                >
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-bold text-black">hello@farmulya.in</p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>Email</p>
                  </div>
                </a>
                <div className="card flex items-center gap-3 p-4 sm:col-span-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className={`font-bold text-black ${g ? 'font-gujarati' : ''}`}>
                      {g ? 'મહુવા, સૌરાષ્ટ્ર' : 'Mahuva, Saurashtra'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                      {g ? '20 કિ.મી. આસપાસ' : 'Within 20 km'}
                    </p>
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

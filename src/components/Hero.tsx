import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";
import gaspardoImg from "@/assets/machine-gaspardo-olimpia.jpg";

const Hero = () => {
  const { language } = useLanguage();
  const g = language === 'gu';

  const waMsg = g
    ? 'નમસ્તે Farmulya — મારે મશીન વિશે પૂછવું છે.'
    : 'Hello Farmulya — I want to ask about machines.';

  return (
    <section className="bg-white" style={{ paddingTop: 32, paddingBottom: 36 }}>
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:[grid-template-columns:1.1fr_1fr] lg:gap-12" style={{ paddingTop: 0 }}>
          <div>
            <p className="eyebrow-label mb-4">
              {g ? 'Farmમૂલ્ય · મહુવા' : 'Farmulya · Mahuva'}
            </p>

            <h1
              className={`text-black mb-4 ${g ? 'font-gujarati' : ''}`}
              style={{
                fontSize: 'clamp(44px, 11vw, 84px)',
                lineHeight: g ? 1.3 : 1.2,
                letterSpacing: g ? '-0.005em' : '-0.015em',
              }}
            >
              {g ? (
                <>તમારા ખેતર નું <span style={{ color: 'var(--green)' }}>મૂલ્ય</span> વધારીએ</>
              ) : (
                <>Increasing the <span style={{ color: 'var(--green)' }}>value</span> of your farm</>
              )}
            </h1>

            <p className={`leading-relaxed mb-6 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 18, color: 'var(--text-2)' }}>
              {g
                ? 'એક ભરોસાદાર ટીમ. ઓપરેટર સાથે. મહુવા આસપાસ 20 કિ.મી. સુધી.'
                : 'One reliable team. Operator included. Anywhere within 20 km of Mahuva.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                to="/appointments"
                className={`press-98 flex items-center justify-center h-[58px] px-6 rounded-lg bg-black text-white font-bold text-lg ${g ? 'font-gujarati' : ''}`}
              >
                {g ? 'મશીન બુક કરો' : 'Book a machine'} →
              </Link>
              <a
                href={buildWaLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`press-98 flex items-center justify-center h-[58px] px-6 rounded-lg bg-surface border-[1.5px] border-line text-black font-bold text-lg ${g ? 'font-gujarati' : ''}`}
              >
                {g ? 'પહેલાં પૂછો' : 'Ask first'}
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { en: '20 km radius', gu: '20 કિ.મી. રેન્જ' },
                { en: 'Operator included', gu: 'ઓપરેટર સાથે' },
                { en: 'Pay in cash', gu: 'રોકડ ચુકવણી' },
              ].map((c) => (
                <span
                  key={c.en}
                  className={`text-sm font-semibold border-[1.5px] border-line rounded-full px-3 py-1.5 ${g ? 'font-gujarati' : ''}`}
                >
                  {g ? c.gu : c.en}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', borderRadius: 18, border: '1.5px solid var(--line)' }}>
            <img
              src={gaspardoImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

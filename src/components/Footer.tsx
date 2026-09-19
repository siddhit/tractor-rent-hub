import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";

const Footer = () => {
  const { language } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે ખેત-સાથી — મારે સંપર્ક કરવો છે.'
    : 'Hello Khet Saathi — I would like to get in touch.';

  const links = [
    { to: '/', gu: 'ઘરે', en: 'Home' },
    { to: '/implements', gu: 'મશીન', en: 'Machines' },
    { to: '/appointments', gu: 'બુક કરો', en: 'Book' },
    { to: '/faq', gu: 'પ્રશ્નો', en: 'FAQ' },
  ];

  const comingSoon = [
    { gu: '/ પાક-વાર કેલેન્ડર', en: '/ Crop calendars' },
    { gu: '/ બુકિંગ હિસ્ટ્રી', en: '/ Booking history' },
    { gu: '/ સર્વિસ-રેન્જ મેપ', en: '/ Service area map' },
  ];

  return (
    <footer className="bg-ink text-cream pt-12 pb-6" style={{ borderTop: '4px solid var(--kesar)' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 bg-kesar border-2 border-ink flex items-center justify-center font-black text-xl text-ink"
                style={{ transform: 'rotate(-3deg)', borderRadius: 6, boxShadow: '2px 2px 0 var(--kesar-glow)' }}
              >
                ખ
              </div>
              <div className="leading-tight">
                <div className="font-gujarati font-bold text-xl text-cream">
                  {language === 'gu' ? 'ખેત-સાથી' : 'Khet Saathi'}
                </div>
                <div className="font-mono text-[10px] text-cream/50 uppercase tracking-wider">
                  {language === 'gu' ? 'KHET SAATHI' : 'ખેત-સાથી'}
                </div>
              </div>
            </div>
            <p className={`text-cream/60 text-sm leading-relaxed max-w-xs mb-4 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'ખેતી નો સાથી — મોટા અસરાણા, મહુવા, સૌરાષ્ટ્ર.'
                : "The farm's companion — Mota Asrana, Mahuva, Saurashtra."}
            </p>
            <a
              href={buildWaLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-monsoon text-cream border border-monsoon-deep text-sm font-bold px-4 py-2 rounded"
            >
              WhatsApp
            </a>
          </div>

          {/* Links column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-kesar-glow mb-4">
              {language === 'gu' ? 'જોડાણ' : 'Links'}
            </h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`text-cream/70 hover:text-cream transition-colors text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}
                  >
                    {language === 'gu' ? l.gu : l.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coming soon column */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-kesar-glow mb-4">
              {language === 'gu' ? 'ટૂંક સમયમાં' : 'Coming soon'}
            </h4>
            <ul className="space-y-2">
              {comingSoon.map((item, i) => (
                <li key={i} className={`text-cream/50 text-sm ${language === 'gu' ? 'font-gujarati' : 'font-mono'}`}>
                  {language === 'gu' ? item.gu : item.en}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cream/40 font-mono">
          <p>© {new Date().getFullYear()} Khet Saathi · {language === 'gu' ? 'સૌરાષ્ટ્ર થી' : 'From Saurashtra'}</p>
          <p className={language === 'gu' ? 'font-gujarati' : ''}>
            {language === 'gu' ? 'અમે ઉપજ સુધારા ની ગેરંટી નથી આપતા.' : "We don't guarantee yield improvement."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

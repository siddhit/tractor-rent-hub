import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";

const Footer = () => {
  const { language, t } = useLanguage();
  const year = new Date().getFullYear();

  const waMsg = language === 'gu'
    ? 'નમસ્તે ખેત-સાથી — મારે સંપર્ક કરવો છે.'
    : 'Hello Khet Saathi — I would like to get in touch.';

  return (
    <footer className="bg-ink text-cream pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 bg-kesar border-2 border-kesar-glow flex items-center justify-center font-black text-xl text-ink"
                style={{ transform: 'rotate(-3deg)', borderRadius: 6 }}
              >
                ખ
              </div>
              <div className="leading-tight">
                <div className="font-gujarati font-bold text-xl text-cream">{t('brand.name')}</div>
                <div className="font-mono text-[10px] text-cream/50 uppercase tracking-wider">{t('brand.tagline')}</div>
              </div>
            </div>
            <p className={`text-cream/60 text-sm leading-relaxed max-w-xs ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {t('about.missionText')}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-kesar-glow mb-4">
              {language === 'gu' ? 'ઝડપી લિન્ક' : 'Quick links'}
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: t('nav.home') },
                { to: '/implements', label: t('nav.implements') },
                { to: '/appointments', label: t('nav.appointments') },
                { to: '/calculator', label: t('nav.calculator') },
                { to: '/about', label: t('nav.about') },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`text-cream/70 hover:text-cream transition-colors text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-kesar-glow mb-4">
              {t('contact.title')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:+919723000299"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  +91 97230 00299
                </a>
              </li>
              <li>
                <a
                  href={buildWaLink(waMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-cream/70 hover:text-cream transition-colors ${language === 'gu' ? 'font-gujarati' : ''}`}
                >
                  {t('contact.whatsapp')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@khetsaathi.in"
                  className="text-cream/70 hover:text-cream transition-colors"
                >
                  hello@khetsaathi.in
                </a>
              </li>
              <li className={`text-cream/50 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu'
                  ? 'મોટા અસરાણા, મહુવા, સૌરાષ્ટ્ર'
                  : 'Mota Asrana, Mahuva, Saurashtra'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-cream/40 font-mono">
          <p>© {year} Khet Saathi. All rights reserved.</p>
          <p className={`font-gujarati not-italic ${language === 'gu' ? '' : 'opacity-60'}`}>
            સૌરાષ્ટ્ર ના ખેડૂત ભાઈઓ માટે
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

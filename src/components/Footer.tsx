import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background/80 py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoIcon} alt="AgriSaathi" className="w-12 h-12 object-contain" />
              <div>
                <span className="font-display font-bold text-xl text-background">AgriSaathi</span>
                <p className="text-sm font-gujarati text-background/60">અગ્રીસાથી</p>
              </div>
            </div>
            <p className="text-background/60 mb-4 max-w-sm leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-background transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/implements" className="hover:text-background transition-colors">
                  {t('nav.implements')}
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-background transition-colors">
                  {t('nav.appointments')}
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-background transition-colors">
                  {t('nav.calculator')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg text-background mb-4">{t('contact.title')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+919876543210" className="hover:text-background transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:hello@agrisaathi.in" className="hover:text-background transition-colors">
                  hello@agrisaathi.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-background/60">
                  Rajkot, Saurashtra<br />
                  Gujarat, India
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-primary mt-0.5" />
                <span className="text-background/60">
                  Mon-Sat: 8am-7pm<br />
                  Sun: 9am-1pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {currentYear} AgriSaathi. All rights reserved.</p>
          <p className="font-gujarati">ગુજરાતના ખેડૂતો માટે બનાવ્યું ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

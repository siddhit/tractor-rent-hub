import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/implements", label: t('nav.implements') },
    { href: "/appointments", label: t('nav.appointments') },
    { href: "/calculator", label: t('nav.calculator') },
    { href: "/about", label: t('nav.about') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-cream border-b-2 border-ink">
      <div className="container flex items-center justify-between h-16">
        {/* Brand mark */}
        <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label="Khet Saathi home">
          <div
            className="w-10 h-10 bg-kesar border-2 border-ink flex items-center justify-center font-black text-xl text-ink shadow-chunky-sm"
            style={{ transform: 'rotate(-3deg)', borderRadius: 6 }}
          >
            ખ
          </div>
          <div className="leading-tight">
            <div className="font-gujarati font-bold text-xl text-ink leading-none">
              {language === 'gu' ? 'ખેત-સાથી' : 'Khet Saathi'}
            </div>
            <div className="font-mono text-[10px] text-ink-fade uppercase tracking-wider leading-none mt-0.5">
              {language === 'gu' ? 'KHET SAATHI' : 'ખેત-સાથી'}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-semibold transition-colors pb-0.5 border-b-2 ${
                isActive(link.href)
                  ? 'border-kesar text-ink'
                  : 'border-transparent text-ink-soft hover:text-ink hover:border-ink'
              } ${language === 'gu' ? 'font-gujarati' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <div className="flex border-2 border-ink rounded-full overflow-hidden text-sm font-bold">
            <button
              onClick={() => setLanguage('gu')}
              className={`px-3 py-1 transition-colors ${language === 'gu' ? 'bg-ink text-cream' : 'bg-transparent text-ink'}`}
              aria-label="Switch to Gujarati"
            >
              ગુ
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 transition-colors ${language === 'en' ? 'bg-ink text-cream' : 'bg-transparent text-ink'}`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-ink"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-cream border-t-2 border-ink animate-fade-in">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 rounded font-semibold border-2 ${
                  isActive(link.href)
                    ? 'bg-kesar border-ink text-ink shadow-chunky-sm'
                    : 'border-transparent text-ink hover:bg-cream-deep'
                } ${language === 'gu' ? 'font-gujarati' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="tel:+919723000299"
              className="mt-2 py-3 px-4 font-mono text-sm text-ink-soft"
            >
              +91 97230 00299
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

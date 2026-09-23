import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import FarmulyaMark from "@/components/FarmulyaMark";
import FarmulyaWordmark from "@/components/FarmulyaWordmark";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: "/", label: t('nav.home') },
    { href: "/implements", label: t('nav.implements') },
    { href: "/appointments", label: t('nav.appointments') },
    { href: "/faq", label: t('nav.faq') },
    { href: "/about", label: t('nav.about') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b-[1.5px] border-line" style={{ height: 64 }}>
      <div className="container flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-2.5 no-underline" aria-label="Farmulya home">
          <FarmulyaMark size={40} />
          <FarmulyaWordmark />
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex bg-surface rounded-xl p-[3px]" role="group" aria-label="Language">
            <button
              onClick={() => setLanguage('gu')}
              aria-pressed={language === 'gu'}
              className={`min-w-[44px] h-9 rounded-lg text-sm font-bold transition-colors ${language === 'gu' ? 'bg-black text-white' : 'bg-transparent text-black'}`}
            >
              ગુ
            </button>
            <button
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              className={`min-w-[44px] h-9 rounded-lg text-sm font-bold transition-colors ${language === 'en' ? 'bg-black text-white' : 'bg-transparent text-black'}`}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-white border-t-[1.5px] border-line animate-fade-in">
          <nav className="container py-2 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center h-[52px] px-3 font-semibold rounded-md ${
                  isActive(link.href) ? 'bg-orange-tint' : ''
                } ${language === 'gu' ? 'font-gujarati' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

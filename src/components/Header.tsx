import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logoIcon} alt="AgriSaathi" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg md:text-xl text-primary leading-tight">AgriSaathi</span>
            <span className="text-[10px] md:text-xs text-muted-foreground font-gujarati leading-tight">અગ્રીસાથી</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
            className="px-3 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            {language === 'en' ? 'ગુ' : 'EN'}
          </button>

          <a href="tel:+919876543210" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Phone className="w-4 h-4" />
            <span className="text-sm font-medium hidden xl:inline">+91 98765 43210</span>
          </a>
          
          <Button asChild variant="hero" size="default">
            <Link to="/appointments">{t('nav.appointments')}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'gu' : 'en')}
            className="px-2.5 py-1 rounded-full border border-border text-sm font-medium"
          >
            {language === 'en' ? 'ગુ' : 'EN'}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`py-3 px-4 rounded-lg font-medium ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-muted-foreground py-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+91 98765 43210</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

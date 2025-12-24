import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logoIcon from "@/assets/logo-icon.png";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24">
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <img src={logoIcon} alt="AgriSaathi" className="w-24 h-24 mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-display text-foreground mb-2">
                {t('about.title')}
              </h1>
              <p className="text-xl font-gujarati text-primary">અગ્રીસાથી</p>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card mb-10">
              <h2 className="text-2xl font-display text-foreground mb-4">{t('about.mission')}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('about.missionText')}
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 md:p-10 shadow-card">
              <h2 className="text-2xl font-display text-foreground mb-6">{t('contact.title')}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a href="tel:+919876543210" className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/10 transition-colors">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">+91 98765 43210</p>
                    <p className="text-sm text-muted-foreground">{t('contact.call')}</p>
                  </div>
                </a>
                <a href="mailto:hello@agrisaathi.in" className="flex items-center gap-4 p-4 rounded-xl bg-muted hover:bg-primary/10 transition-colors">
                  <div className="w-12 h-12 rounded-full gradient-green flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">hello@agrisaathi.in</p>
                    <p className="text-sm text-muted-foreground">Email us</p>
                  </div>
                </a>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-muted flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground">Rajkot, Saurashtra</p>
                  <p className="text-muted-foreground">Gujarat, India - 360001</p>
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

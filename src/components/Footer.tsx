import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";
import { WA_NUMBER } from "@/config";
import FarmulyaMark from "@/components/FarmulyaMark";
import FarmulyaWordmark from "@/components/FarmulyaWordmark";

const Footer = () => {
  const { language } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે Farmulya — મારે સંપર્ક કરવો છે.'
    : 'Hello Farmulya — I would like to get in touch.';

  return (
    <footer className="bg-black text-white p-8">
      <div className="container max-w-[600px] flex flex-col items-start gap-4">
        <div className="flex items-center gap-2.5">
          <FarmulyaMark size={40} ring={false} />
          <FarmulyaWordmark dark />
        </div>
        <p className={`text-[#CFCFCF] text-sm leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {language === 'gu'
            ? 'ખેતરનું સાચું મૂલ્ય — મહુવા, સૌરાષ્ટ્ર.'
            : "Real value for your farm — Mahuva, Saurashtra."}
        </p>
        <a
          href={buildWaLink(waMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-glow text-sm font-semibold"
        >
          +91 {WA_NUMBER.slice(2, 7)} {WA_NUMBER.slice(7)} · farmulya.in
        </a>
        <p className="font-mono text-xs text-[#A3A3A3]">
          © {new Date().getFullYear()} Farmulya · {language === 'gu' ? (
            <span className="font-gujarati">અમે ઉપજ સુધારા ની ગેરંટી નથી આપતા.</span>
          ) : "We don't guarantee yield improvement."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { buildWaLink } from "@/components/WhatsAppButton";

const faqs = [
  {
    gu: 'કામ વચ્ચે મશીન બગડે તો કોણ ભરે?',
    en: 'What if the machine breaks mid-work — who pays?',
    a: {
      gu: 'અમે. અમારો ઓપરેટર તરત બીજું મશીન બોલાવે. તમારા કામ માં કોઈ ચાર્જ ન વધે.',
      en: 'We do. Our operator calls a backup machine immediately. No extra charge on your end.',
    },
  },
  {
    gu: 'જો મશીન થી પાક ને નુકસાન થાય?',
    en: 'What if the machine damages my crop?',
    a: {
      gu: 'ઓપરેટર ટ્રેઇન્ડ છે. છતાં નુકસાન થાય તો બેલેન્સ ચૂકવતી વખતે કમ્પન્સેશન ગણી ને કાપી આપીએ.',
      en: 'Our operators are trained. If damage still occurs, we deduct compensation from the balance payment.',
    },
  },
  {
    gu: 'ચૂકવણી ની શું શરત?',
    en: 'What are the payment terms?',
    a: {
      gu: 'ગાસ્પર્ડો માટે 50% એડવાન્સ. કલાક ના ભાવ ના મશીન (બેડ-ફોર્મર, ડિગર) માટે બુક કરેલા દરેક દિવસ દીઠ ₹1,500 ફ્લેટ એડવાન્સ. એડવાન્સ ફક્ત UPI થી, બાકી કામ પૂરું થાય એટલે.',
      en: '50% advance for the Gaspardo. For the hourly machines (Bed Former, Digger) a flat ₹1,500 advance per day booked. Advance is UPI only; balance once the work is done.',
    },
  },
  {
    gu: 'હું ભાગીદાર ખેડૂત (ભાગ્યા) છું — બુક થાય?',
    en: "I'm a bhagya (sharecropper) — can I book?",
    a: {
      gu: 'હા. જમીન માલિક ની મંજૂરી મળેલી હોવી જોઈએ, બાકી કોઈ તકલીફ નથી.',
      en: "Yes. We just need confirmation that the landowner has approved. That's all.",
    },
  },
  {
    gu: 'ઓછામાં ઓછા કેટલા વીઘા?',
    en: "What's the minimum area?",
    a: {
      gu: 'બેડ-ફોર્મર માટે 2 વીઘા. બાકી મશીન માટે 5 વીઘા — વીઘા દીઠ ખર્ચ ઓછો.',
      en: '2 vigha for the Bed Former. 5 vigha recommended for the others — better per-vigha economics.',
    },
  },
  {
    gu: 'બુકિંગ કેટલા દિવસ પહેલાં કરવું?',
    en: 'How much notice do I need to book?',
    a: {
      gu: 'સિઝન ના બહાર: 2-3 દિવસ. પીક સિઝન (ઓક્ટ-ફેબ્રુ): ઓછામાં ઓછા 7 દિવસ.',
      en: 'Off-peak: 2-3 days. Peak season (Oct-Feb): 7 days minimum.',
    },
  },
  {
    gu: 'વરસાદ પડે ને તારીખ બદલાય તો?',
    en: 'What if rain pushes the date?',
    a: {
      gu: 'જો અમે ન આવી શકીએ તો એડવાન્સ પૂરો પાછો. વરસાદ ના કારણે તારીખ ખસે તો એડવાન્સ નવી તારીખ માં વપરાય. તમે 24 કલાક ની અંદર બુકિંગ રદ કરો તો જ એડવાન્સ જાય.',
      en: "Refunded in full if we can't come. If weather moves the date, the advance carries to the new date. It's forfeited only if you cancel inside 24 hours.",
    },
  },
  {
    gu: 'રીંગણ, ટામેટા ના ખેતર માં પણ કામ થાય?',
    en: 'Do you serve vegetables like tomato, brinjal?',
    a: {
      gu: 'અત્યારે ફક્ત 3 પાક — ડુંગળી, કપાસ, મગફળી. બીજા પાક માં મશીન સરખા બેસે નહીં.',
      en: 'Only onion, cotton, and groundnut for now. Our machines are optimised for those crops.',
    },
  },
];

const FaqItem = ({ q, num, language }: { q: typeof faqs[0]; num: number; language: 'gu' | 'en' }) => {
  const [open, setOpen] = useState(num === 1);
  return (
    <div className="border-2 border-ink bg-cream-deep rounded-lg overflow-hidden shadow-chunky-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-4 p-4 text-left bg-transparent"
      >
        <span className="font-mono font-extrabold text-xl text-kesar-deep shrink-0">
          0{num}
        </span>
        <span className={`font-semibold text-ink flex-1 ${language === 'gu' ? 'font-gujarati' : ''}`}>
          {language === 'gu' ? q.gu : q.en}
        </span>
        <span
          className="text-2xl text-ink-fade shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(45deg)' : 'none' }}
        >
          +
        </span>
      </button>
      {open && (
        <div className={`px-5 pb-5 pt-1 text-ink-soft leading-relaxed ${language === 'gu' ? 'font-gujarati' : ''}`}
          style={{ paddingLeft: '3.5rem' }}>
          {language === 'gu' ? q.a.gu : q.a.en}
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const { language } = useLanguage();

  const waMsg = language === 'gu'
    ? 'નમસ્તે ખેત-સાથી — મારે પ્રશ્ન પૂછવો છે.'
    : 'Hello Khet Saathi — I have a question.';

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
            <p className="eyebrow-label text-ink-soft mb-3">
              {language === 'gu' ? 'પ્રશ્નો' : 'Questions'}
            </p>
            <h1
              className="text-ink mb-3"
              style={{
                fontFamily: language === 'gu' ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4.5vw, 48px)',
                fontWeight: 800,
                lineHeight: language === 'gu' ? 1.3 : 1.1,
              }}
            >
              {language === 'gu' ? 'પહેલાં આ જ પૂછાય છે' : 'The questions farmers always ask'}
            </h1>
            <p className={`text-ink-soft text-lg mb-10 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'ન હોય જવાબ તો WhatsApp કરો — પૂછવું ફ્રી.'
                : "Not answered? WhatsApp us — asking is free."}
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {faqs.map((q, i) => (
                <FaqItem key={i} q={q} num={i + 1} language={language} />
              ))}
            </div>

            <div className="text-center">
              <a
                href={buildWaLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-monsoon text-cream border-2 border-ink font-bold text-lg py-4 px-6 rounded shadow-chunky-sm"
              >
                <span className="w-6 h-6 rounded-full bg-cream text-monsoon flex items-center justify-center text-xs font-black">✓</span>
                <span className={language === 'gu' ? 'font-gujarati' : ''}>
                  {language === 'gu' ? 'WhatsApp પર પૂછો' : 'Ask on WhatsApp'}
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Faq;

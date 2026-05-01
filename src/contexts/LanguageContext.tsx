import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'gu';

interface Translations {
  [key: string]: { en: string; gu: string };
}

const translations: Translations = {
  'brand.name':    { en: 'Khet Saathi', gu: 'ખેત-સાથી' },
  'brand.tagline': { en: "The farm's companion", gu: 'ખેતી નો સાથી' },

  'nav.home':         { en: 'Home',     gu: 'ઘરે' },
  'nav.implements':   { en: 'Machines', gu: 'મશીન' },
  'nav.appointments': { en: 'Book',     gu: 'બુક કરો' },
  'nav.calculator':   { en: 'Savings',  gu: 'ગણતરી' },
  'nav.about':        { en: 'About',    gu: 'અમારા વિશે' },

  'hero.badge':        { en: 'Mota Asrana · Mahuva · Saurashtra', gu: 'મોટા અસરાણા · મહુવા · સૌરાષ્ટ્ર' },
  'hero.title':        { en: 'Farming that makes more money.', gu: 'ખેતી વધુ કમાણી ની.' },
  'hero.subtitle':     { en: 'Seven machines. One reliable team. Operator included. 20 km from Mota Asrana.', gu: 'સાત મશીન. એક ભરોસાદાર ટીમ. ઓપરેટર સાથે. મોટા અસરાણા થી 20 કિ.મી. સુધી.' },
  'hero.cta.whatsapp': { en: 'WhatsApp Us', gu: 'WhatsApp અમને' },
  'hero.cta.machines': { en: 'See the machines', gu: 'મશીન જુઓ' },

  'implements.title':     { en: 'Our Machines', gu: 'અમારા મશીન' },
  'implements.subtitle':  { en: 'Seven machines for every stage — land prep to harvest. Operator always included.', gu: 'જમીન તૈયારી થી લણણી — ઓપરેટર સાથે.' },
  'implements.viewAll':   { en: 'See all machines', gu: 'બધા મશીન જુઓ' },
  'implements.available': { en: 'Available', gu: 'ઉપલબ્ધ' },
  'implements.busy':      { en: 'Coming soon', gu: 'ટૂંક સમયમાં' },
  'implements.book':      { en: 'Book', gu: 'બુક કરો' },

  'cat.land-prep':   { en: 'Land Prep',   gu: 'જમીન તૈયારી' },
  'cat.planting':    { en: 'Planting',    gu: 'વાવણી' },
  'cat.crop-season': { en: 'Crop Season', gu: 'પાક-સિઝન' },
  'cat.harvest':     { en: 'Harvest',     gu: 'લણણી' },

  'crop.onion':     { en: 'Onion',     gu: 'ડુંગળી' },
  'crop.cotton':    { en: 'Cotton',    gu: 'કપાસ' },
  'crop.groundnut': { en: 'Groundnut', gu: 'મગફળી' },
  'crop.all':       { en: 'All crops', gu: 'બધા પાક' },

  'how.title':       { en: 'How it works', gu: 'કેવી રીતે કામ કરે' },
  'how.step1.title': { en: 'Pick a machine', gu: 'મશીન પસંદ કરો' },
  'how.step1.desc':  { en: 'Tell us the task — land prep, sowing, spraying, or harvest.', gu: 'કામ જણાવો — ખેડ, વાવણી, છંટકાવ, કે લણણી.' },
  'how.step2.title': { en: 'Book your dates', gu: 'તારીખ બુક કરો' },
  'how.step2.desc':  { en: 'WhatsApp us or fill the short form. We confirm within the hour.', gu: 'WhatsApp કરો. એક કલાકમાં કન્ફર્મ.' },
  'how.step3.title': { en: 'We come to your field', gu: 'અમે ખેતર પર આવીએ' },
  'how.step3.desc':  { en: 'Operator arrives with the machine. You supervise, we do the work.', gu: 'ઓપરેટર મશીન સાથે આવે. તમે જુઓ, અમે કામ કરીએ.' },

  'wa.pill': { en: 'WhatsApp Us', gu: 'WhatsApp અમને' },
  'wa.sub':  { en: '24×7 · fast reply', gu: '24×7 · ઝડપી જવાબ' },

  'about.title':       { en: 'About Khet Saathi', gu: 'ખેત-સાથી વિશે' },
  'about.mission':     { en: 'Our Mission', gu: 'અમારું ધ્યેય' },
  'about.missionText': { en: 'We bring precision farm machinery — with a trained operator — to Saurashtra farmers. We own the machines, we train the operators, and we stand behind the work.', gu: 'સૌરાષ્ટ્ર ના ખેડૂત ભાઈઓ માટે ચોક્કસ ખેતી-મશીન — ઓપરેટર સહિત. અમારા મશીન, અમારા ઓપરેટર, અમારી જવાબદારી.' },

  'contact.title':    { en: 'Contact', gu: 'સંપર્ક' },
  'contact.whatsapp': { en: 'Chat on WhatsApp', gu: 'WhatsApp પર ચેટ' },
  'contact.call':     { en: 'Call us', gu: 'ફોન કરો' },

  'calc.title':     { en: 'Savings Calculator', gu: 'બચત ગણો' },
  'calc.subtitle':  { en: 'See how much you save on labour, chemicals, and time.', gu: 'મજૂરી, દવા, સમય — બધું ગણો.' },
  'calc.landSize':  { en: 'Land size (vigha)', gu: 'જમીન (વીઘા)' },
  'calc.cropType':  { en: 'Crop', gu: 'પાક' },
  'calc.laborCost': { en: 'Labour cost/day (₹)', gu: 'મજૂરી/દિવસ (₹)' },
  'calc.calculate': { en: 'Calculate', gu: 'ગણો' },
  'calc.savings':   { en: 'Estimated savings', gu: 'અંદાજિત બચત' },
  'calc.timeSaved': { en: 'Days saved', gu: 'દિવસ બચ્યા' },
  'calc.days':      { en: 'days', gu: 'દિવસ' },

  'appt.title':           { en: 'Book farm work', gu: 'ખેતીનું કામ બુક કરો' },
  'appt.selectDate':      { en: 'Select dates', gu: 'તારીખ પસંદ કરો' },
  'appt.selectImplement': { en: 'Which machine?', gu: 'કયું મશીન?' },
  'appt.farmSize':        { en: 'Farm size', gu: 'ખેતરનું કદ' },
  'appt.total':           { en: 'Estimated cost', gu: 'અંદાજિત ખર્ચ' },
  'appt.payUpi':          { en: 'Pay advance via UPI', gu: 'UPI થી એડવાન્સ' },
  'appt.confirm':         { en: 'Submit request', gu: 'રિક્વેસ્ટ મોકલો' },
  'appt.fieldReady':      { en: 'Field is ready for work', gu: 'ખેતર કામ માટે તૈયાર' },
  'appt.irrigationDone':  { en: 'Irrigation is completed', gu: 'સિંચાઈ પૂર્ણ' },
  'appt.obstructions':    { en: 'No obstructions in the field', gu: 'ખેતરમાં અવરોધ નથી' },
  'appt.disclaimer':      { en: 'Note: Field readiness affects cost. No guarantee of yield improvement.', gu: 'નોંધ: ખેતર ની સ્થિતિ ખર્ચ ને અસર કરે. ઉપજ સુધારાની ગેરંટી નથી.' },
  'appt.requestReceived': { en: 'Request received!', gu: 'રિક્વેસ્ટ મળી ગઈ!' },
  'appt.confirmWhatsApp': { en: "We'll confirm on WhatsApp", gu: 'WhatsApp પર કન્ફર્મ' },

  'common.learnMore': { en: 'Learn more', gu: 'વધુ જાણો' },
  'common.vigha':     { en: 'Vigha',     gu: 'વીઘા' },
  'common.acre':      { en: 'Acre',      gu: 'એકર' },
  'common.hectare':   { en: 'Hectare',   gu: 'હેક્ટર' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('gu');

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[language] ?? entry.en ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

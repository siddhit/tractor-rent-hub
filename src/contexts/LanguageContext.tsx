import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'gu';

interface Translations {
  [key: string]: {
    en: string;
    gu: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', gu: 'હોમ' },
  'nav.implements': { en: 'Machines', gu: 'મશીનો' },
  'nav.appointments': { en: 'Request Service', gu: 'સેવા માંગો' },
  'nav.calculator': { en: 'ROI Calculator', gu: 'ROI કેલ્ક્યુલેટર' },
  'nav.about': { en: 'About Us', gu: 'અમારા વિશે' },
  
  // Hero
  'hero.badge': { en: 'Serving Gujarat Farmers', gu: 'ગુજરાતના ખેડૂતોની સેવામાં' },
  'hero.title': { en: 'Timely farm work with reliable machines', gu: 'સમયસર ખેતીનું કામ — વિશ્વસનીય મશીનો સાથે' },
  'hero.subtitle': { en: 'Save time and labor costs on Onion, Cotton & Groundnut farming. Professional service delivered to your farm across Saurashtra.', gu: 'ડુંગળી, કપાસ અને મગફળી ખેતીમાં સમય અને મજૂરી ખર્ચ બચાવો. સૌરાષ્ટ્રમાં તમારા ખેતર પર વ્યાવસાયિક સેવા.' },
  'hero.cta.book': { en: 'Request Service', gu: 'સેવા માંગો' },
  'hero.cta.call': { en: 'Call Us', gu: 'કૉલ કરો' },
  
  // Stats
  'stats.farmers': { en: 'Happy Farmers', gu: 'ખુશ ખેડૂતો' },
  'stats.implements': { en: 'Machines', gu: 'મશીનો' },
  'stats.villages': { en: 'Villages Served', gu: 'ગામો' },
  
  // Implements
  'implements.title': { en: 'Our Machines', gu: 'અમારા મશીનો' },
  'implements.subtitle': { en: 'Quality equipment from top brands', gu: 'ટોપ બ્રાન્ડ્સના ગુણવત્તાવાળા સાધનો' },
  'implements.viewAll': { en: 'View All Machines', gu: 'બધા મશીનો જુઓ' },
  'implements.perBigha': { en: '/bigha', gu: '/વીઘા' },
  'implements.book': { en: 'Get Work Done', gu: 'કામ કરાવો' },
  'implements.available': { en: 'Available', gu: 'ઉપલબ્ધ' },
  'implements.busy': { en: 'Busy', gu: 'વ્યસ્ત' },
  
  // Crops
  'crop.onion': { en: 'Onion', gu: 'ડુંગળી' },
  'crop.cotton': { en: 'Cotton', gu: 'કપાસ' },
  'crop.groundnut': { en: 'Groundnut', gu: 'મગફળી' },
  'crop.all': { en: 'All Crops', gu: 'બધા પાક' },
  
  // How it works
  'how.title': { en: 'How It Works', gu: 'કેવી રીતે કામ કરે છે' },
  'how.step1.title': { en: 'What work do you need?', gu: 'કયું કામ કરાવવું છે?' },
  'how.step1.desc': { en: 'Tell us the task - plowing, seeding, harvesting, or spraying.', gu: 'કામ જણાવો - ખેડાણ, વાવણી, લણણી, અથવા છંટકાવ.' },
  'how.step2.title': { en: 'Select Dates', gu: 'તારીખ પસંદ કરો' },
  'how.step2.desc': { en: 'Choose your preferred date range and we will confirm availability.', gu: 'તમારી પસંદગીની તારીખો પસંદ કરો અને અમે ઉપલબ્ધતા કન્ફર્મ કરીશું.' },
  'how.step3.title': { en: 'We Do The Work', gu: 'અમે કામ કરીએ' },
  'how.step3.desc': { en: 'Our operator comes to your farm with the machine. You relax.', gu: 'અમારો ઓપરેટર મશીન સાથે તમારા ખેતરે આવે છે. તમે આરામ કરો.' },
  
  // About
  'about.title': { en: 'About AgriSaathi', gu: 'અગ્રીસાથી વિશે' },
  'about.mission': { en: 'Our Mission', gu: 'અમારું મિશન' },
  'about.missionText': { en: 'To help Gujarat farmers save time and labor costs with reliable farm machinery services. We focus on timely work completion so you can focus on your farm.', gu: 'ગુજરાતના ખેડૂતોને વિશ્વસનીય ખેતી મશીનરી સેવાઓ સાથે સમય અને મજૂરી ખર્ચ બચાવવામાં મદદ કરવી. અમે સમયસર કામ પૂર્ણ કરવા પર ધ્યાન આપીએ છીએ.' },
  
  // Contact
  'contact.title': { en: 'Contact Us', gu: 'સંપર્ક કરો' },
  'contact.whatsapp': { en: 'Chat on WhatsApp', gu: 'WhatsApp પર ચેટ કરો' },
  'contact.call': { en: 'Call Us', gu: 'કૉલ કરો' },
  
  // Calculator
  'calc.title': { en: 'Labor Savings Calculator', gu: 'મજૂરી બચત કેલ્ક્યુલેટર' },
  'calc.subtitle': { en: 'See how much time and money you can save', gu: 'તમે કેટલો સમય અને પૈસા બચાવી શકો તે જુઓ' },
  'calc.landSize': { en: 'Land Size (Bigha)', gu: 'જમીનનું કદ (વીઘા)' },
  'calc.cropType': { en: 'Crop Type', gu: 'પાકનો પ્રકાર' },
  'calc.laborCost': { en: 'Labor Cost/Day (₹)', gu: 'મજૂરી/દિવસ (₹)' },
  'calc.calculate': { en: 'Calculate Savings', gu: 'બચત ગણો' },
  'calc.savings': { en: 'Estimated Savings', gu: 'અંદાજિત બચત' },
  'calc.timeSaved': { en: 'Time Saved', gu: 'બચેલો સમય' },
  'calc.days': { en: 'days', gu: 'દિવસ' },
  
  // Appointments
  'appt.title': { en: 'Request Farm Work', gu: 'ખેતીનું કામ બુક કરો' },
  'appt.selectDate': { en: 'Select Date Range', gu: 'તારીખ રેન્જ પસંદ કરો' },
  'appt.selectImplement': { en: 'What work do you need?', gu: 'કયું કામ કરાવવું છે?' },
  'appt.farmSize': { en: 'Farm Size', gu: 'ખેતરનું કદ' },
  'appt.total': { en: 'Estimated Cost', gu: 'અંદાજિત ખર્ચ' },
  'appt.payUpi': { en: 'Pay Advance with UPI', gu: 'UPI થી એડવાન્સ ચૂકવો' },
  'appt.confirm': { en: 'Submit Request', gu: 'રિક્વેસ્ટ મોકલો' },
  'appt.fieldReady': { en: 'Is the field ready for work?', gu: 'ખેતર કામ માટે તૈયાર છે?' },
  'appt.irrigationDone': { en: 'Is irrigation completed?', gu: 'સિંચાઈ પૂર્ણ થઈ છે?' },
  'appt.obstructions': { en: 'Any obstructions in the field?', gu: 'ખેતરમાં કોઈ અવરોધ છે?' },
  'appt.disclaimer': { en: 'Note: Field readiness affects cost. We do not guarantee any improvement in crop yield or quality.', gu: 'નોંધ: ખેતરની તૈયારી ખર્ચને અસર કરે છે. અમે પાકની ઉપજ અથવા ગુણવત્તામાં કોઈ સુધારાની ગેરંટી આપતા નથી.' },
  'appt.requestReceived': { en: 'Request Received!', gu: 'રિક્વેસ્ટ મળી ગઈ!' },
  'appt.confirmWhatsApp': { en: 'We will confirm on WhatsApp', gu: 'અમે WhatsApp પર કન્ફર્મ કરીશું' },
  
  // Common
  'common.learnMore': { en: 'Learn More', gu: 'વધુ જાણો' },
  'common.price': { en: 'Price', gu: 'કિંમત' },
  'common.brand': { en: 'Brand', gu: 'બ્રાન્ડ' },
  'common.suitableFor': { en: 'Suitable for', gu: 'યોગ્ય છે' },
  'common.bigha': { en: 'Bigha', gu: 'વીઘા' },
  'common.acre': { en: 'Acre', gu: 'એકર' },
  'common.hectare': { en: 'Hectare', gu: 'હેક્ટર' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

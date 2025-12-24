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
  'nav.implements': { en: 'Implements', gu: 'સાધનો' },
  'nav.appointments': { en: 'Book Now', gu: 'બુક કરો' },
  'nav.calculator': { en: 'ROI Calculator', gu: 'ROI કેલ્ક્યુલેટર' },
  'nav.about': { en: 'About Us', gu: 'અમારા વિશે' },
  
  // Hero
  'hero.badge': { en: 'Serving Gujarat Farmers', gu: 'ગુજરાતના ખેડૂતોની સેવામાં' },
  'hero.title': { en: 'Rent Farm Implements,\nGrow Better Crops', gu: 'ખેત સાધનો ભાડે લો,\nસારો પાક ઉગાડો' },
  'hero.subtitle': { en: 'Quality tractor implements for Onion, Cotton & Groundnut farming. Delivered to your farm across Saurashtra.', gu: 'ડુંગળી, કપાસ અને મગફળી ખેતી માટે ગુણવત્તાવાળા ટ્રેક્ટર સાધનો. સૌરાષ્ટ્રમાં તમારા ખેતર પર ડિલિવરી.' },
  'hero.cta.book': { en: 'Book Appointment', gu: 'એપોઇન્ટમેન્ટ બુક કરો' },
  'hero.cta.call': { en: 'Call Us', gu: 'કૉલ કરો' },
  
  // Stats
  'stats.farmers': { en: 'Happy Farmers', gu: 'ખુશ ખેડૂતો' },
  'stats.implements': { en: 'Implements', gu: 'સાધનો' },
  'stats.villages': { en: 'Villages Served', gu: 'ગામો' },
  
  // Implements
  'implements.title': { en: 'Our Implements', gu: 'અમારા સાધનો' },
  'implements.subtitle': { en: 'Quality equipment from top brands', gu: 'ટોપ બ્રાન્ડ્સના ગુણવત્તાવાળા સાધનો' },
  'implements.viewAll': { en: 'View All Implements', gu: 'બધા સાધનો જુઓ' },
  'implements.perDay': { en: '/day', gu: '/દિવસ' },
  'implements.book': { en: 'Book Now', gu: 'બુક કરો' },
  'implements.available': { en: 'Available', gu: 'ઉપલબ્ધ' },
  'implements.onRent': { en: 'On Rent', gu: 'ભાડે છે' },
  
  // Crops
  'crop.onion': { en: 'Onion', gu: 'ડુંગળી' },
  'crop.cotton': { en: 'Cotton', gu: 'કપાસ' },
  'crop.groundnut': { en: 'Groundnut', gu: 'મગફળી' },
  'crop.all': { en: 'All Crops', gu: 'બધા પાક' },
  
  // How it works
  'how.title': { en: 'How It Works', gu: 'કેવી રીતે કામ કરે છે' },
  'how.step1.title': { en: 'Choose Implement', gu: 'સાધન પસંદ કરો' },
  'how.step1.desc': { en: 'Browse our range and select the right equipment for your crop.', gu: 'અમારી રેન્જ જુઓ અને તમારા પાક માટે યોગ્ય સાધન પસંદ કરો.' },
  'how.step2.title': { en: 'Book Dates', gu: 'તારીખ બુક કરો' },
  'how.step2.desc': { en: 'Select your preferred dates and pay securely via UPI.', gu: 'તમારી પસંદગીની તારીખો પસંદ કરો અને UPI દ્વારા ચૂકવણી કરો.' },
  'how.step3.title': { en: 'We Deliver', gu: 'અમે પહોંચાડીએ' },
  'how.step3.desc': { en: 'Equipment delivered to your farm. Free pickup when done.', gu: 'સાધન તમારા ખેતર પર પહોંચાડાય. પૂરું થયે મફત પિકઅપ.' },
  
  // About
  'about.title': { en: 'About AgriSaathi', gu: 'અગ્રીસાથી વિશે' },
  'about.mission': { en: 'Our Mission', gu: 'અમારું મિશન' },
  'about.missionText': { en: 'To empower Gujarat farmers with affordable access to modern farming equipment, helping them increase productivity and reduce labor costs.', gu: 'ગુજરાતના ખેડૂતોને આધુનિક ખેતી સાધનોની પહોંચ આપવી, તેમની ઉત્પાદકતા વધારવી અને મજૂરી ખર્ચ ઘટાડવો.' },
  
  // Contact
  'contact.title': { en: 'Contact Us', gu: 'સંપર્ક કરો' },
  'contact.whatsapp': { en: 'Chat on WhatsApp', gu: 'WhatsApp પર ચેટ કરો' },
  'contact.call': { en: 'Call Us', gu: 'કૉલ કરો' },
  
  // Calculator
  'calc.title': { en: 'Labor ROI Calculator', gu: 'મજૂર ROI કેલ્ક્યુલેટર' },
  'calc.subtitle': { en: 'See how much you can save with our implements', gu: 'અમારા સાધનોથી તમે કેટલું બચાવી શકો તે જુઓ' },
  'calc.landSize': { en: 'Land Size (Bigha)', gu: 'જમીનનું કદ (વીઘા)' },
  'calc.cropType': { en: 'Crop Type', gu: 'પાકનો પ્રકાર' },
  'calc.laborCost': { en: 'Labor Cost/Day (₹)', gu: 'મજૂરી/દિવસ (₹)' },
  'calc.calculate': { en: 'Calculate Savings', gu: 'બચત ગણો' },
  'calc.savings': { en: 'Estimated Savings', gu: 'અંદાજિત બચત' },
  'calc.timeSaved': { en: 'Time Saved', gu: 'બચેલો સમય' },
  'calc.days': { en: 'days', gu: 'દિવસ' },
  
  // Appointments
  'appt.title': { en: 'Book Your Appointment', gu: 'તમારી એપોઇન્ટમેન્ટ બુક કરો' },
  'appt.selectDate': { en: 'Select Date', gu: 'તારીખ પસંદ કરો' },
  'appt.selectImplement': { en: 'Select Implement', gu: 'સાધન પસંદ કરો' },
  'appt.duration': { en: 'Rental Duration (days)', gu: 'ભાડાનો સમયગાળો (દિવસ)' },
  'appt.total': { en: 'Total Amount', gu: 'કુલ રકમ' },
  'appt.payUpi': { en: 'Pay with UPI', gu: 'UPI થી ચૂકવો' },
  'appt.confirm': { en: 'Confirm Booking', gu: 'બુકિંગ કન્ફર્મ કરો' },
  
  // Common
  'common.learnMore': { en: 'Learn More', gu: 'વધુ જાણો' },
  'common.price': { en: 'Price', gu: 'કિંમત' },
  'common.brand': { en: 'Brand', gu: 'બ્રાન્ડ' },
  'common.suitableFor': { en: 'Suitable for', gu: 'યોગ્ય છે' },
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

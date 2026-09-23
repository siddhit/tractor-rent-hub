import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'gu';

interface Translations {
  [key: string]: { en: string; gu: string };
}

const translations: Translations = {
  'brand.name':    { en: 'Farmulya', gu: 'Farmulya' },
  'brand.tagline': { en: "Real value for your farm", gu: 'તમારા ખેતરનું સાચું મૂલ્ય' },

  'nav.home':         { en: 'Home',     gu: 'ઘરે' },
  'nav.implements':   { en: 'Machines', gu: 'મશીન' },
  'nav.appointments': { en: 'Book',     gu: 'બુક કરો' },
  'nav.about':        { en: 'About',    gu: 'અમારા વિશે' },
  'nav.faq':          { en: 'FAQ',      gu: 'પ્રશ્નો' },

  'cat.land-prep':   { en: 'Land Prep',   gu: 'જમીન તૈયારી' },
  'cat.planting':    { en: 'Planting',    gu: 'વાવણી' },
  'cat.crop-season': { en: 'Crop Season', gu: 'પાક-સિઝન' },
  'cat.harvest':     { en: 'Harvest',     gu: 'લણણી' },

  'crop.onion':     { en: 'Onion',     gu: 'ડુંગળી' },
  'crop.cotton':    { en: 'Cotton',    gu: 'કપાસ' },
  'crop.groundnut': { en: 'Groundnut', gu: 'મગફળી' },
  'crop.all':       { en: 'All crops', gu: 'બધા પાક' },


  'about.title':       { en: 'About Farmulya', gu: 'Farmulya વિશે' },
  'about.mission':     { en: 'Our Mission', gu: 'અમારું ધ્યેય' },
  'about.missionText': { en: 'We bring precision farm machinery — with a trained operator — to Saurashtra farmers. We own the machines, we train the operators, and we stand behind the work.', gu: 'સૌરાષ્ટ્ર ના ખેડૂત ભાઈઓ માટે ચોક્કસ ખેતી-મશીન — ઓપરેટર સહિત. અમારા મશીન, અમારા ઓપરેટર, અમારી જવાબદારી.' },

  'contact.title':    { en: 'Contact', gu: 'સંપર્ક' },
  'contact.whatsapp': { en: 'Chat on WhatsApp', gu: 'WhatsApp પર ચેટ' },
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

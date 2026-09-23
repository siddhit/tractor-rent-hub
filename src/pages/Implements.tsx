import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ImplementCard from "@/components/ImplementCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImplementsByCrop } from "@/data/implements";

type CropFilter = 'all' | 'onion' | 'cotton' | 'groundnut';

const Implements = () => {
  const { language, t } = useLanguage();
  const [activeCrop, setActiveCrop] = useState<CropFilter>('all');

  const filtered = getImplementsByCrop(activeCrop);
  const crops: CropFilter[] = ['all', 'onion', 'cotton', 'groundnut'];

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-10">
          <div className="container">
            <p className={`eyebrow-label mb-3 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu' ? 'અમારી ફ્લીટ' : 'Our fleet'}
            </p>
            <h1
              className={`text-black mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}
              style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: language === 'gu' ? 1.3 : 1.2 }}
            >
              {language === 'gu' ? 'ચાર મશીન. ત્રણ પાક. એક ટીમ.' : 'Four machines. Three crops. One team.'}
            </h1>
            <p className={`max-w-xl ${language === 'gu' ? 'font-gujarati' : ''}`} style={{ color: 'var(--text-2)' }}>
              {language === 'gu'
                ? 'દરેક કામ માટે ખાસ મશીન — ઓપરેટર સાથે.'
                : 'The right machine for each stage — operator always included.'}
            </p>

            <div className="flex flex-wrap gap-2 mt-6 mb-8">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setActiveCrop(crop)}
                  className={`press-98 h-11 px-4 rounded-lg font-semibold text-sm border-[1.5px] ${
                    activeCrop === crop
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-line'
                  } ${language === 'gu' ? 'font-gujarati' : ''}`}
                >
                  {t(`crop.${crop}`)}
                </button>
              ))}
            </div>

            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
              {filtered.map((implement) => (
                <ImplementCard key={implement.id} implement={implement} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Implements;

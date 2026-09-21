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
        {/* Page header */}
        <section className="bg-cream py-12 border-b-2 border-ink">
          <div className="container">
            <p className="eyebrow-label text-ink-soft mb-3">
              {language === 'gu' ? 'અમારી ફ્લીટ' : 'Our fleet'}
            </p>
            <h1 className={`text-4xl md:text-5xl font-display font-black text-ink mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu' ? 'ચાર મશીન. ત્રણ પાક. એક ટીમ.' : 'Four machines. Three crops. One team.'}
            </h1>
            <p className={`text-ink-soft max-w-xl ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'દરેક કામ માટે ખાસ મશીન — ઓપરેટર સાથે.'
                : 'The right machine for each stage — operator always included.'}
            </p>

            {/* Crop filter */}
            <div className="flex flex-wrap gap-2 mt-6">
              {crops.map((crop) => (
                <button
                  key={crop}
                  onClick={() => setActiveCrop(crop)}
                  className={`px-4 py-2 border-2 border-ink rounded font-semibold text-sm transition-colors shadow-chunky-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                    activeCrop === crop
                      ? 'bg-kesar text-ink'
                      : 'bg-cream-deep text-ink hover:bg-kesar/30'
                  } ${language === 'gu' ? 'font-gujarati' : ''}`}
                >
                  {t(`crop.${crop}`)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-10">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

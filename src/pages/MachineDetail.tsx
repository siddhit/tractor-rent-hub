import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImplementById } from "@/data/implements";
import { trackEvent } from "@/lib/analytics";

const CROP_LABELS: Record<string, { en: string; gu: string }> = {
  onion: { en: 'Onion', gu: 'ડુંગળી' },
  cotton: { en: 'Cotton', gu: 'કપાસ' },
  groundnut: { en: 'Groundnut', gu: 'મગફળી' },
};

const MachineDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const g = language === 'gu';
  const implement = id ? getImplementById(id) : undefined;

  useEffect(() => {
    if (implement) trackEvent('machine_view', { id: implement.id });
  }, [implement]);

  if (!implement) return <Navigate to="/implements" replace />;

  const priceUnitLabel = implement.priceBasis === 'hour'
    ? { en: 'per hour', gu: 'કલાક દીઠ' }
    : { en: 'per vigha', gu: 'પ્રતિ વીઘા' };

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-10">
          <div className="container max-w-[600px]">
            <Link to="/implements" className="inline-flex items-center h-11 font-semibold text-black mb-4">
              ← {g ? 'પાછા' : 'Back'}
            </Link>

            <div className="card overflow-hidden mb-4" style={{ aspectRatio: '4/3', position: 'relative' }}>
              <img src={implement.image} alt={implement.name[language]} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            <p className="text-[13px] font-bold text-orange-deep mb-1">
              {g ? {
                'land-prep': 'જમીન તૈયારી', planting: 'વાવણી', 'crop-season': 'પાક ની સિઝન', harvest: 'લણણી',
              }[implement.category] : {
                'land-prep': 'Land prep', planting: 'Planting', 'crop-season': 'Crop season', harvest: 'Harvest',
              }[implement.category]}
            </p>
            <h1
              className={`text-black mb-2 ${g ? 'font-gujarati' : ''}`}
              style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: g ? 1.3 : 1.2 }}
            >
              {implement.name[language]}
            </h1>
            <p className={`text-lg mb-4 ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--text-2)' }}>
              {implement.tagline[language]}
            </p>

            <div className="card flex items-center justify-between p-[18px] mb-4">
              <div className="flex items-baseline gap-2">
                <span className="font-extrabold text-black" style={{ fontSize: 36 }}>
                  ₹{implement.price.toLocaleString('en-IN')}
                </span>
                <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{priceUnitLabel[language]}</span>
              </div>
              <span className={`bg-green text-white text-sm font-semibold px-3 py-1.5 rounded-full ${g ? 'font-gujarati' : ''}`}>
                {g ? 'ઓપરેટર સાથે' : 'with operator'}
              </span>
            </div>

            <p className={`mb-6 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 17, lineHeight: 1.6 }}>
              {implement.description[language]}
            </p>

            <div className="mb-8">
              <div className="flex items-center justify-between py-3 border-b border-line-soft">
                <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{g ? 'પાક' : 'Crops'}</span>
                <b className={`text-black ${g ? 'font-gujarati' : ''}`}>
                  {implement.crops.map(c => CROP_LABELS[c][language]).join(', ')}
                </b>
              </div>
              {implement.specs.map((s, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-line-soft">
                  <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{s.label[language]}</span>
                  <b className="text-black">{typeof s.value === 'string' ? s.value : s.value[language]}</b>
                </div>
              ))}
            </div>

            <Link
              to={`/appointments?implement=${implement.id}`}
              className={`press-98 flex items-center justify-center h-[58px] w-full rounded-lg bg-black text-white font-bold text-lg ${g ? 'font-gujarati' : ''}`}
            >
              {g ? 'આ મશીન બુક કરો' : 'Book this machine'} →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton implementId={implement.id} />
    </div>
  );
};

export default MachineDetail;

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";

type Crop = 'onion' | 'cotton' | 'groundnut';

const CROPS: { id: Crop; gu: string; en: string }[] = [
  { id: 'onion',     gu: 'ડુંગળી',  en: 'Onion'     },
  { id: 'cotton',    gu: 'કપાસ',    en: 'Cotton'    },
  { id: 'groundnut', gu: 'મગફળી',  en: 'Groundnut' },
];

const PARAMS: Record<Crop, { service: number; labourCut: number; chemCut: number }> = {
  onion:     { service: 800, labourCut: 0.70, chemCut: 0.05 },
  cotton:    { service: 600, labourCut: 0.60, chemCut: 0.10 },
  groundnut: { service: 550, labourCut: 0.65, chemCut: 0.05 },
};

const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');

const StepDot = ({ n, active, done }: { n: number; active: boolean; done: boolean }) => (
  <div className={`w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center font-mono font-bold text-sm transition-colors ${
    done ? 'bg-kesar text-ink' : active ? 'bg-ink text-cream' : 'bg-cream text-ink-fade'
  }`}>
    {done ? '✓' : n}
  </div>
);

const ROICalculator = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState<Crop | null>(null);
  const [vigha, setVigha] = useState(5);
  const [labourPerVigha, setLabourPerVigha] = useState(600);
  const [chemPerVigha, setChemPerVigha] = useState(400);

  const goNext = () => setStep(s => s + 1);
  const goBack = () => setStep(s => s - 1);

  const result = crop ? (() => {
    const p = PARAMS[crop];
    const labourManual = labourPerVigha * vigha;
    const labourSaved = labourManual * p.labourCut;
    const chemSaved = chemPerVigha * vigha * p.chemCut;
    const serviceCost = p.service * vigha;
    const net = labourSaved + chemSaved - serviceCost;
    return { labourSaved, chemSaved, serviceCost, net };
  })() : null;

  const headingStyle = (gu: boolean) => ({
    fontFamily: gu ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
    fontWeight: 800,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container max-w-xl">
            <p className="eyebrow-label text-ink-soft mb-3">
              {language === 'gu' ? 'બચત ગણો' : 'Calculate savings'}
            </p>
            <h1
              className="text-ink mb-10"
              style={{
                ...headingStyle(language === 'gu'),
                fontSize: 'clamp(28px, 4vw, 40px)',
                lineHeight: language === 'gu' ? 1.3 : 1.15,
              }}
            >
              {language === 'gu' ? 'મશીન વાપરો — કેટલું બચે?' : 'How much do you save with machines?'}
            </h1>

            {/* Step dots */}
            <div className="flex items-center gap-2 mb-8">
              {[1, 2, 3, 4].map((n, i) => (
                <div key={n} className="flex items-center gap-2">
                  <StepDot n={n} active={step === n} done={step > n} />
                  {i < 3 && <div className={`h-0.5 w-8 ${step > n ? 'bg-kesar' : 'bg-ink/20'}`} />}
                </div>
              ))}
            </div>

            <div className="border-2 border-ink rounded-lg bg-cream shadow-chunky-sm p-6">

              {/* Step 1: Crop */}
              {step === 1 && (
                <div>
                  <p className={`font-bold text-ink text-lg mb-5 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu' ? 'ક્યો પાક?' : 'Which crop?'}
                  </p>
                  <div className="flex flex-col gap-3">
                    {CROPS.map(c => (
                      <button
                        key={c.id}
                        onClick={() => { setCrop(c.id); goNext(); }}
                        className={`w-full text-left p-4 border-2 rounded-lg font-semibold transition-colors ${
                          crop === c.id
                            ? 'border-ink bg-kesar text-ink'
                            : 'border-ink/30 bg-cream-deep text-ink hover:border-ink hover:bg-cream'
                        } ${language === 'gu' ? 'font-gujarati' : ''}`}
                      >
                        {language === 'gu' ? c.gu : c.en}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Vigha */}
              {step === 2 && (
                <div>
                  <p className={`font-bold text-ink text-lg mb-5 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu' ? 'કેટલા વીઘા?' : 'How many vigha?'}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => setVigha(v => Math.max(1, v - 1))}
                      className="w-12 h-12 border-2 border-ink rounded-lg font-bold text-2xl text-ink bg-cream-deep flex items-center justify-center"
                    >−</button>
                    <span className="text-5xl font-mono font-extrabold text-ink min-w-[4rem] text-center">
                      {vigha}
                    </span>
                    <button
                      onClick={() => setVigha(v => Math.min(200, v + 1))}
                      className="w-12 h-12 border-2 border-ink rounded-lg font-bold text-2xl text-ink bg-cream-deep flex items-center justify-center"
                    >+</button>
                  </div>
                  <p className="text-ink-soft text-sm mb-6 font-mono">
                    {vigha} {language === 'gu' ? 'વીઘા ≈' : 'vigha ≈'} {(vigha * 0.625).toFixed(1)} {language === 'gu' ? 'એકર' : 'acres'}
                  </p>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-ink bg-cream-deep">
                      {language === 'gu' ? 'પાછળ' : 'Back'}
                    </button>
                    <button onClick={goNext} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-cream bg-ink">
                      {language === 'gu' ? 'આગળ' : 'Next'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Labour cost */}
              {step === 3 && (
                <div>
                  <p className={`font-bold text-ink text-lg mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu' ? 'અત્યારે મજૂરી ખર્ચ — વીઘા દીઠ?' : 'Current labour cost per vigha?'}
                  </p>
                  <p className="text-ink-soft text-sm mb-5 font-mono">
                    {language === 'gu' ? '(ખેડ + વાવ + રખોપ + ઉતારો — બધું ભેગું)' : '(All labour: prep, sowing, care, harvest)'}
                  </p>
                  <div className="flex items-center gap-3 border-2 border-ink rounded-lg overflow-hidden mb-6">
                    <span className="px-4 py-3 bg-cream-deep font-mono font-bold text-ink border-r-2 border-ink">₹</span>
                    <input
                      type="number"
                      min={100}
                      max={5000}
                      value={labourPerVigha}
                      onChange={e => setLabourPerVigha(Number(e.target.value))}
                      className="flex-1 py-3 px-3 bg-cream text-ink font-mono font-bold text-xl outline-none"
                    />
                    <span className="px-3 text-ink-soft text-sm font-mono border-l-2 border-ink py-3 bg-cream-deep">
                      /{language === 'gu' ? 'વીઘા' : 'vigha'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-ink bg-cream-deep">
                      {language === 'gu' ? 'પાછળ' : 'Back'}
                    </button>
                    <button onClick={goNext} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-cream bg-ink">
                      {language === 'gu' ? 'આગળ' : 'Next'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Chemical cost */}
              {step === 4 && (
                <div>
                  <p className={`font-bold text-ink text-lg mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu' ? 'ખાતર / દવા ખર્ચ — વીઘા દીઠ?' : 'Chemical / input cost per vigha?'}
                  </p>
                  <p className="text-ink-soft text-sm mb-5 font-mono">
                    {language === 'gu' ? '(ખાતર + જંતુનાશક + અન્ય)' : '(Fertiliser + pesticide + other inputs)'}
                  </p>
                  <div className="flex items-center gap-3 border-2 border-ink rounded-lg overflow-hidden mb-6">
                    <span className="px-4 py-3 bg-cream-deep font-mono font-bold text-ink border-r-2 border-ink">₹</span>
                    <input
                      type="number"
                      min={0}
                      max={5000}
                      value={chemPerVigha}
                      onChange={e => setChemPerVigha(Number(e.target.value))}
                      className="flex-1 py-3 px-3 bg-cream text-ink font-mono font-bold text-xl outline-none"
                    />
                    <span className="px-3 text-ink-soft text-sm font-mono border-l-2 border-ink py-3 bg-cream-deep">
                      /{language === 'gu' ? 'વીઘા' : 'vigha'}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={goBack} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-ink bg-cream-deep">
                      {language === 'gu' ? 'પાછળ' : 'Back'}
                    </button>
                    <button onClick={goNext} className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-cream bg-ink">
                      {language === 'gu' ? 'ગણો' : 'Calculate'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Result */}
              {step === 5 && result && crop && (
                <div>
                  <p className={`font-bold text-ink text-lg mb-5 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu'
                      ? `${vigha} વીઘા ${CROPS.find(c => c.id === crop)?.gu} — અંદાજ`
                      : `${vigha} vigha of ${CROPS.find(c => c.id === crop)?.en} — estimate`}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-monsoon/10 rounded border border-monsoon/30">
                      <span className={`text-ink-soft text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}>
                        {language === 'gu' ? 'મજૂરી બચત' : 'Labour saved'}
                      </span>
                      <span className="font-mono font-bold text-ink">{fmt(result.labourSaved)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-monsoon/10 rounded border border-monsoon/30">
                      <span className={`text-ink-soft text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}>
                        {language === 'gu' ? 'ખાતર/દવા બચત' : 'Input cost saved'}
                      </span>
                      <span className="font-mono font-bold text-ink">{fmt(result.chemSaved)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-cream-deep rounded border border-ink/20">
                      <span className={`text-ink-soft text-sm ${language === 'gu' ? 'font-gujarati' : ''}`}>
                        {language === 'gu' ? 'સર્વિસ ખર્ચ' : 'Service cost'}
                      </span>
                      <span className="font-mono font-bold text-ink">−{fmt(result.serviceCost)}</span>
                    </div>
                    <div className={`flex justify-between items-center p-4 rounded-lg border-2 ${
                      result.net >= 0 ? 'bg-kesar/20 border-kesar-deep' : 'bg-cream-deep border-ink/30'
                    }`}>
                      <span className={`font-bold text-ink ${language === 'gu' ? 'font-gujarati' : ''}`}>
                        {language === 'gu' ? 'ચોખ્ખી બચત' : 'Net saving'}
                      </span>
                      <span className={`font-mono font-extrabold text-2xl ${result.net >= 0 ? 'text-kesar-deep' : 'text-ink'}`}>
                        {result.net >= 0 ? fmt(result.net) : `−${fmt(Math.abs(result.net))}`}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-soft font-mono mb-6">
                    {language === 'gu'
                      ? '* ઉપજ સુધારા ની ગેરંટી નથી — ફક્ત ખર્ચ-બચત.'
                      : '* Cost saving estimate only — no yield improvement guaranteed.'}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-ink bg-cream-deep"
                    >
                      {language === 'gu' ? 'ફરી ગણો' : 'Recalculate'}
                    </button>
                    <a
                      href={`/appointments`}
                      className="flex-1 border-2 border-ink rounded-lg py-3 font-bold text-cream bg-ink text-center"
                    >
                      {language === 'gu' ? 'બુક કરો' : 'Book now'}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ROICalculator;

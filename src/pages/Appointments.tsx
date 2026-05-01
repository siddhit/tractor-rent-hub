import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton, { buildWaLink } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";

const CROPS = [
  { id: 'onion',     gu: 'ડુંગળી',  en: 'Onion'     },
  { id: 'cotton',    gu: 'કપાસ',    en: 'Cotton'    },
  { id: 'groundnut', gu: 'મગફળી',  en: 'Groundnut' },
];

const TIMING = [
  { id: 'week1', gu: 'આ અઠવાડિયે', en: 'This week' },
  { id: 'week2', gu: 'આગળ અઠવાડિયે', en: 'Next week' },
  { id: 'twoweeks', gu: '2 અઠવાડિયામાં', en: 'In 2 weeks' },
  { id: 'month', gu: 'આ મહિનામાં', en: 'This month' },
  { id: 'later', gu: 'પછી', en: 'Later — just exploring' },
];

const availableImplements = implements_data.filter(i => i.available);

const Appointments = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('implement') ?? '';

  // WhatsApp path state
  const [waImplement, setWaImplement] = useState(preselectedId);
  const [waCrop, setWaCrop] = useState('');

  // Form path state
  const [formName, setFormName] = useState('');
  const [formVillage, setFormVillage] = useState('');
  const [formCrop, setFormCrop] = useState('');
  const [formImplement, setFormImplement] = useState(preselectedId);
  const [formTiming, setFormTiming] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const waImpl = availableImplements.find(i => i.id === waImplement);
  const waCropLabel = CROPS.find(c => c.id === waCrop);

  const buildWaMsg = () => {
    const impl = waImpl?.name[language] ?? waImplement;
    const crop = waCropLabel ? (language === 'gu' ? waCropLabel.gu : waCropLabel.en) : waCrop;
    return language === 'gu'
      ? `નમસ્તે ખેત-સાથી — મારે ${impl} ${crop} ના ખેત માટે બુક કરવું છે. ઉપલબ્ધતા જણાવો.`
      : `Hello Khet Saathi — I'd like to book ${impl} for ${crop}. Please confirm availability.`;
  };

  const buildFormWaMsg = () => {
    const impl = availableImplements.find(i => i.id === formImplement)?.name[language] ?? formImplement;
    const crop = CROPS.find(c => c.id === formCrop);
    const cropLabel = crop ? (language === 'gu' ? crop.gu : crop.en) : formCrop;
    const timing = TIMING.find(t => t.id === formTiming);
    const timingLabel = timing ? (language === 'gu' ? timing.gu : timing.en) : formTiming;
    return language === 'gu'
      ? `નમસ્તે ખેત-સાથી — ${formName}, ${formVillage} — ${impl} ${cropLabel} ના ખેત માટે ${timingLabel} — ઉપલબ્ધતા ચેક કરો.`
      : `Hello Khet Saathi — ${formName} from ${formVillage} — wants ${impl} for ${cropLabel}, timing: ${timingLabel}.`;
  };

  const canOpenWa = waImplement && waCrop;
  const canSubmitForm = formName.trim() && formVillage.trim() && formCrop && formImplement && formTiming;

  const handleFormSubmit = () => {
    if (!canSubmitForm) return;
    setFormSubmitted(true);
  };

  const headingStyle = (gu: boolean) => ({
    fontFamily: gu ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
    fontWeight: 800,
  });

  const selectClass = "w-full border-2 border-ink rounded-lg px-3 py-2.5 bg-cream text-ink font-semibold outline-none focus:ring-2 focus:ring-kesar";
  const inputClass = "w-full border-2 border-ink rounded-lg px-3 py-2.5 bg-cream text-ink font-semibold outline-none focus:ring-2 focus:ring-kesar placeholder:text-ink-fade placeholder:font-normal";
  const labelClass = `block text-sm font-bold text-ink mb-1.5 ${language === 'gu' ? 'font-gujarati' : ''}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <p className="eyebrow-label text-ink-soft mb-3">
              {language === 'gu' ? 'બુકિંગ' : 'Booking'}
            </p>
            <h1
              className="text-ink mb-3"
              style={{
                ...headingStyle(language === 'gu'),
                fontSize: 'clamp(28px, 4vw, 44px)',
                lineHeight: language === 'gu' ? 1.3 : 1.15,
              }}
            >
              {language === 'gu' ? 'ખેતીનું કામ બુક કરો' : 'Book farm work'}
            </h1>
            <p className={`text-ink-soft text-lg mb-10 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'WhatsApp — ઝડપ. ફોર્મ — જો ઈ-મેઈલ ની ટેવ હોય.'
                : 'WhatsApp is fastest. Form works too.'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

              {/* === WhatsApp Path === */}
              <div className="border-2 border-ink rounded-lg bg-cream shadow-chunky-sm overflow-hidden">
                <div className="bg-monsoon px-5 py-4 border-b-2 border-ink flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center font-black text-monsoon text-sm">
                    WA
                  </div>
                  <div>
                    <p className={`font-bold text-cream leading-none ${language === 'gu' ? 'font-gujarati' : ''}`}>
                      {language === 'gu' ? 'WhatsApp — 2 ક્લિક' : 'WhatsApp — 2 taps'}
                    </p>
                    <p className="text-cream/60 text-xs font-mono mt-0.5">
                      {language === 'gu' ? 'ઝડપી, સહેલી' : 'Fastest option'}
                    </p>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <label className={labelClass}>
                      {language === 'gu' ? 'મશીન' : 'Machine'}
                    </label>
                    <select
                      value={waImplement}
                      onChange={e => setWaImplement(e.target.value)}
                      className={selectClass}
                    >
                      <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                      {availableImplements.map(impl => (
                        <option key={impl.id} value={impl.id}>
                          {impl.name[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      {language === 'gu' ? 'પાક' : 'Crop'}
                    </label>
                    <select
                      value={waCrop}
                      onChange={e => setWaCrop(e.target.value)}
                      className={selectClass}
                    >
                      <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                      {CROPS.map(c => (
                        <option key={c.id} value={c.id}>
                          {language === 'gu' ? c.gu : c.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  <a
                    href={canOpenWa ? buildWaLink(buildWaMsg()) : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => { if (!canOpenWa) e.preventDefault(); }}
                    className={`flex items-center justify-center gap-3 w-full py-3.5 rounded-lg border-2 border-ink font-bold text-lg transition-opacity ${
                      canOpenWa
                        ? 'bg-monsoon text-cream cursor-pointer'
                        : 'bg-ink/20 text-ink-fade cursor-not-allowed'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-cream text-monsoon flex items-center justify-center text-xs font-black">✓</span>
                    <span className={language === 'gu' ? 'font-gujarati' : ''}>
                      {language === 'gu' ? 'WhatsApp ખોલો' : 'Open WhatsApp'}
                    </span>
                  </a>
                </div>
              </div>

              {/* === Form Path === */}
              <div className="border-2 border-ink rounded-lg bg-cream shadow-chunky-sm overflow-hidden">
                <div className="bg-cream-deep px-5 py-4 border-b-2 border-ink">
                  <p className={`font-bold text-ink leading-none ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu' ? 'ફોર્મ ભરો' : 'Fill a form'}
                  </p>
                  <p className="text-ink-soft text-xs font-mono mt-0.5">
                    {language === 'gu' ? 'અમે WhatsApp પર ફૉલો-અપ કરીશું' : 'We follow up on WhatsApp'}
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="p-8 text-center">
                    <div className="w-14 h-14 bg-kesar border-2 border-ink rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                    <p className={`font-bold text-ink text-lg mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                      {language === 'gu' ? 'મળ્યું!' : 'Got it!'}
                    </p>
                    <p className={`text-ink-soft text-sm mb-6 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                      {language === 'gu'
                        ? 'WhatsApp પર ટૂંક સમયમાં જવાબ.'
                        : "We'll reply on WhatsApp shortly."}
                    </p>
                    <a
                      href={buildWaLink(buildFormWaMsg())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-ink rounded-lg px-5 py-2.5 font-bold text-cream bg-monsoon"
                    >
                      <span className={language === 'gu' ? 'font-gujarati' : ''}>
                        {language === 'gu' ? 'WhatsApp ખોલો' : 'Open WhatsApp'}
                      </span>
                    </a>
                  </div>
                ) : (
                  <div className="p-5 space-y-4">
                    <div>
                      <label className={labelClass}>
                        {language === 'gu' ? 'નામ' : 'Your name'}
                      </label>
                      <input
                        type="text"
                        value={formName}
                        onChange={e => setFormName(e.target.value)}
                        placeholder={language === 'gu' ? 'ભગવાનભાઈ...' : 'Full name'}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        {language === 'gu' ? 'ગામ' : 'Village'}
                      </label>
                      <input
                        type="text"
                        value={formVillage}
                        onChange={e => setFormVillage(e.target.value)}
                        placeholder={language === 'gu' ? 'ગામ નું નામ...' : 'Village name'}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        {language === 'gu' ? 'પાક' : 'Crop'}
                      </label>
                      <select
                        value={formCrop}
                        onChange={e => setFormCrop(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                        {CROPS.map(c => (
                          <option key={c.id} value={c.id}>
                            {language === 'gu' ? c.gu : c.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        {language === 'gu' ? 'મશીન' : 'Machine'}
                      </label>
                      <select
                        value={formImplement}
                        onChange={e => setFormImplement(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                        {availableImplements.map(impl => (
                          <option key={impl.id} value={impl.id}>
                            {impl.name[language]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>
                        {language === 'gu' ? 'ક્યારે?' : 'Approximate timing'}
                      </label>
                      <select
                        value={formTiming}
                        onChange={e => setFormTiming(e.target.value)}
                        className={selectClass}
                      >
                        <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                        {TIMING.map(t => (
                          <option key={t.id} value={t.id}>
                            {language === 'gu' ? t.gu : t.en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleFormSubmit}
                      disabled={!canSubmitForm}
                      className={`w-full py-3.5 rounded-lg border-2 border-ink font-bold text-lg transition-opacity ${
                        canSubmitForm
                          ? 'bg-ink text-cream cursor-pointer'
                          : 'bg-ink/20 text-ink-fade cursor-not-allowed'
                      } ${language === 'gu' ? 'font-gujarati' : ''}`}
                    >
                      {language === 'gu' ? 'રિક્વેસ્ટ મોકલો' : 'Send request'}
                    </button>

                    <p className="text-xs text-ink-soft font-mono">
                      {language === 'gu'
                        ? '* ઉપજ સુધારા ની ગેરંટી નથી — ફક્ત ખર્ચ-બચત.'
                        : '* No yield guarantee — cost savings only.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Appointments;

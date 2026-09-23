import { useEffect, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildWaLink } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";
import { ARRIVAL_PCT } from "@/config";
import { trackEvent } from "@/lib/analytics";

const CROPS = [
  { id: 'onion', gu: 'ડુંગળી', en: 'Onion' },
  { id: 'cotton', gu: 'કપાસ', en: 'Cotton' },
  { id: 'groundnut', gu: 'મગફળી', en: 'Groundnut' },
] as const;

const today = () => new Date().toISOString().slice(0, 10);
const digitsOnly = (s: string) => s.replace(/[\s-]/g, '');
const isValidPhone = (s: string) => /^\d{10}$/.test(digitsOnly(s));
const fmtINR = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const formatDate = (iso: string) => {
  if (!iso) return iso;
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

interface BookingForm {
  phone: string;
  name: string;
  village: string;
  machine: string;
  crop: string;
  vigha: string;
  from: string;
  to: string;
}

const EMPTY_FORM: BookingForm = { phone: '', name: '', village: '', machine: '', crop: '', vigha: '', from: '', to: '' };
const STORAGE_KEY = 'farmulya-booking-form';

const STEPS = ['form', 'review', 'done'] as const;
type Step = typeof STEPS[number];

const Field = ({ label, hint, err, children }: { label: string; hint?: string; err?: string; children: ReactNode }) => (
  <label className="block">
    <span className="block text-[15px] font-bold text-black mb-1.5">{label}</span>
    {children}
    {err ? (
      <span className="block text-sm mt-1" style={{ color: 'var(--warn)' }}>{err}</span>
    ) : hint ? (
      <span className="block text-sm mt-1" style={{ color: 'var(--text-3)' }}>{hint}</span>
    ) : null}
  </label>
);

const inputClass = "focus-orange w-full h-[52px] rounded-md border-[1.5px] border-line-input px-3.5 text-[17px] font-semibold text-black bg-white placeholder:text-text-3 placeholder:font-normal";

const Appointments = () => {
  const { language } = useLanguage();
  const g = language === 'gu';
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('implement') ?? '';

  const [step, setStep] = useState<Step>('form');
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<BookingForm>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<BookingForm>;
        return { ...EMPTY_FORM, ...saved, machine: saved.machine || preselectedId };
      }
    } catch {
      // sessionStorage unavailable — start fresh
    }
    return { ...EMPTY_FORM, machine: preselectedId };
  });

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(form)); } catch { /* ignore */ }
  }, [form]);

  useEffect(() => {
    trackEvent('booking_step', { step: step === 'done' ? 'confirmed' : step });
  }, [step]);

  const set = (k: keyof BookingForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const machine = form.machine === 'unsure' ? undefined : implements_data.find(i => i.id === form.machine);
  const vighaNum = parseFloat(form.vigha);
  const hasVigha = Number.isFinite(vighaNum) && vighaNum > 0;

  const estimate = (() => {
    if (!machine || !hasVigha) return null;
    const hours = machine.priceBasis === 'hour' && machine.vighaPerHour > 0 ? vighaNum / machine.vighaPerHour : 0;
    const total = machine.priceBasis === 'hour' ? machine.price * hours : machine.price * vighaNum;
    const deposit = Math.round(total * ARRIVAL_PCT);
    return { total: Math.round(total), hours, deposit, balance: Math.round(total) - deposit };
  })();

  const phoneValid = isValidPhone(form.phone);
  const datesValid = Boolean(form.from) && Boolean(form.to) && form.from >= today() && form.to >= form.from;
  const machineValid = form.machine === 'unsure' ? true : Boolean(machine && estimate);
  const canProceed = Boolean(
    phoneValid && form.name.trim() && form.village.trim() && form.crop && hasVigha && datesValid && machineValid
  );

  const cropLabel = CROPS.find(c => c.id === form.crop);

  const buildMessage = () => {
    const machineName = form.machine === 'unsure'
      ? (g ? 'ખબર નથી — યોગ્ય મશીન સૂચવો' : 'Not sure — please suggest one')
      : (machine?.name[language] ?? form.machine);
    const cropText = cropLabel ? (g ? cropLabel.gu : cropLabel.en) : form.crop;
    const dateText = `${formatDate(form.from)} ${g ? 'થી' : 'to'} ${formatDate(form.to)}`;

    const lines = g ? [
      'Farmમૂલ્ય બુકિંગ [FB1]',
      `નામ: ${form.name}`,
      `ફોન: ${digitsOnly(form.phone)}`,
      `ગામ: ${form.village}`,
      `મશીન: ${machineName}`,
      `પાક: ${cropText}`,
      `વીઘા: ${form.vigha}`,
      `તારીખ: ${dateText}`,
      ...(estimate ? [`અંદાજ: ${fmtINR(estimate.total)}`] : []),
      'ચુકવણી: રોકડ',
    ] : [
      'Farmulya Booking [FB1]',
      `Name: ${form.name}`,
      `Phone: ${digitsOnly(form.phone)}`,
      `Village: ${form.village}`,
      `Machine: ${machineName}`,
      `Crop: ${cropText}`,
      `Vigha: ${form.vigha}`,
      `Date: ${dateText}`,
      ...(estimate ? [`Estimate: ${fmtINR(estimate.total)}`] : []),
      'Payment: cash',
    ];
    return lines.join('\n');
  };

  const handleNext = () => {
    setTried(true);
    if (!canProceed) return;
    setStep('review');
    window.scrollTo(0, 0);
  };

  const handleConfirm = () => {
    trackEvent('booking_confirm', { machine: form.machine, estimate: estimate?.total ?? null });
    setStep('done');
    window.scrollTo(0, 0);
  };

  const handleWaTap = () => {
    trackEvent('whatsapp_click', { machine: form.machine });
    trackEvent('booking_submit', { machine: form.machine });
    setSent(true);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const StepBar = () => {
    const idx = STEPS.indexOf(step);
    const labels = g ? ['વિગત', 'તપાસો', 'મોકલો'] : ['Details', 'Review', 'Send'];
    return (
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex-1 h-1.5 rounded-full" style={{ background: i <= idx ? 'var(--orange)' : 'var(--surface)' }} />
          ))}
        </div>
        <div className="flex justify-between text-[13px] font-semibold">
          {labels.map((l, i) => (
            <span key={i} className={g ? 'font-gujarati' : ''} style={{ color: i <= idx ? 'var(--black)' : 'var(--text-3)' }}>{l}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-10">
          <div className="container max-w-[600px]">
            <StepBar />

            {step === 'form' && (
              <>
                <p className={`eyebrow-label mb-2 ${g ? 'font-gujarati' : ''}`}>{g ? 'બુકિંગ' : 'Booking'}</p>
                <h1 className={`text-black mb-6 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: g ? 1.3 : 1.2 }}>
                  {g ? 'મશીન ક્યારે જોઈએ?' : 'When do you need the machine?'}
                </h1>

                <div className="card p-[18px] flex flex-col gap-4">
                  <Field
                    label={g ? 'ફોન નંબર' : 'Phone number'}
                    err={tried && !phoneValid ? (g ? '10 અંક નો સાચો નંબર લખો' : 'Enter a valid 10-digit number') : undefined}
                  >
                    <input
                      className={inputClass}
                      type="tel"
                      inputMode="numeric"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder={g ? '10 અંક નો નંબર' : '10-digit number'}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label={g ? 'નામ' : 'Name'}>
                      <input className={inputClass} value={form.name} onChange={e => set('name', e.target.value)} placeholder={g ? 'હરિભાઈ' : 'Haribhai'} />
                    </Field>
                    <Field label={g ? 'ગામ' : 'Village'}>
                      <input className={inputClass} value={form.village} onChange={e => set('village', e.target.value)} placeholder={g ? 'તમારું ગામ' : 'Your village'} />
                    </Field>
                  </div>

                  <Field label={g ? 'મશીન' : 'Machine'}>
                    <div className="grid grid-cols-2 gap-2">
                      {implements_data.map(x => {
                        const unit = x.priceBasis === 'hour' ? (g ? 'કલાક દીઠ' : '/hr') : (g ? 'પ્રતિ વીઘા' : '/vigha');
                        const selected = form.machine === x.id;
                        return (
                          <button
                            type="button"
                            key={x.id}
                            onClick={() => set('machine', x.id)}
                            className={`flex items-center gap-2 p-2 rounded-lg text-left ${selected ? 'border-2 border-black' : 'border-[1.5px] border-line-input'}`}
                            style={{ background: selected ? 'var(--orange-tint)' : 'var(--white)', minHeight: 64 }}
                          >
                            <img src={x.image} alt="" className="w-[60px] h-12 object-cover rounded-md flex-shrink-0" />
                            <span className="flex flex-col min-w-0">
                              <b className={`text-sm leading-tight truncate ${g ? 'font-gujarati' : ''}`}>{x.name[language]}</b>
                              <small className="text-text-3 text-xs">{fmtINR(x.price)} {unit}</small>
                            </span>
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => set('machine', 'unsure')}
                        className={`col-span-2 flex items-center justify-center text-center p-2 rounded-lg ${form.machine === 'unsure' ? 'border-2 border-black' : 'border-[1.5px] border-line-input'} ${g ? 'font-gujarati' : ''}`}
                        style={{ background: form.machine === 'unsure' ? 'var(--orange-tint)' : 'var(--white)', minHeight: 64 }}
                      >
                        <b className="text-sm">{g ? 'ખબર નથી — Farmulya સૂચવશે' : 'Not sure — Farmulya will suggest'}</b>
                      </button>
                    </div>
                  </Field>

                  <Field label={g ? 'પાક' : 'Crop'}>
                    <div className="grid grid-cols-3 gap-2">
                      {CROPS.map(c => (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => set('crop', c.id)}
                          className={`h-[52px] rounded-md font-bold ${form.crop === c.id ? 'bg-black text-white' : 'bg-white border-[1.5px] border-line-input text-black'} ${g ? 'font-gujarati' : ''}`}
                        >
                          {g ? c.gu : c.en}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label={g ? 'વીઘા' : 'Vigha'}>
                    <input
                      className={inputClass}
                      type="number"
                      inputMode="decimal"
                      step="0.1"
                      min="0"
                      value={form.vigha}
                      onChange={e => set('vigha', e.target.value)}
                      placeholder={g ? 'દા.ત. 5' : 'e.g. 5'}
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label={g ? 'તારીખ થી' : 'Date from'}>
                      <input className={inputClass} type="date" min={today()} value={form.from} onChange={e => set('from', e.target.value)} />
                    </Field>
                    <Field
                      label={g ? 'તારીખ સુધી' : 'Date to'}
                      err={tried && form.from && form.to && form.to < form.from ? (g ? 'પછી ની તારીખ લખો' : 'Pick a later date') : undefined}
                    >
                      <input className={inputClass} type="date" min={form.from || today()} value={form.to} onChange={e => set('to', e.target.value)} />
                    </Field>
                  </div>
                </div>

                {estimate && machine && (
                  <div className="rounded-lg p-4 mt-5" style={{ background: 'var(--orange-tint)' }}>
                    <span className="block text-[13px] font-bold text-black mb-1">{g ? 'અંદાજિત ખર્ચ' : 'Estimated cost'}</span>
                    <b className="block text-black" style={{ fontSize: 34 }}>{fmtINR(estimate.total)}</b>
                    <span className="block text-sm mt-1" style={{ color: 'var(--text-2)' }}>
                      {machine.priceBasis === 'vigha'
                        ? `${machine.name[language]} × ${form.vigha} ${g ? 'વીઘા' : 'vigha'}`
                        : `${machine.name[language]} · ${form.vigha} ${g ? 'વીઘા ≈' : 'vigha ≈'} ${estimate.hours.toFixed(1)} ${g ? 'કલાક' : 'hr'} × ${fmtINR(machine.price)}`}
                    </span>
                    {machine.priceBasis === 'hour' && (
                      <span className="block text-xs mt-1" style={{ color: 'var(--text-3)' }}>
                        {g ? '* અંતિમ બિલ ખરેખર કામ કરેલા કલાક પ્રમાણે થશે.' : '* The final bill is by actual hours worked.'}
                      </span>
                    )}
                    <div className="flex flex-wrap justify-between gap-3 mt-3 pt-3" style={{ borderTop: '2px dashed var(--line)' }}>
                      <div>
                        <span className="block text-xs" style={{ color: 'var(--text-3)' }}>{g ? 'આવે ત્યારે (આશરે 50%)' : 'On arrival (about 50%)'}</span>
                        <b className="text-black" style={{ fontSize: 22 }}>{fmtINR(estimate.deposit)}</b>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs" style={{ color: 'var(--text-3)' }}>{g ? 'બાકી કામ પછી' : 'Balance after work'}</span>
                        <b className="text-black" style={{ fontSize: 22 }}>{fmtINR(estimate.balance)}</b>
                      </div>
                    </div>
                  </div>
                )}

                {form.machine === 'unsure' && (
                  <div className="rounded-lg p-4 mt-5 border-[1.5px] border-line-input">
                    <p className={g ? 'font-gujarati' : ''} style={{ color: 'var(--text-2)' }}>
                      {g
                        ? 'પાક, વીઘા અને તારીખ મોકલો — અમે યોગ્ય મશીન અને ભાવ જણાવીશું.'
                        : "Send your crop, vigha and dates — we'll suggest the right machine and price."}
                    </p>
                  </div>
                )}

                {tried && !canProceed && (
                  <p className={`mt-4 font-semibold ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--warn)' }}>
                    {g ? 'બધી વિગત ભરો.' : 'Please fill in every field.'}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className={`press-98 flex items-center justify-center h-[58px] w-full rounded-lg font-bold text-lg mt-5 ${canProceed ? 'bg-black text-white' : 'bg-black/45 text-white'} ${g ? 'font-gujarati' : ''}`}
                >
                  {g ? 'આગળ: તપાસો' : 'Next: review'} →
                </button>
              </>
            )}

            {step === 'review' && (
              <>
                <button type="button" onClick={() => setStep('form')} className="inline-flex items-center h-11 font-semibold text-black mb-2">
                  ← {g ? 'વિગત બદલો' : 'Edit details'}
                </button>
                <h1 className={`text-black mb-6 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: g ? 1.3 : 1.2 }}>
                  {g ? 'વિગત તપાસો અને બુક કરો' : 'Check your booking'}
                </h1>

                <div className="card p-[18px] mb-5">
                  <div className="flex items-center gap-3 pb-3 mb-3 border-b border-line-soft">
                    {machine && <img src={machine.image} alt="" className="w-[72px] h-14 object-cover rounded-md flex-shrink-0" />}
                    <div>
                      <b className={`text-black block ${g ? 'font-gujarati' : ''}`}>
                        {form.machine === 'unsure' ? (g ? 'Farmulya સૂચવશે' : 'Farmulya will suggest') : machine?.name[language]}
                      </b>
                      <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>
                        {cropLabel ? (g ? cropLabel.gu : cropLabel.en) : form.crop} · {form.vigha} {g ? 'વીઘા' : 'vigha'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{g ? 'તારીખ' : 'Dates'}</span>
                    <b className="text-black">{formatDate(form.from)} – {formatDate(form.to)}</b>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{g ? 'ગામ' : 'Village'}</span>
                    <b className="text-black">{form.village}</b>
                  </div>
                  {estimate && (
                    <>
                      <div className="flex items-center justify-between py-2">
                        <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{g ? 'અંદાજ' : 'Estimate'}</span>
                        <b className="text-black">{fmtINR(estimate.total)}</b>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className={`text-sm text-text-3 ${g ? 'font-gujarati' : ''}`}>{g ? 'બાકી કામ પછી' : 'Balance after work'}</span>
                        <b className="text-black">{fmtINR(estimate.balance)}</b>
                      </div>
                    </>
                  )}
                </div>

                <div className="rounded-xl p-5 bg-green text-white">
                  <span className="block text-sm font-bold mb-2" style={{ color: 'var(--orange-glow)' }}>
                    {g ? 'રોકડ ચુકવણી · માહિતી માટે' : 'Cash payment · for your information'}
                  </span>
                  {estimate ? (
                    <>
                      <b className="block" style={{ fontSize: 52 }}>{fmtINR(estimate.deposit)}</b>
                      <span className={`block text-sm mt-2 ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--green-tint)' }}>
                        {g
                          ? `ઓપરેટર આવે ત્યારે આશરે અડધા, કુલ અંદાજ ${fmtINR(estimate.total)}`
                          : `About half when the operator arrives, of a ${fmtINR(estimate.total)} estimate`}
                      </span>
                    </>
                  ) : (
                    <b className={`block ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 28 }}>
                      {g ? 'ભાવ મશીન નક્કી થયા પછી' : 'Price once the machine is decided'}
                    </b>
                  )}
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className={`press-98 flex items-center justify-center h-[58px] w-full rounded-lg font-bold text-lg mt-4 ${g ? 'font-gujarati' : ''}`}
                    style={{ background: 'var(--orange)', color: 'var(--black)' }}
                  >
                    {g ? 'બુકિંગ પાકું કરો' : 'Confirm booking'} →
                  </button>
                </div>
              </>
            )}

            {step === 'done' && (
              <>
                <div className="card p-8 text-center mb-5">
                  <span
                    className="inline-flex items-center justify-center rounded-full mb-4"
                    style={{
                      width: 64, height: 64, fontSize: 28,
                      background: sent ? 'var(--green)' : 'var(--surface)',
                      color: sent ? 'var(--white)' : 'var(--text-3)',
                      border: sent ? undefined : '1.5px solid var(--line-input)',
                    }}
                  >
                    ✓
                  </span>
                  <h1 className={`text-black mb-3 ${g ? 'font-gujarati' : ''}`} style={{ fontSize: 'clamp(30px, 7vw, 44px)', lineHeight: g ? 1.3 : 1.2 }}>
                    {g ? 'એક છેલ્લું પગલું: WhatsApp પર મોકલો' : 'Last step: send on WhatsApp'}
                  </h1>
                  <p className={`mb-6 ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--text-2)' }}>
                    {g
                      ? 'WhatsApp પર બુકિંગ મોકલો, આજે જ તારીખ કન્ફર્મ કરીશું. ચુકવણી રોકડ માં, સીધી અમારી ટીમ સાથે.'
                      : "Send the booking on WhatsApp and we'll confirm the date today. Payment is in cash, directly to our team."}
                  </p>
                  <a
                    href={buildWaLink(buildMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWaTap}
                    className={`press-98 flex items-center justify-center gap-2 h-[58px] w-full rounded-lg bg-green text-white font-bold text-lg ${g ? 'font-gujarati' : ''}`}
                  >
                    {g ? 'WhatsApp પર બુકિંગ મોકલો' : 'Send booking on WhatsApp'}
                  </a>
                  {sent && (
                    <p className="text-sm font-semibold mt-3" style={{ color: 'var(--green)' }}>
                      {g ? '✓ મોકલાયું — WhatsApp માં જુઓ.' : '✓ Sent — check WhatsApp.'}
                    </p>
                  )}
                </div>
                <Link
                  to="/"
                  className={`press-98 flex items-center justify-center h-[52px] w-full rounded-lg bg-surface border-[1.5px] border-line text-black font-bold ${g ? 'font-gujarati' : ''}`}
                >
                  {g ? 'ઘરે પાછા' : 'Back home'}
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Appointments;

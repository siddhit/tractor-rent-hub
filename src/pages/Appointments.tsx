import { useState, type MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton, { buildWaLink } from "@/components/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { implements_data } from "@/data/implements";
import { UPI_ID } from "@/config";
import { trackEvent } from "@/lib/analytics";

const CROPS = [
  { id: 'onion',     gu: 'ડુંગળી',  en: 'Onion'     },
  { id: 'cotton',    gu: 'કપાસ',    en: 'Cotton'    },
  { id: 'groundnut', gu: 'મગફળી',  en: 'Groundnut' },
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

const Appointments = () => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('implement') ?? '';

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [machineId, setMachineId] = useState(preselectedId);
  const [crop, setCrop] = useState('');
  const [vigha, setVigha] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [copied, setCopied] = useState(false);

  const machine = implements_data.find(i => i.id === machineId);
  const vighaNum = parseFloat(vigha);
  const hasVigha = Number.isFinite(vighaNum) && vighaNum > 0;

  const estimate = (() => {
    if (!machine || !hasVigha) return null;
    if (machine.priceBasis === 'vigha') {
      const total = machine.price * vighaNum;
      return { total, deposit: total * 0.5, hours: 0, days: 0 };
    }
    const hours = machine.vighaPerHour > 0 ? vighaNum / machine.vighaPerHour : 0;
    const days = Math.max(1, Math.ceil(hours / 8));
    const total = machine.price * hours;
    return { total, deposit: 1500 * days, hours, days };
  })();

  const phoneValid = isValidPhone(phone);
  const datesValid = Boolean(dateFrom) && Boolean(dateTo) && dateFrom >= today() && dateTo >= dateFrom;
  const canSubmit = Boolean(
    phoneValid && name.trim() && village.trim() && machine && crop && hasVigha && datesValid
  );

  const cropLabel = CROPS.find(c => c.id === crop);

  const buildMessage = () => {
    const machineName = machine?.name[language] ?? machineId;
    const cropText = cropLabel ? (language === 'gu' ? cropLabel.gu : cropLabel.en) : crop;
    const dateText = `${formatDate(dateFrom)} ${language === 'gu' ? 'થી' : 'to'} ${formatDate(dateTo)}`;
    const totalText = estimate ? fmtINR(estimate.total) : '';
    const depositText = estimate ? fmtINR(estimate.deposit) : '';

    if (language === 'gu') {
      return [
        'ખેત-સાથી બુકિંગ',
        `નામ: ${name}`,
        `ફોન: ${digitsOnly(phone)}`,
        `ગામ: ${village}`,
        `મશીન: ${machineName}`,
        `પાક: ${cropText}`,
        `વીઘા: ${vigha}`,
        `તારીખ: ${dateText}`,
        `અંદાજ: ${totalText}`,
        `એડવાન્સ: ${depositText}`,
      ].join('\n');
    }
    return [
      'Khet Saathi Booking',
      `Name: ${name}`,
      `Phone: ${digitsOnly(phone)}`,
      `Village: ${village}`,
      `Machine: ${machineName}`,
      `Crop: ${cropText}`,
      `Vigha: ${vigha}`,
      `Date: ${dateText}`,
      `Estimate: ${totalText}`,
      `Advance: ${depositText}`,
    ].join('\n');
  };

  const handleSubmitClick = (e: MouseEvent) => {
    if (!canSubmit) {
      e.preventDefault();
      return;
    }
    trackEvent('whatsapp_click', { machine: machineId });
    trackEvent('booking_submit', { machine: machineId, crop, vigha: vighaNum });
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — nothing to fall back to on a placeholder VPA.
    }
  };

  const headingStyle = (gu: boolean) => ({
    fontFamily: gu ? "'Tiro Devanagari Hindi', 'Hind Vadodara', serif" : "'Playfair Display', serif",
    fontWeight: 800,
  });

  const selectClass = "w-full border-2 border-ink rounded-lg px-3 py-2.5 bg-cream text-ink font-semibold outline-none focus:ring-2 focus:ring-kesar";
  const inputClass = "w-full border-2 border-ink rounded-lg px-3 py-2.5 bg-cream text-ink font-semibold outline-none focus:ring-2 focus:ring-kesar placeholder:text-ink-fade placeholder:font-normal";
  const labelClass = `block text-sm font-bold text-ink mb-1.5 ${language === 'gu' ? 'font-gujarati' : ''}`;

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <main className="pt-16">
        <section className="py-12 md:py-16">
          <div className="container max-w-2xl">
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
              {language === 'gu' ? 'મશીન ક્યારે જોઈએ?' : 'When do you need the machine?'}
            </h1>
            <p className={`text-ink-soft text-lg mb-10 ${language === 'gu' ? 'font-gujarati' : ''}`}>
              {language === 'gu'
                ? 'ફોર્મ ભરો — WhatsApp પર બુકિંગ મોકલાવીએ.'
                : "Fill the form — we'll send the booking over WhatsApp."}
            </p>

            {/* === Booking form === */}
            <div className="border-2 border-ink rounded-lg bg-cream shadow-chunky-sm p-5 md:p-6 space-y-4">
              <div>
                <label className={labelClass}>{language === 'gu' ? 'ફોન નંબર' : 'Phone number'}</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder={language === 'gu' ? '10 અંક નો નંબર' : '10-digit number'}
                  className={inputClass}
                />
                {phone && !phoneValid && (
                  <p className="text-xs text-warn mt-1 font-mono">
                    {language === 'gu' ? '10 અંક નો સાચો નંબર લખો' : 'Enter a valid 10-digit number'}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{language === 'gu' ? 'નામ' : 'Name'}</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={language === 'gu' ? 'હરિભાઈ' : 'Haribhai'}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{language === 'gu' ? 'ગામ' : 'Village'}</label>
                <input
                  type="text"
                  value={village}
                  onChange={e => setVillage(e.target.value)}
                  placeholder={language === 'gu' ? 'મોટા અસરાણા' : 'Mota Asrana'}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>{language === 'gu' ? 'મશીન' : 'Machine'}</label>
                <select value={machineId} onChange={e => setMachineId(e.target.value)} className={selectClass}>
                  <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                  {implements_data.map(impl => (
                    <option key={impl.id} value={impl.id}>{impl.name[language]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>{language === 'gu' ? 'પાક' : 'Crop'}</label>
                <select value={crop} onChange={e => setCrop(e.target.value)} className={selectClass}>
                  <option value="">{language === 'gu' ? 'પસંદ કરો…' : 'Select…'}</option>
                  {CROPS.map(c => (
                    <option key={c.id} value={c.id}>{language === 'gu' ? c.gu : c.en}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>{language === 'gu' ? 'વીઘા' : 'Vigha'}</label>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  min="0"
                  value={vigha}
                  onChange={e => setVigha(e.target.value)}
                  placeholder={language === 'gu' ? 'દા.ત. 5' : 'e.g. 5'}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>{language === 'gu' ? 'તારીખ થી' : 'Date from'}</label>
                  <input
                    type="date"
                    min={today()}
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{language === 'gu' ? 'તારીખ સુધી' : 'Date to'}</label>
                  <input
                    type="date"
                    min={dateFrom || today()}
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* === Estimate block === */}
            {estimate && machine && (
              <div className="mt-5 border-2 border-ink rounded-lg bg-kesar p-4">
                <p className="font-mono text-xs uppercase tracking-wider text-ink-soft mb-1">
                  {language === 'gu' ? 'અંદાજિત ખર્ચ' : 'Estimated cost'}
                  {machine.priceBasis === 'hour' && (
                    <span> {language === 'gu' ? '(અંદાજ)' : '(estimate)'}</span>
                  )}
                </p>
                <p className="text-3xl font-extrabold text-ink">{fmtINR(estimate.total)}</p>
                <p className="text-sm text-ink-soft mt-1 font-mono">
                  {machine.priceBasis === 'vigha'
                    ? `${machine.name[language]} × ${vigha} ${language === 'gu' ? 'વીઘા' : 'vigha'}`
                    : `${machine.name[language]} · ${vigha} ${language === 'gu' ? 'વીઘા ≈' : 'vigha ≈'} ${estimate.hours.toFixed(1)} ${language === 'gu' ? 'કલાક' : 'hr'} × ${fmtINR(machine.price)}`}
                </p>
                {machine.priceBasis === 'hour' && (
                  <p className="text-xs text-ink-soft mt-1">
                    {language === 'gu'
                      ? '* અંતિમ બિલ ખરેખર કામ કરેલા કલાક પ્રમાણે થશે.'
                      : '* The final bill is by actual hours worked.'}
                  </p>
                )}

                <div className="mt-3 pt-3 flex flex-wrap justify-between gap-3" style={{ borderTop: '2px dashed var(--ink)' }}>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                      {machine.priceBasis === 'vigha'
                        ? (language === 'gu' ? 'હવે એડવાન્સ (50%)' : 'Deposit now (50%)')
                        : (language === 'gu' ? `હવે એડવાન્સ (${estimate.days} દિવસ)` : `Deposit now (${estimate.days} day${estimate.days > 1 ? 's' : ''})`)}
                    </p>
                    <p className="text-xl font-extrabold text-ink">{fmtINR(estimate.deposit)}</p>
                  </div>
                  {machine.priceBasis === 'vigha' && (
                    <div className="text-right">
                      <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
                        {language === 'gu' ? 'બાકી કામ પછી' : 'Balance after work'}
                      </p>
                      <p className="text-xl font-extrabold text-ink">{fmtINR(estimate.total - estimate.deposit)}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* === Submit === */}
            <a
              href={canSubmit ? buildWaLink(buildMessage()) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleSubmitClick}
              className={`mt-5 flex items-center justify-center gap-3 w-full py-3.5 rounded-lg border-2 border-ink font-bold text-lg transition-opacity ${
                canSubmit
                  ? 'bg-monsoon text-cream cursor-pointer'
                  : 'bg-ink/20 text-ink-fade cursor-not-allowed'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-cream text-monsoon flex items-center justify-center text-xs font-black">✓</span>
              <span className={language === 'gu' ? 'font-gujarati' : ''}>
                {language === 'gu' ? 'WhatsApp પર બુકિંગ મોકલો' : 'Send booking via WhatsApp'}
              </span>
            </a>

            {/* === Deposit / payment panel === */}
            <div className="mt-8 border-2 border-ink rounded-lg bg-monsoon text-cream shadow-chunky-sm p-5 md:p-6">
              <p className="eyebrow-label mb-2" style={{ color: 'var(--kesar-glow)' }}>
                {language === 'gu' ? '◆ એડવાન્સ ભરો ◆' : '◆ Pay the deposit ◆'}
              </p>
              <h2 className={`text-xl font-bold text-cream mb-4 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                {language === 'gu' ? 'UPI થી ભરો' : 'Pay by UPI'}
              </h2>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div
                  className="shrink-0 w-28 h-28 border-2 border-cream rounded flex items-center justify-center text-center px-2"
                  style={{ background: 'repeating-linear-gradient(135deg, rgba(251,244,230,0.12) 0 8px, rgba(251,244,230,0.03) 8px 16px)' }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wide text-cream-sunk leading-snug">
                    {/* TODO: real UPI QR once Makim's VPA is confirmed */}
                    {language === 'gu' ? 'QR — UPI ID કન્ફર્મ થાય પછી' : 'QR — pending UPI ID'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-cream-sunk mb-1">
                    {language === 'gu' ? 'UPI ID' : 'UPI ID'}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="bg-cream text-ink px-3 py-1.5 rounded border-2 border-ink font-mono text-sm">
                      {UPI_ID}
                    </code>
                    <button
                      type="button"
                      onClick={copyUpi}
                      className="border-2 border-cream text-cream font-bold text-sm px-3 py-1.5 rounded"
                    >
                      {copied
                        ? (language === 'gu' ? 'કોપી થયું!' : 'Copied!')
                        : (language === 'gu' ? 'કોપી કરો' : 'Copy')}
                    </button>
                  </div>
                  <p className={`text-sm text-cream-sunk mt-3 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {language === 'gu'
                      ? 'એડવાન્સ ભર્યા પછી, પેમેન્ટ નો સ્ક્રીનશોટ WhatsApp પર મોકલો.'
                      : 'After paying the deposit, send the payment screenshot on WhatsApp.'}
                  </p>
                </div>
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

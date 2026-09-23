import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    title: { gu: 'બુક કરો', en: 'Book' },
    body: {
      gu: 'મશીન, પાક, વીઘા અને તારીખ. ભાવ તરત દેખાય.',
      en: 'Machine, crop, vigha and dates. You see the price right away.',
    },
  },
  {
    title: { gu: 'આવે ત્યારે 50%', en: '50% on arrival' },
    body: {
      gu: 'સામાન્ય રીતે ઓપરેટર ખેતરે આવે ત્યારે અડધી રકમ રોકડ માં.',
      en: 'Usually half in cash when the operator reaches your field.',
    },
  },
  {
    title: { gu: 'બાકી કામ પછી', en: 'Balance after' },
    body: {
      gu: 'ઓપરેટર કામ પૂરું કરે પછી બાકી રકમ રોકડ માં.',
      en: 'Pay the rest in cash once the operator finishes.',
    },
  },
];

const PaymentSteps = () => {
  const { language } = useLanguage();
  const g = language === 'gu';

  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-8">
          <p className={`eyebrow-label mb-2 ${g ? 'font-gujarati' : ''}`}>
            {g ? 'ચુકવણી' : 'Payment'}
          </p>
          <h2
            className={g ? 'font-gujarati' : ''}
            style={{ fontSize: 'clamp(30px, 7vw, 48px)', lineHeight: g ? 1.3 : 1.2 }}
          >
            {g ? 'રોકડ માં, અડધા આવે ત્યારે અને અડધા કામ પછી' : 'Cash, half on arrival and half after the work'}
          </h2>
        </div>

        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <li key={i} className="card p-[18px]">
              <span className="font-mono font-bold text-orange-deep block mb-2">{i + 1}</span>
              <b className={`block text-xl mb-1 text-black ${g ? 'font-gujarati' : ''}`}>{g ? s.title.gu : s.title.en}</b>
              <p className={`text-[15px] ${g ? 'font-gujarati' : ''}`} style={{ color: 'var(--text-2)' }}>{g ? s.body.gu : s.body.en}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PaymentSteps;

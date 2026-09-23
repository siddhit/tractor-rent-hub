import { useLanguage } from "@/contexts/LanguageContext";

const HomePromise = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-black text-white py-14 md:py-16">
      <div className="container max-w-[760px]">
        <h2
          className={language === 'gu' ? 'font-gujarati' : ''}
          style={{ fontSize: 'clamp(30px, 7vw, 48px)', lineHeight: language === 'gu' ? 1.3 : 1.2 }}
        >
          {language === 'gu' ? (
            <>
              મશીન એકલું <span style={{ color: 'var(--orange-glow)' }}>ભાડે નહીં.</span>
              <br />ઓપરેટર સાથે જ આવે.
            </>
          ) : (
            <>
              We don't rent <span style={{ color: 'var(--orange-glow)' }}>machines alone.</span>
              <br />Operator always comes with it.
            </>
          )}
        </h2>
        <p className={`text-[18px] leading-relaxed mt-4 ${language === 'gu' ? 'font-gujarati' : ''}`} style={{ color: '#CFCFCF' }}>
          {language === 'gu'
            ? 'તમારા પાડોશી જેવો — જે મશીનનો ટ્રેઇનિંગ છે, જે ખેતર સમજે છે. ફક્ત મજૂરી નહીં — કુશળતા.'
            : 'Like a neighbour who happens to be trained on the machine and understands the field. Not just labour — craft.'}
        </p>
      </div>
    </section>
  );
};

export default HomePromise;

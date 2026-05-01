import { useLanguage } from "@/contexts/LanguageContext";

const rows = [
  {
    label: { en: 'Onion harvest · 1 vigha', gu: 'ડુંગળી કાઢવી · 1 વીઘા' },
    old: { desc: { en: '5 labourers × 2 days', gu: '5 મજૂર × 2 દિ\'' }, cost: 5760 },
    neu: { desc: { en: 'Shaktiman-Grimme harvester + operator', gu: 'Shaktiman-Grimme + ઓપરેટર' }, cost: 3500 },
  },
  {
    label: { en: 'Onion sowing · 1 vigha', gu: 'ડુંગળી વાવણી · 1 વીઘા' },
    old: { desc: { en: 'Hand sowing, uneven germination', gu: 'હાથ-વાવણી, અસમાન ઉગાવો' }, cost: 2880 },
    neu: { desc: { en: 'Gaspardo OLIMPIA seeder, ±2 mm', gu: 'Gaspardo OLIMPIA, ±2 mm' }, cost: 2500 },
  },
  {
    label: { en: 'Spraying · 6 rounds · 1 vigha', gu: 'છંટકાવ · 6 રાઉન્ડ · 1 વીઘા' },
    old: { desc: { en: 'Backpack pump + more chemical', gu: 'હાથ-પમ્પ + વધારે દવા' }, cost: 2160 },
    neu: { desc: { en: 'Boom sprayer, ~30% less chemical', gu: 'Boom sprayer, 30% ઓછી દવા' }, cost: 1200 },
  },
];

const BeforeAfter = () => {
  const { language } = useLanguage();

  return (
    <section className="bg-kesar relative">
      {/* Top strip */}
      <div className="patola-strip" />

      <div className="container py-14">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="eyebrow-label text-ink-soft justify-center mb-3">
            {language === 'gu' ? '◆ સીધી ગણતરી ◆' : '◆ Plain math ◆'}
          </p>
          <h2 className={`text-4xl md:text-5xl font-display font-black text-ink leading-tight ${language === 'gu' ? 'font-gujarati' : ''}`}>
            {language === 'gu' ? 'જૂની રીત vs. અમારી રીત' : 'The old way vs.\xa0our way'}
          </h2>
        </div>

        {/* Comparison rows */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {rows.map((row, i) => (
            <div key={i} className="bg-cream border-2 border-ink rounded-lg p-4 md:p-5 shadow-chunky-sm">
              <p className="font-mono text-xs uppercase tracking-widest text-ink-fade mb-3">
                {row.label[language]}
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-3 md:gap-6 items-center">
                {/* Old way */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-ink-fade mb-1">
                    {language === 'gu' ? 'જૂની રીત' : 'OLD WAY'}
                  </p>
                  <p className={`text-sm text-ink-soft mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {row.old.desc[language]}
                  </p>
                  <p className="text-2xl font-black text-ink-fade line-through">
                    ₹{row.old.cost.toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Arrow */}
                <div className="text-3xl font-black text-kesar-deep select-none">→</div>

                {/* New way */}
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-monsoon mb-1 font-bold">
                    {language === 'gu' ? 'અમારી રીત' : 'OUR WAY'}
                  </p>
                  <p className={`text-sm text-ink-soft mb-2 ${language === 'gu' ? 'font-gujarati' : ''}`}>
                    {row.neu.desc[language]}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-ink">
                      ₹{row.neu.cost.toLocaleString('en-IN')}
                    </p>
                    <span className="text-xs font-bold font-mono bg-monsoon text-cream px-2 py-0.5 rounded">
                      −₹{(row.old.cost - row.neu.cost).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs font-mono text-ink-soft mt-6">
          {language === 'gu' ? '* અંદાજ છે — ખેતર અને સિઝન પ્રમાણે બદલાય.' : '* Estimates — varies by field and season.'}
        </p>
      </div>

      {/* Bottom strip */}
      <div className="patola-strip" />
    </section>
  );
};

export default BeforeAfter;

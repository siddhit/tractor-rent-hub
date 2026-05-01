import rotavatorImg from '@/assets/implement-rotavator.jpg';
import groundnutDiggerImg from '@/assets/implement-groundnut-digger.jpg';

const OLIMPIA_IMG = 'https://www.maschiogaspardo.com/media/assets/portale-pubblico/Semina/Seminatrici%20per%20ortaggi/OLIMPIA/Perche%CC%80%20scegliere/seminatrice-ortaggi-OLIMPIA-perche%20scegliere.jpg?width=800&auto=webp&quality=80';
const PROTEKTOR_IMG = 'https://shaktimanagro.com/wp-content/uploads/2017/02/Shaktiman_Applications_Protektor_600_Image_1.jpg';
const SGCH200_IMG = 'https://shaktiman-grimme.com/wp-content/uploads/elementor/thumbs/SGCH-200-Potato-HArvester-q781eyimkdgtgi8bkt8cyetqp0s7u2ze60hnhvrdw0.png';

export interface ImplementSpec {
  label: { en: string; gu: string };
  value: string | { en: string; gu: string };
}

export interface Implement {
  id: string;
  category: 'land-prep' | 'planting' | 'crop-season' | 'harvest';
  name: { en: string; gu: string };
  tagline: { en: string; gu: string };
  description: { en: string; gu: string };
  image: string;
  pricePerVigha: number | null;
  priceUnit: { en: string; gu: string };
  crops: ('onion' | 'cotton' | 'groundnut')[];
  replaces: { en: string; gu: string };
  specs: ImplementSpec[];
  available: boolean;
  comingSoon?: boolean;
  popular?: boolean;
  hero?: boolean;
  tone: 'kesar' | 'terracotta' | 'monsoon' | 'mauve' | 'ink';
}

export const implements_data: Implement[] = [
  {
    id: 'sub-soiler',
    category: 'land-prep',
    name: { en: 'Sub-Soiler', gu: 'સબ-સોઇલર' },
    tagline: { en: 'Breaks the hardpan', gu: 'કઠણ જમીનનું થર તોડે' },
    description: {
      en: 'Cracks the compacted hardpan sitting 18" below the surface — something hand-tillage simply cannot reach. Opens up root zones for air and water.',
      gu: 'જમીનની નીચે 18 ઇંચ સુધી બેઠેલું કઠણ થર — હાથ-ખેડે ન તૂટે — એને તોડીને મૂળને હવા અને પાણી પહોંચાડે.',
    },
    image: rotavatorImg,
    pricePerVigha: 640,
    priceUnit: { en: 'per vigha', gu: 'પ્રતિ વીઘા' },
    crops: ['onion', 'cotton', 'groundnut'],
    replaces: { en: 'Not possible by hand labour', gu: 'હાથ-ખેડાણ થી અશક્ય' },
    specs: [
      { label: { en: 'Tractor req.', gu: 'ટ્રેક્ટર' }, value: '60 HP+' },
      { label: { en: 'Depth', gu: 'ઊંડાઈ' }, value: '18 inch' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '5 vigha/hr', gu: '5 વીઘા/કલાક' } },
    ],
    available: true,
    tone: 'ink',
  },
  {
    id: 'bed-former',
    category: 'land-prep',
    name: { en: 'Bed Former', gu: 'બેડ-ફોર્મર' },
    tagline: { en: '1,200 mm precision raised bed', gu: '1,200 મીમી ઊંચું પથારું' },
    description: {
      en: 'Forms precision 1,200 mm raised beds — critical for onion. Uniform width means uniform irrigation, no root rot.',
      gu: 'ડુંગળી માટે ચોક્કસ 1,200 મીમી પહોળું, એકસરખું ઊંચું પથારું બનાવે. પાણી બરાબર ઊતરે, મૂળ સડે નહીં.',
    },
    image: rotavatorImg,
    pricePerVigha: 600,
    priceUnit: { en: 'per vigha', gu: 'પ્રતિ વીઘા' },
    crops: ['onion', 'cotton', 'groundnut'],
    replaces: { en: 'Uneven hand-made beds', gu: 'અસમાન હાથ-બનાવેલું પથારું' },
    specs: [
      { label: { en: 'Bed width', gu: 'પહોળાઈ' }, value: '1,200 mm' },
      { label: { en: 'Tractor req.', gu: 'ટ્રેક્ટર' }, value: '50 HP+' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '3.75 vigha/hr', gu: '3.75 વીઘા/કલાક' } },
    ],
    available: true,
    popular: true,
    tone: 'terracotta',
  },
  {
    id: 'vacuum-seeder',
    category: 'planting',
    name: { en: 'Gaspardo OLIMPIA Seeder', gu: 'ગાસ્પર્ડો OLIMPIA સીડર' },
    tagline: { en: 'Exact depth, exact spacing', gu: 'ચોક્કસ ઊંડાઈ, ચોક્કસ અંતર' },
    description: {
      en: 'The Maschio Gaspardo OLIMPIA — a precision vacuum seeder built in Italy for vegetable crops. Drops onion seed at exact 1 cm depth with uniform spacing. No one else in the region has this machine.',
      gu: 'ઇટાલી ની Maschio Gaspardo OLIMPIA — ડુંગળી માટે ખાસ વેક્યુમ સીડર. ચોક્કસ 1 સેમી ઊંડે, એકસરખા અંતરે. આ આસપાસ ક્યાંય આ મશીન નથી.',
    },
    image: OLIMPIA_IMG,
    pricePerVigha: 2500,
    priceUnit: { en: 'per vigha', gu: 'પ્રતિ વીઘા' },
    crops: ['onion'],
    replaces: { en: 'Hand sowing with uneven germination', gu: 'હાથ-વાવણી, અસમાન ઉગાવો' },
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Maschio Gaspardo OLIMPIA' },
      { label: { en: 'Depth accuracy', gu: 'ઊંડાઈ ચોકસાઈ' }, value: '±2 mm' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '2 vigha/hr', gu: '2 વીઘા/કલાક' } },
    ],
    available: true,
    popular: true,
    hero: true,
    tone: 'kesar',
  },
  {
    id: 'boom-sprayer',
    category: 'crop-season',
    name: { en: 'Boom Sprayer', gu: 'બૂમ સ્પ્રેયર' },
    tagline: { en: 'Even coverage, ~30% less chemical', gu: 'સરખો છંટકાવ, 30% ઓછી દવા' },
    description: {
      en: 'Backpack pumps leave half the field over-sprayed and half under-sprayed. The Shaktiman Protektor 600 boom sprayer delivers even coverage across an 8 m boom — use ~30% less chemical for the same effect.',
      gu: 'હાથ-પમ્પ થી અડધે વધારે, અડધે ઓછું. Shaktiman Protektor 600 — 8 મી. પહોળો બૂમ, 30% ઓછી દવામાં એ જ કામ.',
    },
    image: PROTEKTOR_IMG,
    pricePerVigha: 200,
    priceUnit: { en: 'per vigha / round (6 rounds/season)', gu: 'પ્રતિ વીઘા/રાઉન્ડ (6 રાઉન્ડ/સિઝન)' },
    crops: ['onion', 'cotton', 'groundnut'],
    replaces: { en: 'Manual backpack pump, uneven spray', gu: 'હાથ-પમ્પ — અસમાન છંટકાવ' },
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Shaktiman Protektor 600' },
      { label: { en: 'Boom width', gu: 'બૂમ પહોળાઈ' }, value: '8 m' },
      { label: { en: 'Tank', gu: 'ટાંકી' }, value: '500 L' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '10 vigha/hr', gu: '10 વીઘા/કલાક' } },
    ],
    available: true,
    popular: true,
    tone: 'monsoon',
  },
  {
    id: 'fertiliser-spreader',
    category: 'crop-season',
    name: { en: 'Fertiliser Spreader', gu: 'ખાતર સ્પ્રેડર' },
    tagline: { en: 'Uniform dosing, no hotspots', gu: 'ખાતર એકસરખું — ઢગલા નહીં' },
    description: {
      en: 'Hand-spreading creates dense piles in some spots and bare patches in others. Mechanical spreading lays fertiliser at a uniform 12 m swath — less waste, more even growth.',
      gu: 'હાથે ખાતર નાખો એટલે ક્યાંક ઢગલો, ક્યાંક ખાલી. 12 મી. સ્વાથ માં એકસરખું ફેલાય — ખાતર બચે, પાક ઊગે.',
    },
    image: groundnutDiggerImg,
    pricePerVigha: 200,
    priceUnit: { en: 'per vigha / pass (2 passes/season)', gu: 'પ્રતિ વીઘા/પાસ (2 પાસ/સિઝન)' },
    crops: ['onion', 'cotton', 'groundnut'],
    replaces: { en: 'Manual broadcasting by hand', gu: 'હાથે ખાતર નાખવું' },
    specs: [
      { label: { en: 'Hopper', gu: 'હોપર' }, value: '600 kg' },
      { label: { en: 'Spread width', gu: 'પહોળાઈ' }, value: '12 m' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '7.5 vigha/hr', gu: '7.5 વીઘા/કલાક' } },
    ],
    available: true,
    tone: 'mauve',
  },
  {
    id: 'onion-harvester',
    category: 'harvest',
    name: { en: 'Onion Harvester', gu: 'ડુંગળી હાર્વેસ્ટર' },
    tagline: { en: 'Peak Jan–Feb — one day, zero damage', gu: 'જાન્યુ-ફેબ્રુ પીક — એક દિવસ, ડુંગળી તૂટે નહીં' },
    description: {
      en: 'Peak season needs 10–15 labourers for 2–3 days. The Shaktiman-Grimme SGCH-200 finishes in one day, without damaging the bulbs. No alternative available anywhere nearby.',
      gu: 'પીક સિઝનમાં 10-15 મજૂર × 2-3 દિવસ. Shaktiman-Grimme SGCH-200 — એક જ દિવસ, ડુંગળી તૂટે નહીં. આ આસપાસ ક્યાંય મળે નહીં.',
    },
    image: SGCH200_IMG,
    pricePerVigha: 3500,
    priceUnit: { en: 'per vigha', gu: 'પ્રતિ વીઘા' },
    crops: ['onion'],
    replaces: { en: '10–15 labourers × 2–3 days', gu: '10-15 મજૂર × 2-3 દિવસ' },
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Shaktiman-Grimme SGCH-200' },
      { label: { en: 'Width', gu: 'પહોળાઈ' }, value: '1.5 m' },
      { label: { en: 'Tractor req.', gu: 'ટ્રેક્ટર' }, value: '45 HP+' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '2.5 vigha / 2 hrs', gu: '2.5 વીઘા / 2 કલાક' } },
    ],
    available: true,
    popular: true,
    hero: true,
    tone: 'kesar',
  },
  {
    id: 'pneumatic-planter',
    category: 'planting',
    name: { en: 'Pneumatic Planter — 4 rows', gu: 'પ્ન્યુમેટિક પ્લાન્ટર — 4 રો' },
    tagline: { en: 'Precision sowing for cotton & groundnut', gu: 'કપાસ અને મગફળી માટે ચોક્કસ વાવણી' },
    description: {
      en: 'Shaktiman SVPP 4-row pneumatic planter — drops seed at exact spacing and exact depth. For cotton and groundnut, this is the difference between uneven stand and half the crop. Adding it after we\'ve nailed onion.',
      gu: 'Shaktiman SVPP 4-રો — ચોક્કસ અંતરે અને ઊંડે બીજ. કપાસ અને મગફળી માટે ડુંગળી પર નંબર આવ્યા પછી ઉમેરીશું.',
    },
    image: 'https://shaktimanagro.com/wp-content/uploads/2026/01/0D5A3962-copy.png',
    pricePerVigha: null,
    priceUnit: { en: 'Coming soon', gu: 'ટૂંક સમયમાં' },
    crops: ['cotton', 'groundnut'],
    replaces: { en: 'Hand sowing, seed wastage', gu: 'હાથ-વાવણી, બીજનો બગાડ' },
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Shaktiman SVPP (shoe type)' },
      { label: { en: 'Rows', gu: 'રો' }, value: '4' },
      { label: { en: 'Status', gu: 'સ્થિતિ' }, value: { en: 'Pricing TBD', gu: 'મૂલ્યાંકન ચાલુ' } },
    ],
    available: false,
    comingSoon: true,
    tone: 'mauve',
  },
  {
    id: 'groundnut-thresher',
    category: 'harvest',
    name: { en: 'Groundnut Thresher', gu: 'મગફળી થ્રેશર' },
    tagline: { en: 'Shells and separates — without hand labour', gu: 'મગફળી છોડાવી, શીંગો અલગ — મજૂરી વગર' },
    description: {
      en: 'Siddhanath thresher — separates groundnut from the plant with clean pods out the back. What used to take a field of hands now takes a day. Coming for groundnut farmers soon.',
      gu: 'Siddhanath થ્રેશર — ચરાતા મગફળી માંથી શીંગો અલગ, દાણા ચોખ્ખા. હાથે તોડવું કરતાં — હવે એક દિવસ. ટૂંક સમયમાં.',
    },
    image: groundnutDiggerImg,
    pricePerVigha: null,
    priceUnit: { en: 'Coming soon', gu: 'ટૂંક સમયમાં' },
    crops: ['groundnut'],
    replaces: { en: 'Hand shelling', gu: 'હાથે મગફળી તોડવી' },
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Siddhanath Thresher' },
      { label: { en: 'Status', gu: 'સ્થિતિ' }, value: { en: 'Sourcing', gu: 'સોર્સિંગ ચાલુ' } },
      { label: { en: 'Pilot', gu: 'પાઇલટ' }, value: { en: 'Season 2026-27', gu: 'સિઝન 2026-27' } },
    ],
    available: false,
    comingSoon: true,
    tone: 'terracotta',
  },
  {
    id: 'laser-deweeder',
    category: 'crop-season',
    name: { en: 'Laser De-Weeder', gu: 'લેઝર દેવીડર' },
    tagline: { en: 'AI-guided laser, zero chemicals', gu: 'AI લેઝર — દવા વગર નીંદણ' },
    description: {
      en: 'AI camera identifies weeds, laser burns them. No chemicals, no contact with the crop. Still under development — get in touch if you want to pilot on your farm.',
      gu: 'કેમેરા થી નીંદણ ઓળખે, લેઝર થી બાળી દે. કોઈ રસાયણ નહીં. હજી ડેવલપમેન્ટ માં — તમારા ખેતર માટે ટેસ્ટ કરવા માંગો?',
    },
    image: rotavatorImg,
    pricePerVigha: null,
    priceUnit: { en: 'Coming soon', gu: 'ટૂંક સમયમાં' },
    crops: ['onion', 'cotton', 'groundnut'],
    replaces: { en: 'Herbicide spray, hand weeding', gu: 'હર્બિસાઇડ, હાથ-નીંદણ' },
    specs: [
      { label: { en: 'Technology', gu: 'ટેકનોલોજી' }, value: 'AI + Laser' },
      { label: { en: 'Status', gu: 'સ્થિતિ' }, value: { en: 'In development', gu: 'વિકાસ હેઠળ' } },
      { label: { en: 'Pilot', gu: 'પાઇલટ' }, value: { en: 'Season 2026-27', gu: 'સિઝન 2026-27' } },
    ],
    available: false,
    comingSoon: true,
    tone: 'mauve',
  },
];

export const getPopularImplements = () => implements_data.filter(i => i.popular);

export const getImplementsByCrop = (crop: 'onion' | 'cotton' | 'groundnut' | 'all') => {
  if (crop === 'all') return implements_data;
  return implements_data.filter(i => i.crops.includes(crop));
};

export const getImplementById = (id: string) => implements_data.find(i => i.id === id);

import gaspardoImg from '@/assets/machine-gaspardo-olimpia.jpg';
import bedFormerImg from '@/assets/machine-bed-former.jpg';
import sprayerImg from '@/assets/machine-protektor-sprayer.jpg';
import groundnutDiggerImg from '@/assets/machine-groundnut-digger.jpg';

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
  priceBasis: 'vigha' | 'hour';
  price: number;
  // Derived estimate (width × speed × field efficiency, 25% conservative derate) —
  // not a measured figure. 0 for vigha-priced machines, where it isn't used.
  vighaPerHour: number;
  crops: ('onion' | 'cotton' | 'groundnut')[];
  specs: ImplementSpec[];
  available: boolean;
  hero?: boolean;
}

export const implements_data: Implement[] = [
  {
    id: 'vacuum-seeder',
    category: 'planting',
    name: { en: 'Gaspardo OLIMPIA Seeder', gu: 'ગાસ્પર્ડો OLIMPIA સીડર' },
    tagline: { en: 'Exact depth, exact spacing', gu: 'ચોક્કસ ઊંડાઈ, ચોક્કસ અંતર' },
    description: {
      en: 'Precision direct sowing of onion seed — uniform row spacing, depth and plant population, with RTK-GPS guidance for straight lines. Works on raised beds, for both hybrid and OP varieties.',
      gu: 'ડુંગળીના બીજની પ્રિસિઝન ડાયરેક્ટ સોઇંગ — સમાન રો સ્પેસિંગ, ઊંડાઇ અને પ્લાન્ટ પોપ્યુલેશન. RTK-GPS માર્ગદર્શનથી સીધી લાઇનો; રેઇઝ્ડ બેડ, હાઇબ્રિડ અને OP બંને જાત માટે.',
    },
    image: gaspardoImg,
    priceBasis: 'vigha',
    price: 3000,
    vighaPerHour: 0,
    crops: ['onion'],
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Maschio Gaspardo OLIMPIA' },
      { label: { en: 'Guidance', gu: 'માર્ગદર્શન' }, value: 'RTK-GPS' },
    ],
    available: true,
    hero: true,
  },
  {
    id: 'bed-former',
    category: 'land-prep',
    name: { en: 'Bed Former', gu: 'બેડ-ફોર્મર' },
    tagline: { en: 'Uniform raised beds — charged by the hour', gu: 'સમાન રેઇઝ્ડ બેડ — કલાક ના ભાવે' },
    description: {
      en: 'Forms uniform, regular raised beds — consistent width, height and spacing, ready for drip irrigation and precision sowing.',
      gu: 'સમાન અને નિયમિત રેઇઝ્ડ બેડ — પહોળાઇ, ઊંચાઇ અને અંતર એકસરખું, ડ્રિપ સિંચાઇ અને ચોકસાઇપૂર્વક વાવણી માટે તૈયાર ખેતર.',
    },
    image: bedFormerImg,
    priceBasis: 'hour',
    price: 800,
    vighaPerHour: 1.81,
    crops: ['onion', 'cotton', 'groundnut'],
    specs: [
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '1.81 vigha/hr', gu: '1.81 વીઘા/કલાક' } },
    ],
    available: true,
    hero: true,
  },
  {
    id: 'sprayer',
    category: 'crop-season',
    name: { en: 'Protektor Sprayer', gu: 'પ્રોટેક્ટર સ્પ્રેયર' },
    tagline: { en: 'Mechanized spraying — priced per vigha, per spray', gu: 'મશીનાઇઝ્ડ છંટકાવ — વિઘા-સ્પ્રે ના ભાવે' },
    description: {
      en: 'Fast, even mechanized spraying over large areas — fixed boom and nozzles for uniform coverage, even in tall crops. Suitable for onion, cotton and groundnut.',
      gu: 'મોટા વિસ્તારમાં ઝડપી, એકસરખો મશીનાઇઝ્ડ છંટકાવ — ફિક્સ્ડ બૂમ અને નોઝલ થી સમાન એપ્લિકેશન, ઊંચા પાકોમાં પણ. ડુંગળી, કપાસ, મગફળી માટે યોગ્ય.',
    },
    image: sprayerImg,
    priceBasis: 'vigha',
    price: 200,
    vighaPerHour: 0,
    crops: ['onion', 'cotton', 'groundnut'],
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Shaktiman Protektor' },
    ],
    available: true,
    hero: true,
  },
  {
    id: 'groundnut-digger',
    category: 'harvest',
    name: { en: 'Groundnut Digger', gu: 'ગ્રાઉન્ડનટ ડિગર' },
    tagline: { en: 'Lifts groundnut — charged by the hour', gu: 'મગફળી કાઢવા — કલાક ના ભાવે' },
    description: {
      en: 'Fast machine digging of mature groundnut — completed within the right harvest window, even over large areas.',
      gu: 'પાકેલી મગફળીનું ઝડપી મશીનથી ડિગિંગ — યોગ્ય હાર્વેસ્ટ સમયગાળામાં, મોટા વિસ્તાર માટે પણ.',
    },
    image: groundnutDiggerImg,
    priceBasis: 'hour',
    price: 1000,
    vighaPerHour: 1.36,
    crops: ['groundnut'],
    specs: [
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '1.36 vigha/hr', gu: '1.36 વીઘા/કલાક' } },
    ],
    available: true,
    hero: true,
  },
];

export const vighaPerDay = (implement: Implement) => implement.vighaPerHour * 8;

export const getImplementsByCrop = (crop: 'onion' | 'cotton' | 'groundnut' | 'all') => {
  if (crop === 'all') return implements_data;
  return implements_data.filter(i => i.crops.includes(crop));
};

export const getImplementById = (id: string) => implements_data.find(i => i.id === id);

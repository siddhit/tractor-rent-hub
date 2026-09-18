import rotavatorImg from '@/assets/implement-rotavator.jpg';
import groundnutDiggerImg from '@/assets/implement-groundnut-digger.jpg';

// TODO: replace once Maschio Gaspardo confirm written permission — hotlinked, not self-hosted
const OLIMPIA_IMG = 'https://www.maschiogaspardo.com/media/assets/portale-pubblico/Semina/Seminatrici%20per%20ortaggi/OLIMPIA/Perche%CC%80%20scegliere/seminatrice-ortaggi-OLIMPIA-perche%20scegliere.jpg?width=800&auto=webp&quality=80';

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
  // not a measured figure. A real field measurement is expected within days.
  vighaPerHour: number;
  crops: ('onion' | 'cotton' | 'groundnut')[];
  specs: ImplementSpec[];
  available: boolean;
  hero?: boolean;
  tone: 'kesar' | 'terracotta' | 'monsoon' | 'mauve' | 'ink';
}

export const implements_data: Implement[] = [
  {
    id: 'vacuum-seeder',
    category: 'planting',
    name: { en: 'Gaspardo OLIMPIA Seeder', gu: 'ગાસ્પર્ડો OLIMPIA સીડર' },
    tagline: { en: 'Exact depth, exact spacing', gu: 'ચોક્કસ ઊંડાઈ, ચોક્કસ અંતર' },
    description: {
      en: "Sowing of farmers' seed with our Gaspardo sowing machine and tractor.",
      gu: 'અમારા Gaspardo સોઇંગ મશીન અને ટ્રેક્ટર થી ખેડૂત ના બીજ ની વાવણી.',
    },
    image: OLIMPIA_IMG,
    priceBasis: 'vigha',
    price: 3000,
    vighaPerHour: 3.61,
    crops: ['onion'],
    specs: [
      { label: { en: 'Model', gu: 'મોડેલ' }, value: 'Maschio Gaspardo OLIMPIA' },
      { label: { en: 'Depth accuracy', gu: 'ઊંડાઈ ચોકસાઈ' }, value: '±2 mm' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '3.61 vigha/hr', gu: '3.61 વીઘા/કલાક' } },
    ],
    available: true,
    hero: true,
    tone: 'kesar',
  },
  {
    id: 'bed-former',
    category: 'land-prep',
    name: { en: 'Bed Former', gu: 'બેડ-ફોર્મર' },
    tagline: { en: '1,200 mm raised bed — charged by the hour', gu: '1,200 મીમી ઊંચું પથારું — કલાક ના ભાવે' },
    description: {
      en: 'Forming of raised beds with our tractors and bed-forming implements.',
      gu: 'અમારા ટ્રેક્ટર અને બેડ-ફોર્મિંગ ઇમ્પ્લિમેન્ટ થી ઊંચા પથારા બનાવવા.',
    },
    image: rotavatorImg,
    priceBasis: 'hour',
    price: 1000,
    vighaPerHour: 1.81,
    crops: ['onion', 'cotton', 'groundnut'],
    specs: [
      { label: { en: 'Bed width', gu: 'પહોળાઈ' }, value: '1,200 mm' },
      { label: { en: 'Tractor req.', gu: 'ટ્રેક્ટર' }, value: '50 HP+' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '1.81 vigha/hr', gu: '1.81 વીઘા/કલાક' } },
    ],
    available: true,
    hero: true,
    tone: 'terracotta',
  },
  {
    id: 'groundnut-digger',
    category: 'harvest',
    name: { en: 'Groundnut Digger', gu: 'ગ્રાઉન્ડનટ ડિગર' },
    tagline: { en: 'Lifts groundnut — charged by the hour', gu: 'મગફળી કાઢવા — કલાક ના ભાવે' },
    description: {
      en: 'Uprooting of groundnut using the digger implement with our tractor.',
      gu: 'અમારા ટ્રેક્ટર સાથે ડિગર ઇમ્પ્લિમેન્ટ થી મગફળી ઉખેડવી.',
    },
    image: groundnutDiggerImg,
    priceBasis: 'hour',
    price: 1000,
    vighaPerHour: 1.36,
    crops: ['groundnut'],
    specs: [
      { label: { en: 'Tractor req.', gu: 'ટ્રેક્ટર' }, value: '45 HP+' },
      { label: { en: 'Coverage', gu: 'ઝડપ' }, value: { en: '1.36 vigha/hr', gu: '1.36 વીઘા/કલાક' } },
    ],
    available: true,
    hero: true,
    tone: 'kesar',
  },
];

export const vighaPerDay = (implement: Implement) => implement.vighaPerHour * 8;

export const getImplementsByCrop = (crop: 'onion' | 'cotton' | 'groundnut' | 'all') => {
  if (crop === 'all') return implements_data;
  return implements_data.filter(i => i.crops.includes(crop));
};

export const getImplementById = (id: string) => implements_data.find(i => i.id === id);

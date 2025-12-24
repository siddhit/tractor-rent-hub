import onionHarvester from '@/assets/implement-onion-harvester.jpg';
import cottonPicker from '@/assets/implement-cotton-picker.jpg';
import groundnutDigger from '@/assets/implement-groundnut-digger.jpg';
import seedDrill from '@/assets/implement-seed-drill.jpg';
import rotavator from '@/assets/implement-rotavator.jpg';
import boomSprayer from '@/assets/implement-boom-sprayer.jpg';

export interface Implement {
  id: string;
  name: { en: string; gu: string };
  description: { en: string; gu: string };
  image: string;
  pricePerBigha: number;
  brand: string;
  crops: ('onion' | 'cotton' | 'groundnut')[];
  available: boolean;
  specs: string[];
  popular?: boolean;
}

export const implements_data: Implement[] = [
  {
    id: '1',
    name: { en: 'Onion Harvesting', gu: 'ડુંગળી લણણી' },
    description: { en: 'Fast onion harvesting with minimal crop damage', gu: 'ન્યૂનતમ પાક નુકસાન સાથે ઝડપી ડુંગળી લણણી' },
    image: onionHarvester,
    pricePerBigha: 800,
    brand: 'John Deere',
    crops: ['onion'],
    available: true,
    specs: ['1.5m Width', '35HP Required', '2 Bigha/Hour'],
    popular: true,
  },
  {
    id: '2',
    name: { en: 'Cotton Picking', gu: 'કપાસ વીણવું' },
    description: { en: 'Efficient cotton harvesting service', gu: 'કાર્યક્ષમ કપાસ લણણી સેવા' },
    image: cottonPicker,
    pricePerBigha: 1200,
    brand: 'Mahindra',
    crops: ['cotton'],
    available: true,
    specs: ['2 Row', '45HP Required', '1.5 Bigha/Hour'],
    popular: true,
  },
  {
    id: '3',
    name: { en: 'Groundnut Digging', gu: 'મગફળી કાઢવી' },
    description: { en: 'Specialized groundnut harvesting service', gu: 'વિશેષ મગફળી લણણી સેવા' },
    image: groundnutDigger,
    pricePerBigha: 700,
    brand: 'Shaktiman',
    crops: ['groundnut'],
    available: true,
    specs: ['1.2m Width', '30HP Required', '1.8 Bigha/Hour'],
    popular: true,
  },
  {
    id: '4',
    name: { en: 'Seed Drilling', gu: 'બીજ વાવણી' },
    description: { en: 'Precision seeding for multiple crops', gu: 'બહુવિધ પાક માટે ચોક્કસ વાવણી' },
    image: seedDrill,
    pricePerBigha: 600,
    brand: 'Gespardo',
    crops: ['onion', 'groundnut'],
    available: false,
    specs: ['9 Row', '35HP Required', 'Adjustable Depth'],
  },
  {
    id: '5',
    name: { en: 'Land Preparation', gu: 'જમીન તૈયારી' },
    description: { en: 'Soil preparation and tillage work', gu: 'જમીન તૈયારી અને ખેડાણ કામ' },
    image: rotavator,
    pricePerBigha: 500,
    brand: 'Maschio Gaspardo',
    crops: ['onion', 'cotton', 'groundnut'],
    available: true,
    specs: ['1.5m Width', '35HP Required', '2 Bigha/Hour'],
  },
  {
    id: '6',
    name: { en: 'Crop Spraying', gu: 'પાક છંટકાવ' },
    description: { en: 'Efficient crop spraying service', gu: 'કાર્યક્ષમ પાક છંટકાવ સેવા' },
    image: boomSprayer,
    pricePerBigha: 400,
    brand: 'Aspee',
    crops: ['onion', 'cotton', 'groundnut'],
    available: true,
    specs: ['8m Boom', '500L Tank', 'Electric Pump'],
  },
];

export const getPopularImplements = () => implements_data.filter(i => i.popular);

export const getImplementsByCrop = (crop: 'onion' | 'cotton' | 'groundnut' | 'all') => {
  if (crop === 'all') return implements_data;
  return implements_data.filter(i => i.crops.includes(crop));
};

export const getImplementById = (id: string) => implements_data.find(i => i.id === id);

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
  pricePerDay: number;
  brand: string;
  crops: ('onion' | 'cotton' | 'groundnut')[];
  available: boolean;
  specs: string[];
  popular?: boolean;
}

export const implements_data: Implement[] = [
  {
    id: '1',
    name: { en: 'Onion Harvester', gu: 'ડુંગળી હાર્વેસ્ટર' },
    description: { en: 'Efficient onion harvesting with minimal crop damage', gu: 'ન્યૂનતમ પાક નુકસાન સાથે કાર્યક્ષમ ડુંગળી લણણી' },
    image: onionHarvester,
    pricePerDay: 2500,
    brand: 'John Deere',
    crops: ['onion'],
    available: true,
    specs: ['1.5m Width', '35HP Required', '2 Acre/Hour'],
    popular: true,
  },
  {
    id: '2',
    name: { en: 'Cotton Picker', gu: 'કપાસ પીકર' },
    description: { en: 'High-efficiency cotton harvesting implement', gu: 'ઉચ્ચ-કાર્યક્ષમતા કપાસ લણણી સાધન' },
    image: cottonPicker,
    pricePerDay: 3500,
    brand: 'Mahindra',
    crops: ['cotton'],
    available: true,
    specs: ['2 Row', '45HP Required', '1.5 Acre/Hour'],
    popular: true,
  },
  {
    id: '3',
    name: { en: 'Groundnut Digger', gu: 'મગફળી ડિગર' },
    description: { en: 'Specialized for groundnut harvesting', gu: 'મગફળી લણણી માટે વિશેષ' },
    image: groundnutDigger,
    pricePerDay: 2000,
    brand: 'Shaktiman',
    crops: ['groundnut'],
    available: true,
    specs: ['1.2m Width', '30HP Required', '1.8 Acre/Hour'],
    popular: true,
  },
  {
    id: '4',
    name: { en: 'Multi-Crop Seed Drill', gu: 'મલ્ટી-ક્રોપ સીડ ડ્રિલ' },
    description: { en: 'Precision seeding for multiple crops', gu: 'બહુવિધ પાક માટે ચોક્કસ વાવણી' },
    image: seedDrill,
    pricePerDay: 1800,
    brand: 'Gespardo',
    crops: ['onion', 'groundnut'],
    available: false,
    specs: ['9 Row', '35HP Required', 'Adjustable Depth'],
  },
  {
    id: '5',
    name: { en: 'Rotavator', gu: 'રોટાવેટર' },
    description: { en: 'Soil preparation and tillage', gu: 'જમીન તૈયારી અને ખેડાણ' },
    image: rotavator,
    pricePerDay: 1500,
    brand: 'Maschio Gaspardo',
    crops: ['onion', 'cotton', 'groundnut'],
    available: true,
    specs: ['1.5m Width', '35HP Required', '2 Acre/Hour'],
  },
  {
    id: '6',
    name: { en: 'Boom Sprayer 500L', gu: 'બૂમ સ્પ્રેયર 500L' },
    description: { en: 'Efficient crop spraying equipment', gu: 'કાર્યક્ષમ પાક છંટકાવ સાધન' },
    image: boomSprayer,
    pricePerDay: 1200,
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

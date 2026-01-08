
import { Asset, AssetType } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    title: 'Cyberpunk Vector UI Kit',
    description: 'High-quality futuristic UI elements for games and web apps.',
    price: 29.00,
    type: AssetType.VECTOR,
    imageUrl: 'https://picsum.photos/seed/cyber/600/400',
    rating: 4.8,
    sales: 1240,
    creator: 'NeoDesign'
  },
  {
    id: '2',
    title: 'Minimalist Logo Pack',
    description: '50+ Clean and scalable minimalist logos for modern branding.',
    price: 19.00,
    type: AssetType.VECTOR,
    imageUrl: 'https://picsum.photos/seed/logo/600/400',
    rating: 4.9,
    sales: 850,
    creator: 'SimpleStudio'
  },
  {
    id: '3',
    title: 'Abstract Organic Textures',
    description: 'High-resolution noise and grain textures for organic feel.',
    price: 15.00,
    type: AssetType.TEXTURE,
    imageUrl: 'https://picsum.photos/seed/texture/600/400',
    rating: 4.7,
    sales: 2100,
    creator: 'GrainMaster'
  },
  {
    id: '4',
    title: 'Editorial Serif Font',
    description: 'Elegant typeface perfect for headlines and luxury branding.',
    price: 35.00,
    type: AssetType.FONT,
    imageUrl: 'https://picsum.photos/seed/font/600/400',
    rating: 5.0,
    sales: 420,
    creator: 'TypeFoundry'
  },
  {
    id: '5',
    title: 'Product Mockup Bundle',
    description: 'Professional PSD mockups for packaging and stationery.',
    price: 49.00,
    type: AssetType.PSD,
    imageUrl: 'https://picsum.photos/seed/mock/600/400',
    rating: 4.6,
    sales: 680,
    creator: 'RenderFlow'
  },
  {
    id: '6',
    title: 'Customizable 3D Icons',
    description: 'Playful 3D icons for apps and presentation slides.',
    price: 24.00,
    type: AssetType.ICON,
    imageUrl: 'https://picsum.photos/seed/icon/600/400',
    rating: 4.9,
    sales: 1500,
    creator: 'Z-Axis'
  }
];

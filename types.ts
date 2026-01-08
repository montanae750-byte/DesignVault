
export enum AssetType {
  VECTOR = 'Vector',
  PSD = 'PSD',
  TEXTURE = 'Texture',
  FONT = 'Font',
  ICON = 'Icon'
}

export interface Asset {
  id: string;
  title: string;
  description: string;
  price: number;
  type: AssetType;
  imageUrl: string;
  rating: number;
  sales: number;
  creator: string;
}

export interface CartItem extends Asset {
  quantity: number;
}

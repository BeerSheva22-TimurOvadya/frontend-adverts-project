import { BaseProduct, ElectronicsTypes } from './Common';

export interface Electronics extends BaseProduct {
  category: 'Electronics';  
  brand: string;
  model: string;
  screenSize: number;
  type: typeof ElectronicsTypes[number];
}

import { BaseProduct, HousingTypes } from './Common';

export interface Housing extends BaseProduct {
  category: 'Housing';
  address: string;
  rooms: number;
  squareMeters: number;
  type: typeof HousingTypes[number];
}

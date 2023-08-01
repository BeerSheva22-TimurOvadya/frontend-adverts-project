export const ElectronicsTypes = ['Tablet', 'Mobile Phone', 'TV'] as const;
export const HousingTypes = ['Apartment', 'House', 'Townhouse'] as const;
export const Categories = ['Electronics', 'Housing', 'Cars'] as const;

export interface BaseProduct {
  id: string;
  name: string;
  category: typeof Categories[number];
  price: string;
}
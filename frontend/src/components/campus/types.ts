export type BuildingCategory =
  | 'academic'
  | 'religious'
  | 'administrative'
  | 'medical'
  | 'cultural'
  | 'services';

export interface Building {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: BuildingCategory;
  facilities: string[];
  facilitiesAr: string[];
  hours: string;
  hoursAr: string;
  location: string;
  locationAr: string;
  founded?: string;
}

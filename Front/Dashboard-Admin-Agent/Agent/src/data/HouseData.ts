export interface HouseData {
  id?: string;
  title: string;
  type: string;
  description: string;
  agentId: string;
  images: string[];
  price: number;
  details: DetailsData;
  location: LocationData;
}
export interface DetailsData {
  id?: string;
  rooms: number;
  bathrooms: number;
  area: number;
}
export interface LocationData {
  id?: string;
  latitude?: number;
  longitude?: number;
  address: string;
  zipCode: string;
  city: string;
}

export enum Type {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  PENTHOUSE = 'PENTHOUSE',
  STUDIO = 'STUDIO',
  DUPLEX = 'DUPLEX',
}
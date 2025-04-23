export interface HouseData {
  id: number;
  title: string;
  address: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  price: string | number;
  agent: string;
  image: string[];
  area: number | string;
  bedrooms: number;
  bathrooms: number;
  type: string;
  description: string;
  agentId: string;
}

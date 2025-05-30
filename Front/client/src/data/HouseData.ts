export interface HouseData {
  id?: string;
  title: string;
  typeId: string; // ← novo campo obrigatório para envio
  type?: HouseType; // usado na leitura (opcional, retornado do backend)
  description: string;
  agentId: string;
  images: string[];
  price: number;
  details: DetailsData;
  location: LocationData;
  createdAt: string;
  updatedAt: string;
  views?: number; // opcional, usado para incrementar visualizações
}


export type HouseDataOptional = Partial<HouseData> & {
  createdAt: string;
  updatedAt: string;
};


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

export interface HouseType {
  id: string;
  name: string;
}

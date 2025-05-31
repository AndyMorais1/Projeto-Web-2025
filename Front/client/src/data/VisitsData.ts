// src/data/VisitData.ts

import { UserData } from './UserData';
import { HouseData } from './HouseData';

export type VisitStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED';

export interface VisitData {
  id: string;
  date: string;
  status: VisitStatus;
  message?: string;
  createdAt: string;
  updatedAt: string;

  client: UserData;
  house: HouseData;
}


export interface VisitCreatePayload {
  clientId: string;
  houseId: string;
  date: string; // ISO date string
  message?: string;
}

export interface VisitUpdateStatusPayload {
  visitId: string;
  status: VisitStatus;
}
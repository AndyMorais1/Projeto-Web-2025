import axios, { AxiosInstance } from 'axios';
import {
  VisitData,
  VisitCreatePayload,
  VisitUpdateStatusPayload
} from '@/data/VisitsData';

class VisitsService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
  }

  private getAuthHeader() {
    const token = localStorage.getItem('token');
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }

  async createVisit(data: VisitCreatePayload): Promise<VisitData | null> {
    try {
      const response = await this.api.post<VisitData>('/visits', data, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar visita:', error.response?.data || error.message);
      return null;
    }
  }

  async getVisitById(id: string): Promise<VisitData | null> {
    try {
      const response = await this.api.get<VisitData>(`/visits/${id}`, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar visita:', error.response?.data || error.message);
      return null;
    }
  }

  async getVisitsByClient(clientId: string): Promise<VisitData[]> {
    try {
      const response = await this.api.get<VisitData[]>(`/visits/client/${clientId}`, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar visitas do cliente:', error.response?.data || error.message);
      return [];
    }
  }

  async getVisitsByHouse(houseId: string): Promise<VisitData[]> {
    try {
      const response = await this.api.get<VisitData[]>(`/visits/house/${houseId}`, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar visitas da casa:', error.response?.data || error.message);
      return [];
    }
  }

  async updateVisitStatus(data: VisitUpdateStatusPayload): Promise<VisitData | null> {
    try {
      const response = await this.api.put<VisitData>('/visits/status', data, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao atualizar status da visita:', error.response?.data || error.message);
      return null;
    }
  }

  async deleteVisit(id: string): Promise<void> {
    try {
      await this.api.delete(`/visits/${id}`, {
        headers: this.getAuthHeader(),
      });
    } catch (error: any) {
      console.error('Erro ao deletar visita:', error.response?.data || error.message);
    }
  }

  async getVisitsByAgent(agentId: string): Promise<VisitData[]> {
    try {
      const response = await this.api.get<VisitData[]>(`/visits/agent/${agentId}`, {
        headers: this.getAuthHeader(),
      });
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar visitas do agente:', error.response?.data || error.message);
      return [];
    }
  }


}

export const visitsService = new VisitsService();

// src/services/HouseTypeService.ts

import axios, { AxiosInstance } from 'axios';
import { HouseType } from '../data/HouseData';

class HouseTypeService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
  }

  async getAll(): Promise<HouseType[]> {
    try {
      const response = await this.api.get<HouseType[]>('/house-types');
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar tipos de casa:', error.response?.data || error.message);
      return [];
    }
  }

  async getById(id: string): Promise<HouseType | null> {
    try {
      const response = await this.api.get<HouseType>(`/house-types/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao buscar tipo de casa por ID ${id}:`, error.response?.data || error.message);
      return null;
    }
  }

  async create(data: { name: string }): Promise<HouseType | null> {
    try {
      const response = await this.api.post<HouseType>('/house-types', data);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao criar tipo de casa:', error.response?.data || error.message);
      return null;
    }
  }

  async update(id: string, data: { name: string }): Promise<HouseType | null> {
    try {
      const response = await this.api.put<HouseType>(`/house-types/${id}`, data);
      return response.data;
    } catch (error: any) {
      console.error(`Erro ao atualizar tipo de casa ${id}:`, error.response?.data || error.message);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.api.delete(`/house-types/${id}`);
      return true;
    } catch (error: any) {
      console.error(`Erro ao deletar tipo de casa ${id}:`, error.response?.data || error.message);
      return false;
    }
  }
}

export const houseTypeService = new HouseTypeService();

import axios, { AxiosInstance } from 'axios';
import { HouseData, DetailsData, LocationData } from '@/data/HouseData';

class HousesServices {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/houses',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000, // Timeout de 5 segundos
        });
    }

    async getAllHouses(): Promise<HouseData[]> {
        try {
            const response = await this.api.get<HouseData[]>('/houses');
            return response.data;
        } catch (error: any) {
            console.error('Erro ao obter casas:', error.response?.data || error.message);
            return [];
        }
    }


    async getHouseById(id: string): Promise<HouseData | null> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return null;
            }
            const response = await this.api.get<HouseData>(`/houses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erro ao obter casa:', error.response?.data || error.message);
            return null;
        }
    }

    async createHouse(house: HouseData): Promise<HouseData | null> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return null;
            }
            const response = await this.api.post<HouseData>('/houses', house, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erro ao criar casa:', error.response?.data || error.message);
            return null;
        }
    }

    async updateHouse(id: string, house: Partial<HouseData>): Promise<HouseData | null> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return null;
            }
            const response = await this.api.put<HouseData>(`/houses/${id}`, house, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            console.error('Erro ao atualizar casa:', error.response?.data || error.message);
            return null;
        }
    }

    async deleteHouse(id: string): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return;
            }
            await this.api.delete(`/houses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error: any) {
            console.error('Erro ao deletar casa:', error.response?.data || error.message);
        }
    }

    async getHouseByAgentId(agentId: string): Promise<HouseData[]> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return [];
            }

            const response = await this.api.get<HouseData[]>(`/agents/${agentId}/houses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error: any) {
            console.error('Erro ao obter casas do agente:', {
                message: error.message,
                response: error.response,
                request: error.request,
                stack: error.stack,
            });
            return [];
        }
    }

    async incrementView(houseId: string): Promise<void> {
        try {
            await this.api.post(`/houses/${houseId}/view`);
        } catch (error: any) {
            console.error('Erro ao incrementar visualização:', error.response?.data || error.message);
        }
    }


    // Função para pegar as casas mais favoritadas
    async getMostFavoritedHouses(limit: number = 10): Promise<HouseData[]> {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token não encontrado no localStorage');
                return [];
            }

            // Faz a requisição GET para obter as casas mais favoritadas
            const response = await this.api.get<HouseData[]>('/houses/most-favorited', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    limit, // Passa o parâmetro de limite para a query string
                },
            });

            return response.data; // Retorna os dados das casas mais favoritadas
        } catch (error: any) {
            console.error('Erro ao obter as casas mais favoritadas:', error.response?.data || error.message);
            return [];
        }
    }


}
export const housesServices = new HousesServices();
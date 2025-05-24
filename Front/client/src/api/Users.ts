import { UserData, UserDataOptional } from '@/data/UserData';
import axios, { AxiosInstance } from 'axios';
import Cookie from 'js-cookie';
class UsersServices {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/users',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000,
        });
    }

    // Método para fazer login
    async login(email: string, password: string): Promise<string | null> {
        try {
            const response = await this.api.post<{ token: string }>('/users/login', {
                email,
                password,
            });

            // Verificar se a resposta tem um token válido
            if (!response.data || !response.data.token) {
                console.error('Token não encontrado');
                return null;
            }

            const token = response.data.token;

            // Limpar token anterior, se existir
            localStorage.removeItem('token');
            Cookie.remove('token');  // Remover o token do cookie

            // Armazenar o novo token no localStorage
            localStorage.setItem('token', token);

            // Armazenar o token no cookie (com segurança em produção)
            Cookie.set('token', token, {
                expires: 7, // Expira em 7 dias
                secure: process.env.NODE_ENV === 'production', // Define 'secure' para true em produção
                sameSite: 'Strict', // Prevenção contra CSRF
                httpOnly: false, // O token é acessível via JavaScript
            });

            console.log('Login bem-sucedido');
            return token;
        } catch (error: any) {
            console.error('Erro no login:', {
                message: error.message,
                response: error.response,
                request: error.request,
                stack: error.stack,
            });
            return null;
        }

    }

    // Método para fazer logout
    async logout(): Promise<void> {
        try {
            // Remove o token do localStorage
            localStorage.removeItem('token');

            // Remove o token do cookie
            Cookie.remove('token');

            console.log('Logout bem-sucedido');
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    }


    // Método para obter todos os usuários
    async getAllUsers(): Promise<any[]> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return [];
            }

            const response = await this.api.get("/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error: any) {
            console.error("Erro ao obter usuários:", {
                message: error.message,
                response: error.response ? error.response.data : "Sem resposta do servidor",
                status: error.response?.status || "Sem status",
            });
            throw error;
        }
    }

    // Método para excluir um usuário
    async deleteUser(userId: string): Promise<void> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            await this.api.delete(`/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error: any) {
            console.error("Erro ao excluir usuário:", error.message);
            throw error;
        }
    }

    // Método para criar um usuário
    async createUser(userData: UserData): Promise<any> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            const response = await this.api.post("/users", userData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error.message);
            throw error;
        }
    }

    // Método para atualizar um usuário
    async updateUser(userId: string, userData: UserDataOptional): Promise<any> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            const response = await this.api.put(`/users/${userId}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error: any) {
            console.error("Erro ao atualizar usuário:", error.message);
            throw error;
        }
    }

    // Método para atualizar o status de um agente
    async updateAgentStatus(userId: string): Promise<any> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            const response = await this.api.put(`/users/agent/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error: any) {
            console.error("Erro ao atualizar status do agente:", error.message);
            throw error;
        }
    }

    // Método para obter um usuário pelo ID
    async getUserById(userId: string): Promise<any> {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            const response = await this.api.get(`/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return response.data;
        } catch (error: any) {
            console.error("Erro ao obter usuário:", error.message);
            throw error;
        }
    }
}

export const usersServices = new UsersServices();

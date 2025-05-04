 
import axios from 'axios';
import Cookie from 'js-cookie';

class UsersServices {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:3000/users',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000,
        });
    }

    // Método para fazer login
    async login(email, password) {
        try {
            const response = await this.api.post('/users/login/admin', {
                email,
                password,
            });

            if (!response.data || !response.data.token) {
                console.error('Token não encontrado');
                return null;
            }

            const token = response.data.token;

            localStorage.removeItem('token');
            Cookie.remove('token');

            localStorage.setItem('token', token);

            Cookie.set('token', token, {
                expires: 7,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                httpOnly: false,
            });

            console.log('Login bem-sucedido');
            return token;
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            return null;
        }
    }

    // Método para fazer logout
    async logout() {
        try {
            localStorage.removeItem('token');
            Cookie.remove('token');
            console.log('Logout bem-sucedido');
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    }

    // Método para obter todos os usuários
    async getAllUsers() {
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
        } catch (error) {
            console.error("Erro ao obter usuários:", {
                message: error.message,
                response: error.response ? error.response.data : "Sem resposta do servidor",
                status: error.response?.status || "Sem status",
            });
            throw error;
        }
    }

    // Método para excluir um usuário
    async deleteUser(userId) {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Erro: Token de autenticação ausente!");
                return;
            }

            await this.api.delete(`/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Erro ao excluir usuário:", error.message);
            throw error;
        }
    }

    // Método para criar um usuário
    async createUser(userData) {
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
        } catch (error) {
            console.error("Erro ao criar usuário:", error.message);
            throw error;
        }
    }

    // Método para atualizar um usuário
    async updateUser(userId, userData) {
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
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error.message);
            throw error;
        }
    }

    // Método para atualizar o status de um agente
    async updateAgentStatus(userId) {
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
        } catch (error) {
            console.error("Erro ao atualizar status do agente:", error.message);
            throw error;
        }
    }

    // Método para obter um usuário pelo ID
    async getUserById(userId) {
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
        } catch (error) {
            console.error("Erro ao obter usuário:", error.message);
            throw error;
        }
    }
}

export const usersServices = new UsersServices();
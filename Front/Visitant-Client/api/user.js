const { use } = require("react");

class UsersServices {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:4000',
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000,
        });
    }

    async login(email, password) {
        try {
            const response = await this.api.post('/users/login', { email, password });

            const token = response.data?.token;
            if (!token) {
                console.error('Token não encontrado');
                return null;
            }

            localStorage.setItem('token', token);
            Cookies.set('token', token, {
                expires: 7,
                secure: location.protocol === 'https:',
                sameSite: 'Strict',
            });

            console.log('Login bem-sucedido');
            return token;
        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            return null;
        }
    }

    async logout() {
        try {
            localStorage.removeItem('token');
            Cookies.remove('token');
            console.log('Logout bem-sucedido');
        } catch (error) {
            console.error('Erro no logout:', error);
        }
    }

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

  async registerUser(userData) {
    try {
        const response = await this.api.post("/users/users", userData); 
        return response.data;
    } catch (error) {
        console.error("Erro ao registrar usuário:", {
            dadosEnviados: userData,
            mensagem: error.message,
            resposta: error.response?.data || "Sem resposta do servidor",
            status: error.response?.status || "Sem status",
        });
        throw error;
    }
}



    // async createUser(userData) {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) {
    //             console.error("Erro: Token de autenticação ausente!");
    //             return;
    //         }

    //         const response = await this.api.post("/users", userData, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });

    //         return response.data;
    //     } catch (error) {
    //         console.error("Erro ao criar usuário:", error.message);
    //         throw error;
    //     }
    // }

    async updateUser(userId, userData, token) {
        try {
            const response = await this.api.put(`/users/${userId}`, userData, {
                headers:{
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error.message);
            throw error;
        }
    }
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

// Disponibiliza para outros scripts no navegador
window.usersServices = new UsersServices();

// Criação da classe HousesServices
function HousesServices() {
    this.api = axios.create({
        baseURL: 'http://localhost:4000/houses',
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000, // Timeout de 5 segundos
    });
}

// Método para obter todas as casas
HousesServices.prototype.getAllHouses = async function() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado no localStorage');
            return [];
        }

        const response = await this.api.get('/houses', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter casas:', error.response?.data || error.message);
        return [];
    }
};

// Método para obter uma casa por ID
HousesServices.prototype.getHouseById = async function(id) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado no localStorage');
            return null;
        }

        const response = await this.api.get(`/houses/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter casa:', error.response?.data || error.message);
        return null;
    }
};

// Método para criar uma casa
HousesServices.prototype.createHouse = async function(house) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado no localStorage');
            return null;
        }

        const response = await this.api.post('/houses', house, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar casa:', error.response?.data || error.message);
        return null;
    }
};

// Método para atualizar uma casa
HousesServices.prototype.updateHouse = async function(id, house) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado no localStorage');
            return null;
        }

        const response = await this.api.put(`/houses/${id}`, house, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar casa:', error.response?.data || error.message);
        return null;
    }
};

// Método para deletar uma casa
HousesServices.prototype.deleteHouse = async function(id) {
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
    } catch (error) {
        console.error('Erro ao deletar casa:', error.response?.data || error.message);
    }
};

// Método para obter casas associadas a um agente
HousesServices.prototype.getHouseByAgentId = async function(agentId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token não encontrado no localStorage');
            return [];
        }

        const response = await this.api.get(`/agent/${agentId}/houses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter casas do agente:', error.response?.data || error.message);
        return [];
    }
};

// Instanciando a classe e fazendo-a disponível globalmente
const housesServices = new HousesServices();

// Para que o serviço possa ser acessado de qualquer lugar
window.housesServices = housesServices;

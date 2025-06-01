// src/services/RatingService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Ajuste se usar proxy ou prefixo

// Headers de autenticação
function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class RatingService {
  /**
   * Envia uma avaliação para um agente
   * @param agentId ID do agente
   * @param score Nota de 1 a 5
   * @param comment Comentário opcional
   */
  static async rateAgent(agentId: string, score: number, comment?: string) {
    try {
      const response = await axios.post(
        `${API_URL}/ratings`,
        { agentId, score, comment },
        { headers: getAuthHeaders() }
      );
      return response.data;
    } catch (error: any) {
      console.error("Erro ao enviar avaliação:", error);
      throw new Error(error.response?.data?.error || "Erro ao enviar avaliação");
    }
  }

  /**
   * Lista todas as avaliações de um agente
   * @param agentId ID do agente
   */
  static async getRatingsForAgent(agentId: string) {
    try {
      const response = await axios.get(`${API_URL}/ratings/agent/${agentId}`);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar avaliações:", error);
      throw new Error("Erro ao buscar avaliações do agente");
    }
  }

  /**
   * Retorna a média e quantidade de avaliações de um agente
   * @param agentId ID do agente
   */
  static async getAgentRatingSummary(agentId: string) {
    try {
      const response = await axios.get(`${API_URL}/ratings/agent/${agentId}/summary`);
      return response.data; // { average: number, totalRatings: number }
    } catch (error: any) {
      console.error("Erro ao buscar resumo de avaliações:", error);
      throw new Error("Erro ao buscar resumo de avaliações");
    }
  }
}

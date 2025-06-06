import { FastifyRequest, FastifyReply } from "fastify";
import { CreateHouseSchema } from "../schema/HouseSchema";
import { UpdateHouseSchema } from "../schema/HouseSchema";
import { houseService } from "../services/HouseService";

class HouseController{
    public async createHouse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const parsedData = CreateHouseSchema.parse(request.body);

            const user = await houseService.createHouse(parsedData);

            reply.status(201).send(user);
        } catch (error) {
            if (error instanceof Error) {
                reply.status(400).send({ message: error.message });
            } else {
                reply.status(500).send({ message: "Erro interno no servidor" });
            }
        }
    }

    public async getHouseById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };

            const house = await houseService.getHouseById(id);

            if (!house) {
                reply.status(404).send({ message: "Casa não encontrada" });
                return;
            }

            reply.send(house);
        } catch (error) {
            reply.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    public async getHouses(request: FastifyRequest, reply: FastifyReply) {
        try {
            const houses = await houseService.getHouses();

            reply.send(houses);
        } catch (error) {
            reply.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    public async updateHouse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };
            const parsedData = UpdateHouseSchema.parse(request.body);

            const house = await houseService.updateHouse(id, parsedData);

            reply.send(house);
        } catch (error) {
            if (error instanceof Error) {
                reply.status(400).send({ message: error.message });
            } else {
                reply.status(500).send({ message: "Erro interno no servidor" });
            }
        }
    }

    public async deleteHouse(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };

            await houseService.deleteHouse(id);

            reply.send({ message: "Casa deletada" });
        } catch (error) {
            reply.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    public async getHousesByAgent(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };

            const houses = await houseService.getHousesByAgent(id);

            reply.send(houses);
        } catch (error) {
            reply.status(500).send({ message: "Erro interno no servidor" });
        }
    }

    public async registerView(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };

            const updated = await houseService.incrementHouseViews(id);

            if (!updated) {
                return reply.status(404).send({ message: "Casa não encontrada" });
            }

            return reply.send({ message: "Visualização registrada com sucesso." });
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ message: "Erro ao registrar visualização" });
        }
    }

    public async getTopViewed(request: FastifyRequest, reply: FastifyReply) {
        try {
            const top = await houseService.getMostViewedHouses();
            return reply.send(top);
        } catch (error) {
            reply.status(500).send({ message: "Erro interno ao buscar casas mais vistas." });
        }
    }

    // Método para obter as casas mais favoritas (top 10)
    async getTop10MostFavoritedHouses(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Chama o serviço para pegar as 10 casas mais favoritas
            const mostFavoritedHouses = await houseService.getTop10MostFavoritedHouses();

            // Retorna as casas mais favoritas com sucesso
            return reply.send(mostFavoritedHouses);
        } catch (error) {
            console.error(error);
            reply.status(500).send({ message: 'Erro ao buscar casas mais favoritas.' });
        }
    }


}
export const houseController = new HouseController();
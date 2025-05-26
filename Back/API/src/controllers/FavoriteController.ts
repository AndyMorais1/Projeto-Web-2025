import { FastifyRequest, FastifyReply } from "fastify";
import { favoriteService } from "../services/FavoriteService";

class FavoriteController {
    async toggle(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request.user as any).id;
        const { houseId } = request.body as { houseId: string };

        const result = await favoriteService.toggleFavorite(userId, houseId);
        reply.send(result);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const userId = (request.user as any).id;
        const favorites = await favoriteService.getUserFavorites(userId);
        reply.send(favorites.map((fav) => fav.house));
    }
}

export const favoriteController = new FavoriteController();

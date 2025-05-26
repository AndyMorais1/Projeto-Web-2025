import { FastifyInstance } from "fastify";
import { favoriteController } from "../controllers/FavoriteController";

export async function favoriteRoutes(server: FastifyInstance) {
    server.post("/favorites/toggle", { preHandler: [server.authenticate] }, favoriteController.toggle);
    server.get("/favorites", { preHandler: [server.authenticate] }, favoriteController.list);
}

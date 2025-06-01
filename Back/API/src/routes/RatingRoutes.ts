import { FastifyInstance } from "fastify";
import { RatingController } from "../controllers/RatingController";

const controller = new RatingController();

export async function ratingRoutes(fastify: FastifyInstance) {
    fastify.post("/ratings", { preHandler: [fastify.authenticate] }, controller.rateAgent);
    fastify.get("/ratings/agent/:agentId", controller.getRatingsForAgent);
    fastify.get("/ratings/agent/:agentId/summary", controller.getAgentRatingSummary);
}

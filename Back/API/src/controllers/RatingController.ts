import { FastifyRequest, FastifyReply } from "fastify";
import { ratingService } from "../services/RatingService";

export class RatingController {
    async rateAgent(request: FastifyRequest, reply: FastifyReply) {
        const { agentId, score, comment } = request.body as { agentId: string, score: number, comment?: string };
        const clientId = (request.user as any).id;

        try {
            const rating = await ratingService.createRating({ agentId, clientId, score, comment });
            return reply.status(201).send(rating);
        } catch (error:any) {
            return reply.status(400).send({ error: error.message });
        }
    }

    async getRatingsForAgent(request: FastifyRequest, reply: FastifyReply) {
        const { agentId } = request.params as { agentId: string };
        const ratings = await ratingService.getAgentRatings(agentId);
        return reply.send(ratings);
    }

    async getAgentRatingSummary(request: FastifyRequest, reply: FastifyReply) {
        const { agentId } = request.params as { agentId: string };
        const summary = await ratingService.getAgentAverage(agentId);
        return reply.send(summary);
    }
}

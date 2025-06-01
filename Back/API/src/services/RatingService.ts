import { prisma } from '../prisma/prisma';

export const ratingService = {
    async createRating(data: { agentId: string, clientId: string, score: number, comment?: string }) {
        if (data.score < 1 || data.score > 5) {
            throw new Error("A pontuação deve estar entre 1 e 5.");
        }

        return await prisma.rating.create({ data });
    },

    async getAgentRatings(agentId: string) {
        return await prisma.rating.findMany({
            where: { agentId },
            include: { client: true }
        });
    },

    async getAgentAverage(agentId: string) {
        const result = await prisma.rating.aggregate({
            where: { agentId },
            _avg: { score: true },
            _count: { score: true }
        });
        return {
            average: result._avg.score ?? 0,
            totalRatings: result._count.score
        };
    }
};

// src/controllers/visit.controller.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { VisitService } from '../services/VisitsService';

const visitService = new VisitService();

export class VisitController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await visitService.createVisit(request.body);
            return reply.status(201).send(result);
        } catch (error) {
            console.error(error);
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const result = await visitService.getVisitById({ id: request.params.id });
            if (!result) return reply.status(404).send({ error: 'Visita não encontrada' });
            return reply.send(result);
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async getByClient(request: FastifyRequest<{ Params: { clientId: string } }>, reply: FastifyReply) {
        try {
            const result = await visitService.getVisitsByClient(request.params.clientId);
            return reply.send(result);
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async getByHouse(request: FastifyRequest<{ Params: { houseId: string } }>, reply: FastifyReply) {
        try {
            const result = await visitService.getVisitsByHouse(request.params.houseId);
            return reply.send(result);
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async updateStatus(request: FastifyRequest, reply: FastifyReply) {
        try {
            const result = await visitService.updateVisitStatus(request.body);
            return reply.send(result);
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            await visitService.deleteVisit({ id: request.params.id });
            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }

    async getByAgent(request: FastifyRequest<{ Params: { agentId: string } }>, reply: FastifyReply) {
        try {
            const result = await visitService.getVisitsByAgent(request.params.agentId);
            return reply.send(result);
        } catch (error) {
            return reply.status(400).send({ error: (error as Error).message });
        }
    }
}

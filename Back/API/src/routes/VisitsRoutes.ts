// src/routes/visit.routes.ts
import { FastifyInstance } from 'fastify';
import { VisitController } from '../controllers/VisitsController';

const controller = new VisitController();

export async function visitRoutes(fastify: FastifyInstance) {
    fastify.post('/visits', controller.create.bind(controller));
    fastify.get('/visits/:id', controller.getById.bind(controller));
    fastify.get('/visits/client/:clientId', controller.getByClient.bind(controller));
    fastify.get('/visits/house/:houseId', controller.getByHouse.bind(controller));
    fastify.put('/visits/status', controller.updateStatus.bind(controller));
    fastify.delete('/visits/:id', controller.delete.bind(controller));
    fastify.get('/visits/agent/:agentId', controller.getByAgent.bind(controller));
}

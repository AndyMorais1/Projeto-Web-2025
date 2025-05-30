// src/controllers/HouseTypeController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { houseTypeService } from '../services/HouseTypeService';
import { CreateHouseTypeSchema, UpdateHouseTypeSchema } from '../schema/HouseTypeSchema';

class HouseTypeController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = CreateHouseTypeSchema.parse(request.body);
            const type = await houseTypeService.create(data);
            reply.status(201).send(type);
        } catch (error) {
            reply.status(400).send({ message: (error as Error).message });
        }
    }

    async findAll(_: FastifyRequest, reply: FastifyReply) {
        const types = await houseTypeService.findAll();
        reply.send(types);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const type = await houseTypeService.findById(id);
        if (!type) return reply.status(404).send({ message: 'Tipo de casa não encontrado' });
        reply.send(type);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = request.params as { id: string };
            const data = UpdateHouseTypeSchema.parse(request.body);
            const updated = await houseTypeService.update(id, data);
            reply.send(updated);
        } catch (error) {
            reply.status(400).send({ message: (error as Error).message });
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await houseTypeService.delete(id);
        reply.send({ message: 'Tipo de casa deletado com sucesso.' });
    }
}

export const houseTypeController = new HouseTypeController();

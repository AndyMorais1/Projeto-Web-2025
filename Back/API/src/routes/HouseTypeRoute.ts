// src/routes/HouseTypeRouter.ts
import { FastifyInstance } from 'fastify';
import { houseTypeController } from '../controllers/HouseTypeController';

export async function houseTypeRoutes(app: FastifyInstance) {
    app.post('/house-types', houseTypeController.create);
    app.get('/house-types', houseTypeController.findAll);
    app.get('/house-types/:id', houseTypeController.findById);
    app.put('/house-types/:id', houseTypeController.update);
    app.delete('/house-types/:id', houseTypeController.delete);
}

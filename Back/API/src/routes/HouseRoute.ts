import { FastifyInstance } from "fastify";
import { houseController } from "../controllers/HouseController";

async function houseRoutes(fastify:FastifyInstance){
    fastify.post("/houses", houseController.createHouse);
    fastify.get("/houses", houseController.getHouses);
    fastify.get("/houses/:id", houseController.getHouseById);
    fastify.put("/houses/:id", houseController.updateHouse);
    fastify.delete("/houses/:id", houseController.deleteHouse);
    fastify.get("/agents/:id/houses", houseController.getHousesByAgent);
}
export { houseRoutes };
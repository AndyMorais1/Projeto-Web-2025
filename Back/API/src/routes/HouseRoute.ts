import { FastifyInstance } from "fastify";
import { houseController } from "../controllers/HouseController";

async function houseRoutes(fastify:FastifyInstance){
    fastify.post("/houses", houseController.createHouse);
    fastify.get("/houses", houseController.getHouses);
    fastify.get("/houses/:id", houseController.getHouseById);
    fastify.put("/houses/:id", houseController.updateHouse);
    fastify.delete("/houses/:id", houseController.deleteHouse);
    fastify.get("/agents/:id/houses", houseController.getHousesByAgent);
    fastify.post("/houses/:id/view", houseController.registerView);
    fastify.get("/houses/top-views", houseController.getTopViewed);
    fastify.get("/houses/most-favorited", houseController.getTop10MostFavoritedHouses);

}
export { houseRoutes };
import { userController } from "../controllers/UserController";
import { FastifyInstance } from "fastify";

async function userRoutes(fastify: FastifyInstance) {
    fastify.post("/users", userController.createUser);
    fastify.get("/users/:id", userController.getUserById);
    fastify.put("/users/:id", userController.updateUser);
    fastify.delete("/users/:id", { preHandler: [fastify.authenticate] }, userController.deleteUser);
    fastify.get("/users",  userController.getAllUsers);
    fastify.get("/users/verify-email", userController.verifyEmail);
    fastify.post("/users/login", userController.login);
    fastify.post("/users/login/admin", userController.loginAdmin);
    fastify.put("/users/agent/:id", { preHandler: [fastify.authenticate] },userController.updateAgentStatus);

}
export { userRoutes };
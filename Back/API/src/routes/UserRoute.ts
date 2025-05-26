import { userController } from "../controllers/UserController";
import { FastifyInstance } from "fastify";

async function userRoutes(fastify: FastifyInstance) {

    fastify.post("/users", userController.createUser); // POST /users
    fastify.get("/:id", userController.getUserById); // GET /users/:id
    fastify.put("/:id", userController.updateUser); // PUT /users/:id
    fastify.delete("/:id", { preHandler: [fastify.authenticate] }, userController.deleteUser); // DELETE /users/:id
    fastify.get("/", { preHandler: [fastify.authenticate] }, userController.getAllUsers); // GET /users
    fastify.get("/verify-email", userController.verifyEmail); // GET /users/verify-email
    fastify.post("/login", userController.login); // POST /users/login
    fastify.post("/login/admin", userController.loginAdmin); // POST /users/login/admin
    fastify.put("/agent/:id", { preHandler: [fastify.authenticate] }, userController.updateAgentStatus); // PUT /users/agent/:id
}
export { userRoutes };

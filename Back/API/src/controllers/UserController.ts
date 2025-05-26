import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/UserService";
import { CreateUserSchema } from "../schema/UserSchema";
import { UpdateUserSchema } from "../schema/UserSchema";
import { LoginSchema } from "../schema/UserSchema";
import { LoginAdminSchema } from "../schema/UserSchema";
import { LoginResponseSchema } from "../schema/UserSchema";
import { verifyPassword } from "../utils/hash";
import { server } from "../app";

class UserController {
    public async createUser(request: FastifyRequest, reply: FastifyReply) {
        try {
            const parsedData = CreateUserSchema.parse(request.body);

            const user = await userService.createUser(parsedData);

            reply.status(201).send(user);
        } catch (error) {
            if (error instanceof Error) {
                reply.status(400).send({ message: error.message });
            } else {
                reply.status(500).send({ message: "Erro interno no servidor" });
            }
        }
    }
    public async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;

        const user = await userService.getUserById(id);

        if (!user) {
            reply.status(404).send({ message: "Usuário não encontrado" });
            return;
        }

        reply.send(user);
    }
    public async updateUser(
        request: FastifyRequest<{ Params: { id: string }; Body: UpdateUserSchema }>,
        reply: FastifyReply
    ) {
        const { id } = request.params;

        try {
            const parsedData = UpdateUserSchema.parse(request.body);

            const user = await userService.updateUser(id, parsedData);

            reply.send(user);
        } catch (error) {
            if (error instanceof Error) {
                reply.status(400).send({ message: error.message });
            } else {
                reply.status(500).send({ message: "Erro interno no servidor" });
            }
        }
    }


    public async updateAgentStatus (request:FastifyRequest<{Params:{id:string}}>, reply: FastifyReply) {
        const { id } = request.params;
        const user = await userService.updateAgentStatus(id);
        if (!user) {
            reply.status(404).send({ message: "Usuário não encontrado" });
            return;
        }
        reply.send(user);
    }

    public async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;

        const user = await userService.getUserById(id);

        if (!user) {
            reply.status(404).send({ message: "Usuário não encontrado" });
            return;
        } else {
            await userService.deleteUser(id);
            reply.send({ message: "Usuário deletado com sucesso" });
        }
    }
    public async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        const users = await userService.getAllUsers();

        reply.send(users);
    }

    public async verifyEmail(request: FastifyRequest, reply: FastifyReply) {
        const { token } = request.query as { token: string };

        const isVerified = await userService.verifyEmail(token);

        if (!isVerified) {
            reply.status(400).send({ message: 'Token inválido ou expirado' });
            return;
        }
        reply.redirect('/public/emailverify.html');

    }

    //login
    public async login(
        request: FastifyRequest<{ Body: LoginSchema }>,
        reply: FastifyReply
    ) {
        const parsedData = LoginSchema.parse(request.body);

        // 1. Verificar se o usuário existe pelo email
        const user = await userService.findUserByEmail(parsedData.email);

        if (!user) {
            return reply.status(401).send({ message: 'Usuário não encontrado' });
        }

        // 2. Verificar se o usuário tem um status válido
        if (user.status === 'PENDING') {
            return reply.status(403).send({ message: 'Acesso negado. Status do usuário é PENDING.' });
        }

        // 3. Verificar se o usuário é agente ou cliente
        if (user.role !== 'CLIENT' && user.role !== 'AGENT') {
            return reply.status(403).send({ message: 'Acesso negado. Apenas clientes ou agentes podem acessar.' });
        }

        // 4. Verificar se a senha fornecida é correta
        const isPasswordCorrect = verifyPassword({
            candidatePassword: parsedData.password,
            salt: user.salt,
            hash: user.password,
        });

        if (isPasswordCorrect) {
            const { password, salt, ...rest } = user;  // Remover dados sensíveis
            // 5. Gerar o token
            const token = request.server.jwt.sign({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }, { expiresIn: '5h' });

            return { token };
        }

        // 6. Se a senha estiver incorreta
        return reply.status(401).send({ message: 'Senha incorreta' });
    }


    //login admin
    public async loginAdmin(
        request: FastifyRequest<{ Body: LoginSchema }>,
        reply: FastifyReply
    ) {
        const parsedData = LoginSchema.parse(request.body);

        // 1. Verificar se o usuário existe pelo email
        const user = await userService.findUserByEmail(parsedData.email);

        if (!user) {
            return reply.status(401).send({ message: 'Usuário não encontrado' });
        }

        // 2. Verificar se o usuário é admin
        if (user.role !== 'ADMIN'&& user.status !== 'ACTIVE') {
            return reply.status(403).send({ message: 'Acesso negado. Apenas admins podem acessar.' });
        }

        // 3. Verificar se a senha fornecida é correta
        const isPasswordCorrect = verifyPassword({
            candidatePassword: parsedData.password,
            salt: user.salt,
            hash: user.password,
        });

        if (!isPasswordCorrect) {
            return reply.status(401).send({ message: 'Senha incorreta' });
        }

        // 4. Gerar o token JWT sem os dados sensíveis (senha e salt)
        const { password, salt, ...rest } = user;
        const token = request.server.jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        }, { expiresIn: '5h' });


        return { token };
    }

}



export const userController = new UserController();
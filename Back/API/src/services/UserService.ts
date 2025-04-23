import { User } from '@prisma/client';
import { prisma } from '../prisma/prisma';
import { hashPassword } from '../utils/hash';
import { verifyPassword } from '../utils/hash';
import { CreateUserSchema } from '../schema/UserSchema';
import { UpdateUserSchema } from '../schema/UserSchema';
import { generateVerificationToken } from '../utils/generateToken';
import {sendApprovedAgentEmail, sendVerificationEmail} from '../services/EmailService';
import { ResponseUserSchema } from '../schema/UserSchema';
import { sendWaitAgentEmail } from '../services/EmailService';
class UserService {

    public async createUser(data: CreateUserSchema): Promise<User> {
        const { salt, hash } = hashPassword(data.password);
        const verificationToken = generateVerificationToken();
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                phone: data.phone ?? '',
                role: data.role,
                emailVerificationToken: verificationToken,
                salt,
                status: data.role === 'ADMIN' ? 'ACTIVE' : undefined, // Define status para ADMIN
            },
        });

        if (user.role === 'CLIENT') {
            await sendVerificationEmail(user.email ?? '', verificationToken);
            return user;
        }

        if (user.role === 'AGENT') {
            await sendWaitAgentEmail(user.email ?? '');
            return user;
        }

        if (user.role === 'ADMIN') {
            return user;
        }
        return user;
    }


    public async getUserById(id: string): Promise<ResponseUserSchema | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                photo: true,
                Houses: true,
            },
        });
        return user;
    }
    public async updateUser(id: string, data: UpdateUserSchema) {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role,
                status: data.status,
            },
        });
        return user;
    }

    public async updateAgentStatus(id: string) {
        try {
            const user = await prisma.user.update({
                where: { id },
                data: { status: "ACTIVE" },
            });

            if (user?.email) {
                await sendApprovedAgentEmail(user.email);
            }

            return user;
        } catch (error) {
            console.error("Erro ao atualizar status do agente:", error);
            throw error;
        }
    }


    public async deleteUser(id: string) {
        const user = await this.getUserById(id);
        await prisma.house.deleteMany({
            where: {
                agentId: id,
            },
        });
        await prisma.user.delete({
            where: {
                id,
            },
        });

        return { message: "Usuário e casas vinculadas deletados com sucesso." };
    }

    public async getAllUsers(): Promise<ResponseUserSchema[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                photo: true,
                Houses: true,
                status: true,
            },
        });
        return users;
    }

    public async verifyEmail(token: string): Promise<boolean> {
        if (!token || token.trim() === '') {
            return false;
        }

        // Busca o usuário pelo token
        const user = await prisma.user.findFirst({
            where: { emailVerificationToken: token },
        });

        if (!user) return false;

        // Atualiza usuário para confirmar a verificação do email
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isEmailVerified: true,
                emailVerificationToken: null,
                status: 'ACTIVE',
            },
        });
        console.log('Email verificado com sucesso!');
        return true;
    }

    public async findUserByEmail(email: string) {
        return prisma.user.findFirst({
            where: {
                email,
            },
        });
    }

}


export const userService = new UserService();
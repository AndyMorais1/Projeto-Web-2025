import {User} from '@prisma/client';
import {prisma} from '../prisma/prisma';
import {hashPassword} from '../utils/hash';
import {verifyPassword} from '../utils/hash';
import {CreateUserSchema} from '../schema/UserSchema';
import {UpdateUserSchema} from '../schema/UserSchema';
import {generateVerificationToken} from '../utils/generateToken';
import {sendApprovedAgentEmail, sendVerificationEmail} from '../services/EmailService';
import {ResponseUserSchema} from '../schema/UserSchema';
import {sendWaitAgentEmail} from '../services/EmailService';

class UserService {

    public async createUser(data: CreateUserSchema): Promise<User> {
        const {salt, hash} = hashPassword(data.password);
        const verificationToken = generateVerificationToken();

        // Segurança: só permitir criação de superadmin se não existir nenhum ainda
        if (data.isSuperAdmin) {
            const existingSuperAdmin = await prisma.user.findFirst({
                where: {isSuperAdmin: true},
            });

            if (existingSuperAdmin) {
                throw new Error('Já existe um superadministrador');
            }
        }

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hash,
                phone: data.phone ?? '',
                role: data.role,
                isSuperAdmin: data.isSuperAdmin ?? false,
                emailVerificationToken: verificationToken,
                salt,
                status: data.role === 'ADMIN' ? 'ACTIVE' : undefined,
            },
        });

        if (user.role === 'CLIENT') {
            await sendVerificationEmail(user.email ?? '', verificationToken);
        } else if (user.role === 'AGENT') {
            await sendWaitAgentEmail(user.email ?? '');
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
                status: true,
                createdAt: true,
                updatedAt: true,
                isSuperAdmin: true,

            },
        });
        return user;
    }

    public async updateUser(id: string, data: UpdateUserSchema) {

        if (data.isSuperAdmin) {
            const requestingUser = await prisma.user.findUnique({where: {id}});

            if (!requestingUser?.isSuperAdmin) {
                throw new Error("Apenas um superadmin pode promover outro superadmin.");
            }
        }


        if (data.photo && !this.isValidUrl(data.photo)) {
            throw new Error("URL de foto inválida");
        }

        if (data.newPassword && data.currentPassword) {
            await this.updatePassword(id, data.currentPassword, data.newPassword);
            console.log("senha atualizada");
        }

        const user = await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role,
                status: data.status,
                photo: data.photo || null,
                isSuperAdmin: data.isSuperAdmin, // novo campo
            },
        });

        return user;
    }

    public async updatePassword(userId: string, currentPassword: string, newPassword: string) {
        const user = await prisma.user.findUnique({where: {id: userId}});
        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        const isValid = verifyPassword({
            candidatePassword: currentPassword,
            hash: user.password,
            salt: user.salt,
        });

        if (!isValid) {
            throw new Error("Senha atual incorreta");
        }

        const {hash, salt} = hashPassword(newPassword);

        await prisma.user.update({
            where: {id: userId},
            data: {
                password: hash,
                salt: salt,
            },
        });
    }


    private isValidUrl(url: string): boolean {
        const pattern = new RegExp('^(https?:\\/\\/(?:www\\.)?[\\w-]+(?:\\.[\\w-]+)+(/[^\\s]*)?)$', 'i');
        return pattern.test(url);
    }

    public async updateAgentStatus(id: string) {
        try {
            const user = await prisma.user.update({
                where: {id},
                data: {status: "ACTIVE"},
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
        try {
            const user = await this.getUserById(id);

            if (!user) {
                return {
                    statusCode: 404,
                    message: "Usuário não encontrado.",
                };
            }

            await prisma.$transaction(async (tx) => {
                const houses = await tx.house.findMany({where: {agentId: id}});

                for (const house of houses) {
                    await tx.visit.deleteMany({where: {houseId: house.id}}); // CORRETO
                }

                await tx.house.deleteMany({where: {agentId: id}});
                await tx.user.delete({where: {id}});
            });

            return {
                statusCode: 200,
                message: "Usuário e casas vinculadas deletados com sucesso.",
            };
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);

            return {
                statusCode: 500,
                message: "Erro interno ao excluir usuário.",
                error: error instanceof Error ? error.message : String(error),
            };
        }
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
                createdAt: true,
                updatedAt: true,
                isSuperAdmin: true, // novo campo
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
            where: {emailVerificationToken: token},
        });

        if (!user) return false;

        // Atualiza usuário para confirmar a verificação do email
        await prisma.user.update({
            where: {id: user.id},
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
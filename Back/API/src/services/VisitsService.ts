// src/services/visit.service.ts
import {PrismaClient} from '@prisma/client';
import {
    sendVisitConfirmationToClient,
    sendVisitRejectedEmailToClient,
    sendVisitNotificationToOwner,
} from '../services/EmailService';
import {
    sendVisitAcceptedEmailToClient,
    sendVisitConfirmationNoticeToAgent,
} from '../services/EmailService';
import {
    CreateVisitSchema,
    UpdateVisitStatusSchema,
    VisitIdSchema,
} from '../schema/VisitsSchema';

const prisma = new PrismaClient();

export class VisitService {

    async createVisit(data: unknown) {
        try {
            const parsed = CreateVisitSchema.parse(data);

            // 1. Verificar se a casa existe
            const house = await prisma.house.findUnique({
                where: {id: parsed.houseId},
                include: {agent: true},
            });

            if (!house) {
                throw new Error('Imóvel não encontrado.');
            }

            // 2. Verificar se o cliente existe
            const client = await prisma.user.findUnique({
                where: {id: parsed.clientId},
            });

            if (!client) {
                throw new Error('Cliente não encontrado.');
            }

            // 3. Verificar se o agente associado existe (reforço de segurança)
            if (!house.agent) {
                throw new Error('Imóvel não possui um agente associado.');
            }

            // 4. Criar a visita
            const visit = await prisma.visit.create({
                data: {
                    clientId: parsed.clientId,
                    houseId: parsed.houseId,
                    date: parsed.date,
                    message: parsed.message,
                },
                include: {
                    client: true,
                    house: {
                        include: {agent: true},
                    },
                },
            });

            // 5. Enviar e-mail ao cliente
            await sendVisitConfirmationToClient(
                visit.client.email,
                visit.house.title,
                visit.date,
            );

            // 6. Enviar e-mail ao agente
            await sendVisitNotificationToOwner(
                visit.house.agent.email,
                visit.client.name,
                visit.house.title,
                visit.date,
            );

            return visit;
        } catch (error) {
            console.error('Erro ao criar visita:', error);
            throw new Error('Erro ao criar a visita: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
        }
    }

    async getVisitById(data: unknown) {
        try {
            const parsed = VisitIdSchema.parse(data);

            return await prisma.visit.findUnique({
                where: {id: parsed.id},
                include: {
                    client: {select: {id: true, name: true, email: true}},
                    house: {select: {id: true, title: true}},
                },
            });
        } catch (error) {
            console.error('Erro ao buscar visita por ID:', error);
            throw new Error('Erro ao buscar a visita');
        }
    }

    async getVisitsByClient(clientId: string) {
        try {
            return await prisma.visit.findMany({
                where: {clientId},
                orderBy: {date: 'asc'},
                include: {
                    house: {select: {id: true, title: true, location: true}},
                },
            });
        } catch (error) {
            console.error('Erro ao listar visitas do cliente:', error);
            throw new Error('Erro ao listar visitas do cliente');
        }
    }

    async getVisitsByHouse(houseId: string) {
        try {
            return await prisma.visit.findMany({
                where: {houseId},
                orderBy: {date: 'asc'},
                include: {
                    client: {select: {id: true, name: true, email: true}},
                },
            });
        } catch (error) {
            console.error('Erro ao listar visitas da casa:', error);
            throw new Error('Erro ao listar visitas da casa');
        }
    }

    async updateVisitStatus(data: unknown) {
        try {
            const parsed = UpdateVisitStatusSchema.parse(data);

            const visit = await prisma.visit.update({
                where: { id: parsed.visitId },
                data: { status: parsed.status },
                include: {
                    client: true,
                    house: {
                        include: { agent: true },
                    },
                },
            });

            if (parsed.status === 'CONFIRMED') {
                // Email para cliente
                await sendVisitAcceptedEmailToClient(
                    visit.client.email,
                    visit.house.title,
                    visit.date
                );

                // Email para agente
                await sendVisitConfirmationNoticeToAgent(
                    visit.house.agent.email,
                    visit.client.name,
                    visit.house.title,
                    visit.date
                );
            }

            if (parsed.status === 'REJECTED') {
                await sendVisitRejectedEmailToClient(
                    visit.client.email,
                    visit.house.title,
                    visit.date
                );
            }

            return visit;
        } catch (error) {
            console.error('Erro ao atualizar status da visita:', error);
            throw new Error('Erro ao atualizar o status da visita');
        }
    }


    async deleteVisit(data: unknown) {
        try {
            const parsed = VisitIdSchema.parse(data);

            return await prisma.visit.delete({
                where: {id: parsed.id},
            });
        } catch (error) {
            console.error('Erro ao deletar visita:', error);
            throw new Error('Erro ao deletar a visita');
        }
    }

    async getVisitsByAgent(agentId: string) {
        try {
            return await prisma.visit.findMany({
                where: {
                    house: {
                        agentId: agentId,
                    },
                },
                orderBy: { date: 'asc' },
                include: {
                    client: { select: { id: true, name: true, email: true } },
                    house: { select: { id: true, title: true } },
                },
            });
        } catch (error) {
            console.error('Erro ao listar visitas do agente:', error);
            throw new Error('Erro ao listar visitas do agente');
        }
    }

}

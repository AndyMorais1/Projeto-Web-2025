import {House} from '@prisma/client';
import {prisma} from '../prisma/prisma';
import {CreateHouseSchema} from '../schema/HouseSchema';
import {UpdateHouseSchema} from '../schema/HouseSchema';
import {getCoordinates} from '../utils/getCoordinates';

class HouseService {
    public async createHouse(data: CreateHouseSchema): Promise<House> {
        try {
            // Obter coordenadas da localização
            const coordinates = await getCoordinates(data.location.address, data.location.city, data.location.zipCode);

            console.log("Coordenadas que vão ser usadas:", {
                address: data.location.address,
                city: data.location.city,
                zipCode: data.location.zipCode,
                coordinates
            });

            if (!coordinates) {
                throw new Error("Não foi possível obter as coordenadas para a localização.");
            }

            const {latitude, longitude} = coordinates;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            // Verificar se o agente existe
            const agentExists = await prisma.user.findUnique({
                where: {id: data.agentId},
            });

            if (!agentExists) {
                throw new Error(`Agente com ID ${data.agentId} não encontrado.`);
            }

            // Verificar se já existe uma localização com esses dados
            const existingLocation = await prisma.location.findFirst({
                where: {
                    address: data.location.address,
                    city: data.location.city,
                    zipCode: data.location.zipCode,
                },
            });

            if (existingLocation) {
                console.log("Já existe uma casa cadastrada neste endereço.");
                throw new Error("Já existe uma casa cadastrada neste endereço.");
            }

            // Criar a localização com latitude e longitude
            const location = await prisma.location.create({
                data: {
                    address: data.location.address,
                    city: data.location.city,
                    zipCode: data.location.zipCode,
                    latitude,
                    longitude,
                },
            });
            console.log("Localização criada:", location);

            // Criar detalhes da casa
            const details = await prisma.houseDetails.create({
                data: data.details,
            });
            console.log("Detalhes da casa criados:", details);

            // Criar a casa
            const house = await prisma.house.create({
                data: {
                    type: data.type,
                    agentId: data.agentId,
                    locationId: location.id,
                    title: data.title,
                    description: data.description,
                    images: data.images,
                    detailsId: details.id,
                    price: data.price,
                },
            });

            console.log("Casa criada:", house);
            return house;
        } catch (error) {
            console.error("Erro ao criar casa:", error);
            throw new Error(`Erro ao criar casa: ${(error as Error).message}`);
        }
    }


    public async getHouseById(id: string): Promise<House | null> {
        return prisma.house.findUnique({
            where: {
                id,
            },
            include: {
                location: true,
                details: true,
            },
        });
    }


    public async getHouses(): Promise<House[]> {
        return prisma.house.findMany({
            include: {
                location: true,
                details: true,
            },
        });
    }

    public async updateHouse(id: string, data: UpdateHouseSchema): Promise<House> {
        const house = await prisma.house.findUnique({
            where: {
                id,
            },
        });

        if (!house) {
            throw new Error("Casa não encontrada");
        }

        // Atualizar localização
        const location = await prisma.location.update({
            where: {
                id: house.locationId,
            },
            data: data.location || {},
        });

        // Atualizar detalhes
        const details = await prisma.houseDetails.update({
            where: {
                id: house.detailsId,
            },
            data: data.details || {},
        });

        // Atualizar a casa
        return prisma.house.update({
            where: {
                id,
            },
            data: {
                type: data.type,
                agentId: data.agentId,
                locationId: location.id,
                title: data.title,
                description: data.description,
                images: data.images,
                detailsId: details.id,
                price: data.price,
            },
        });
    }

    public async deleteHouse(id: string) {
        const house = await this.getHouseById(id);
        if (!house) {
            throw new Error(`Casa não encontrada!`);
        }

        // Deleta a casa primeiro para evitar conflitos de chave estrangeira
        await prisma.house.delete({
            where: { id },
        });

        // Depois, remove os dados relacionados
        await prisma.houseDetails.delete({
            where: { id: house.detailsId },
        });

        await prisma.location.delete({
            where: { id: house.locationId },
        });

        return { message: "Casa deletada com sucesso." };
    }


    public async getHousesByAgent(agentId: string): Promise<House[]> {
        return prisma.house.findMany({
            where: {
                agentId,
            },
            include: {
                location: true,
                details: true,
            },
            //select:{},
        });
    }

}

export const houseService = new HouseService();
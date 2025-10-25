// src/services/HouseTypeService.ts
import { prisma } from '../prisma/prisma';
import { CreateHouseTypeInput, UpdateHouseTypeInput } from '../schema/HouseTypeSchema';

class HouseTypeService {
    async create(data: CreateHouseTypeInput) {
        return prisma.houseType.create({ data });
    }

    async findAll() {
        return prisma.houseType.findMany();
    }

    async findById(id: string) {
        return prisma.houseType.findUnique({ where: { id } });
    }

    async update(id: string, data: UpdateHouseTypeInput) {
        return prisma.houseType.update({
            where: { id },
            data,
        });
    }

    public async delete(id: string): Promise<{ success: boolean; message: string }> {
        try {
            // Obter casas associadas ao tipo
            const houses = await prisma.house.findMany({
                where: { typeId: id },
                select: { id: true, locationId: true, detailsId: true },
            });

            // Transação para deletar tudo de forma segura
            await prisma.$transaction(async (tx) => {
                // 1. Deletar casas
                for (const house of houses) {
                    await tx.house.delete({ where: { id: house.id } });
                    await tx.houseDetails.delete({ where: { id: house.detailsId } });
                    await tx.location.delete({ where: { id: house.locationId } });
                }

                // 2. Deletar o tipo de casa
                await tx.houseType.delete({ where: { id } });
            });

            return {
                success: true,
                message: `Tipo de casa e ${houses.length} casa(s) associada(s) deletadas com sucesso.`,
            };
        } catch (error: any) {
            console.error("Erro ao deletar tipo de casa:", error);
            return {
                success: false,
                message: error?.message || "Erro interno ao deletar tipo de casa.",
            };
        }
    }

}

export const houseTypeService = new HouseTypeService();

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

    async delete(id: string) {
        return prisma.houseType.delete({ where: { id } });
    }
}

export const houseTypeService = new HouseTypeService();

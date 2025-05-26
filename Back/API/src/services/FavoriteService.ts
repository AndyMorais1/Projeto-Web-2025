import { prisma } from '../prisma/prisma';

class FavoriteService {
    async toggleFavorite(userId: string, houseId: string) {
        const existing = await prisma.favorite.findUnique({
            where: {
                userId_houseId: { userId, houseId },
            },
        });

        if (existing) {
            await prisma.favorite.delete({
                where: { userId_houseId: { userId, houseId } },
            });
            return { removed: true };
        } else {
            await prisma.favorite.create({
                data: { userId, houseId },
            });
            return { added: true };
        }
    }

    async getUserFavorites(userId: string) {
        return prisma.favorite.findMany({
            where: { userId },
            include: {
                house: {
                    include: {
                        location: true, // Incluir a localização da casa
                        details: true,  // Incluir os detalhes da casa
                    },
                },
            },
        });
    }
}

export const favoriteService = new FavoriteService();

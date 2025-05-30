// src/prisma/house-seed.ts

import { PrismaClient, Role } from "@prisma/client";
import { Faker, pt_PT, en } from "@faker-js/faker";
import { getCoordinates } from "../utils/getCoordinates";
import dotenv from "dotenv";

dotenv.config();

// npx ts-node src/prisma/house-seed.ts
const prisma = new PrismaClient();
const faker = new Faker({ locale: [pt_PT, en] });

const distritosDePortugal = [
    "Aveiro", "Beja", "Braga", "Bragança", "Castelo Branco", "Coimbra",
    "Évora", "Faro", "Guarda", "Leiria", "Lisboa", "Madeira",
    "Portalegre", "Porto", "Santarém", "Setúbal", "Viana do Castelo",
    "Vila Real", "Viseu", "Açores"
];

// Imagens reais de casas
const houseImages = [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1599423300746-b62533397364",
    "https://images.unsplash.com/photo-1572120360610-d971b9b6392d",
    "https://images.unsplash.com/photo-1600585154513-0546130a6599",
    "https://images.unsplash.com/photo-1599423300743-229a2c1f5b94",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1600047509061-3c4c3f4d63a7"
];

// Sorteia 3 imagens aleatórias
function getRandomHouseImages(): string[] {
    return faker.helpers.arrayElements(houseImages, 3);
}

// Gera uma data aleatória entre 01/01/2025 e agora
function getRandomDateIn2025(): Date {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date();
    return faker.date.between({ from: start, to: end });
}

async function main() {
    const agents = await prisma.user.findMany({
        where: { role: Role.AGENT },
    });

    if (agents.length === 0) {
        throw new Error("Nenhum agente encontrado para associar casas.");
    }

    const types = await prisma.houseType.findMany();

    if (types.length === 0) {
        throw new Error("Nenhum tipo de casa cadastrado. Cadastre pelo menos um tipo antes.");
    }

    const housePromises = Array.from({ length: 10 }).map(async () => {
        const agent = faker.helpers.arrayElement(agents);
        const type = faker.helpers.arrayElement(types);

        const address = faker.location.streetAddress();
        const city = faker.helpers.arrayElement(distritosDePortugal);
        const zipCode = faker.location.zipCode();

        const coordinates = await getCoordinates(address, city, zipCode);
        if (!coordinates) {
            console.warn("⚠ Coordenadas não encontradas, casa ignorada.");
            return;
        }

        const location = await prisma.location.create({
            data: {
                address,
                city,
                zipCode,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
            },
        });

        const details = await prisma.houseDetails.create({
            data: {
                rooms: faker.number.int({ min: 1, max: 6 }),
                bathrooms: faker.number.int({ min: 1, max: 4 }),
                area: faker.number.int({ min: 50, max: 300 }),
            },
        });

        await prisma.house.create({
            data: {
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                price: faker.number.float({ min: 100000, max: 1000000, fractionDigits: 2 }),
                views: faker.number.int({ min: 100, max: 10000 }),
                agentId: agent.id,
                typeId: type.id,
                locationId: location.id,
                detailsId: details.id,
                images: getRandomHouseImages(),
                createdAt: getRandomDateIn2025(),
            },
        });
    });

    await Promise.all(housePromises);
    console.log("✅ Casas criadas com sucesso.");
}

main()
    .catch((e) => {
        console.error("❌ Erro no seed de casas:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

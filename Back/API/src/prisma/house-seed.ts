import { PrismaClient, Role } from "@prisma/client";
import { Faker, pt_PT, en } from "@faker-js/faker";
import { getCoordinates } from "../utils/getCoordinates"; // ajuste o caminho conforme a localização real
import dotenv from "dotenv";

dotenv.config();


// npx ts-node src/prisma/house-seed.ts
// gera 10 casas aleatorios

const prisma = new PrismaClient();
const faker = new Faker({ locale: [pt_PT, en] });

function getRandomDateIn2025(): Date {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
    const agents = await prisma.user.findMany({
        where: { role: Role.AGENT },
    });

    if (agents.length === 0) {
        throw new Error(" Nenhum agente encontrado para associar casas.");
    }

    const housePromises = Array.from({ length: 10 }).map(async () => {
        const agent = agents[Math.floor(Math.random() * agents.length)];

        // Gera endereço de Portugal
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        const zipCode = faker.location.zipCode();

        // Obtém coordenadas reais com base no endereço
        const coordinates = await getCoordinates(address, city, zipCode);

        // Se não conseguir coordenadas, pula esta casa
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
                type: faker.helpers.arrayElement(["APARTMENT", "HOUSE", "PENTHOUSE", "DUPLEX", "STUDIO"]),
                title: faker.lorem.words(3),
                description: faker.lorem.paragraph(),
                price: faker.number.float({ min: 100000, max: 1000000 }),
                agentId: agent.id,
                locationId: location.id,
                detailsId: details.id,
                images: [faker.image.url(), faker.image.url()],
                createdAt: getRandomDateIn2025(),
            },
        });
    });

    await Promise.all(housePromises);
    console.log(" Casas criadas com sucesso.");
}

main()
    .catch((e) => {
        console.error(" Erro no seed de casas:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

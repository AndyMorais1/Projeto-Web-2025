import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { hashPassword } from "../utils/hash";
import { Faker, pt_PT, en } from "@faker-js/faker";

// npx ts-node src/prisma/user-seed.ts
const prisma = new PrismaClient();
const faker = new Faker({ locale: [pt_PT, en] });

function getRandomDateIn2025(): Date {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date();
    if (start > end) return end;
    return faker.date.between({ from: start, to: end });
}

function getRandomRole(): Role {
    const roles: Role[] = [Role.CLIENT, Role.AGENT, Role.ADMIN];
    return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomProfileImage(): string {
    const seed = Math.floor(Math.random() * 70) + 1;
    return `https://i.pravatar.cc/150?img=${seed}`;
}

function getRandomScore(): number {
    return faker.number.int({ min: 3, max: 5 });
}

async function main() {
    const rawUsers = Array.from({ length: 10 }).map(() => {
        const name = faker.person.fullName();
        const email = faker.internet.email({ firstName: name.split(" ")[0] });
        const phone = "9" + faker.string.numeric(8);
        const password = "senha123";
        const role = getRandomRole();
        const createdAt = getRandomDateIn2025();
        const photo = getRandomProfileImage();

        return {
            name,
            email,
            password,
            phone,
            role,
            createdAt,
            photo,
        };
    });

    const users = rawUsers.map((user) => {
        const { salt, hash } = hashPassword(user.password);
        return {
            name: user.name,
            email: user.email,
            password: hash,
            salt,
            phone: user.phone,
            role: user.role,
            createdAt: user.createdAt,
            photo: user.photo,
            status: user.role === Role.ADMIN ? UserStatus.ACTIVE : UserStatus.PENDING,
            isEmailVerified: false,
        };
    });

    // Criação dos usuários
    await prisma.user.createMany({ data: users });
    console.log("✅ Usuários criados.");

    // Recuperar usuários criados
    const allUsers = await prisma.user.findMany();
    const agents = allUsers.filter((u) => u.role === Role.AGENT);
    const clients = allUsers.filter((u) => u.role === Role.CLIENT);

    if (agents.length === 0 || clients.length === 0) {
        console.log("⚠️ Nenhum agente ou cliente disponível para gerar avaliações.");
        return;
    }

    // Criar ratings aleatórios para os agentes
    // Criar ratings aleatórios para os agentes
    // Criar ratings aleatórios para os agentes
    for (const agent of agents) {
        const shuffledClients = faker.helpers.shuffle(clients);
        const totalRatings = faker.number.int({ min: 1, max: Math.min(5, shuffledClients.length) });

        for (let i = 0; i < totalRatings; i++) {
            const client = shuffledClients[i];

            try {
                await prisma.rating.create({
                    data: {
                        agentId: agent.id,
                        clientId: client.id,
                        score: getRandomScore(),
                        comment: faker.lorem.sentence(),
                        createdAt: faker.date.recent({ days: 30 }),
                    },
                });
            } catch (error: any) {
                if (error.code === "P2002") {
                    console.warn(`Rating já existe entre ${client.id} e ${agent.id}, pulando...`);
                } else {
                    throw error;
                }
            }
        }
    }



    console.log("🌟 Avaliações aleatórias adicionadas para os agentes.");
}

main()
    .catch((e) => {
        console.error("❌ Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

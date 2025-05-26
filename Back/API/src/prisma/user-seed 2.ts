import { PrismaClient, Role, UserStatus } from "@prisma/client";
import { hashPassword } from "../utils/hash";
import { Faker, pt_PT, en } from "@faker-js/faker";

// npx ts-node src/prisma/user-seed.ts
// gera 10 usuarios aleatorios
const prisma = new PrismaClient();
const faker = new Faker({ locale: [pt_PT, en] }); // 🇵🇹 + fallback

function getRandomDateIn2025(): Date {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getRandomRole(): Role {
    const roles: Role[] = [Role.CLIENT, Role.AGENT, Role.ADMIN];
    return roles[Math.floor(Math.random() * roles.length)];
}

async function main() {
    const rawUsers = Array.from({ length: 10 }).map(() => {
        const name = faker.person.fullName();
        const email = faker.internet.email({ firstName: name.split(" ")[0] });
        const phone = "9" + faker.string.numeric(8); // Gera algo como '912345678'
        const password = "senha123";
        const role = getRandomRole();
        const createdAt = getRandomDateIn2025();

        return {
            name,
            email,
            password,
            phone,
            role,
            createdAt,
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
            status: user.role === Role.ADMIN ? UserStatus.ACTIVE : UserStatus.PENDING,
            isEmailVerified: false,
        };
    });

    await prisma.user.createMany({ data: users });
    console.log(" Usuários aleatórios criados com sucesso.");
}

main()
    .catch((e) => {
        console.error(" Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

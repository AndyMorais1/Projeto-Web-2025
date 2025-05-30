import {PrismaClient, Role, UserStatus} from "@prisma/client";
import {hashPassword} from "../utils/hash";
import {Faker, pt_PT, en} from "@faker-js/faker";

// npx ts-node src/prisma/user-seed.ts
const prisma = new PrismaClient();
const faker = new Faker({locale: [pt_PT, en]});

function getRandomDateIn2025(): Date {
    const start = new Date("2025-01-01T00:00:00Z");
    const end = new Date(); // data atual

    if (start > end) return end; // Evita erro se a data atual for antes de 2025

    const timestamp = faker.date.between({from: start, to: end});
    return timestamp;
}


function getRandomRole(): Role {
    const roles: Role[] = [Role.CLIENT, Role.AGENT, Role.ADMIN];
    return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomProfileImage(): string {
    // Gera imagem de rosto aleatória usando i.pravatar.cc
    const seed = Math.floor(Math.random() * 70) + 1; // i.pravatar.cc suporta de 1 a 70
    return `https://i.pravatar.cc/150?img=${seed}`;
}

async function main() {
    const rawUsers = Array.from({length: 10}).map(() => {
        const name = faker.person.fullName();
        const email = faker.internet.email({firstName: name.split(" ")[0]});
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
        const {salt, hash} = hashPassword(user.password);
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

    await prisma.user.createMany({data: users});
    console.log("✅ Usuários aleatórios com fotos criados com sucesso.");
}

main()
    .catch((e) => {
        console.error("❌ Erro no seed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

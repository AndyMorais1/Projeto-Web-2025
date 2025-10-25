// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const houseTypes = [
        { name: 'APARTAMENTO' },
        { name: 'CASA' },
        { name: 'COBERTURA' },
        { name: 'DUPLEX' },
        { name: 'STÚDIO' },
        { name: 'LOFT' },
        { name: 'VILA' },
        { name: 'CASA DE CAMPO' },
        { name: 'BANGALÔ' },
        { name: 'CHÁCARA' },
        { name: 'SOBRADO' },
        { name: 'CONDOMÍNIO' },
        { name: 'CABANA' },
        { name: 'FAZENDA' },
        { name: 'MANSÃO' },
        {name: 'GARAGEM'},
        { name: 'COMÉRCIO' },
    ];

    await prisma.houseType.createMany({
        data: houseTypes,
        skipDuplicates: true, // evita erro se rodar o seed mais de uma vez
    });

    console.log('✅ Tipos de casa inseridos com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro ao executar o seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const boards = [
        { title: 'Team Celebration', category: 'Celebration', author: "Mike" }
    ]

    const cards = [
        { title: "Great job on the release!", description: "You crushed it.", gif: "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif", author: "Alice", boardId: 1 }
    ]

    for (const board of boards) {
        await prisma.board.create({ data: board });
    }

    for (const card of cards) {
        await prisma.card.create({ data: card });
    }

    console.log("Seeded boards with cards!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

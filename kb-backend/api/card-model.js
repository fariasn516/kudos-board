const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async find(where) {
        // GET http://localhost:5432/api/card?title=blah
        // SELECT * FROM "Card" WHERE type='dog';
        const cards = await prisma.card.findMany({ where })
        return cards
    },

    async findById(id) {
        // GET http://localhost:5432/api/card/1
        // SELECT * FROM "Card" WHERE id = 1;
        const card = await prisma.card.findUnique({ where: { id } })
        return card
    },

    async create(changes) {
        // POST http://localhost:5432/api/card/1 { fields here}
        // INSERT INTO "Card"
        const card = await prisma.card.create({ data: changes })
        return card
    },

    async update(id, changes) {
        // PUT http://localhost:5432/api/card/1 { adopted: true }
        // UPDATE "Card" SET adopted = true WHERE id = 1;
        const card = await prisma.card.update({ where: { id }, data: changes })
        return card
    },

    async delete(id) {
        // DELETE http://localhost:5432/api/card/1
        // DELETE FROM "Card" WHERE id = 1;
        const card = await prisma.card.delete({ where: { id } })
        return card
    },

    async findByBoardId(boardId) {
        // GET http://localhost:5432/api/card?boardId=1
        // SELECT * FROM "Card" WHERE boardId = 1;
        const cards = await prisma.card.findMany({ where: { boardId } })
        return cards
    }
}

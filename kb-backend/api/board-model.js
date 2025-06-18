const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    async find(where) {
        // GET http://localhost:5432/api/board?category=celebration
        // SELECT * FROM "Board" WHERE category='celebration';
        const boards = await prisma.board.findMany({ where, include: { cards: true } })
        return boards
    },

    async findById(id) {
        // GET http://localhost:5432/api/board/1
        // SELECT * FROM "Board" WHERE id = 1;
        const board = await prisma.board.findUnique({ where: { id } })
        return board
    },

    async create(changes) {
        // POST http://localhost:5432/api/board/1 { fields here }
        // INSERT INTO "Board"
        const board = await prisma.board.create({ data: changes })
        return board
    },

    async update(id, changes) {
        // PUT http://localhost:5432/api/board/1 { adopted: true }
        // UPDATE "Board" SET adopted = true WHERE id = 1;
        const board = await prisma.board.update({ where: { id }, data: changes })
        return board
    },

    async delete(id) {
        // DELETE http://localhost:5432/api/board/1
        // DELETE FROM "Board" WHERE id = 1;
        const board = await prisma.board.delete({ where: { id } })
        return board
    }
}

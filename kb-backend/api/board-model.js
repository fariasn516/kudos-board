const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    // Get boards with optional filters, including related cards
    async find(where) {
        return await prisma.board.findMany({ where, include: { cards: true } })
    },

    // Get a single board by ID
    async findById(id) {
        return await prisma.board.findUnique({ where: { id } })
    },

    // Update a board by ID
    async create(changes) {
        return await prisma.board.create({ data: changes })
    },

    // Update a board by ID
    async update(id, changes) {
        return await prisma.board.update({ where: { id }, data: changes })
    },

    // Delete a board by ID
    async delete(id) {
        return await prisma.board.delete({ where: { id } })
    }
}

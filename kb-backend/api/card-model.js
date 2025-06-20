const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    // Get all cards with optional filters, including comments
    async find(where) {
        return await prisma.card.findMany({ where, include: { comments: true } })
    },

    // Get a single card by ID
    async findById(id) {
        return await prisma.card.findUnique({ where: { id } })
    },

    // Create a new card
    async create(changes) {
        return await prisma.card.create({ data: changes })
    },

    // Update a card by ID
    async update(id, changes) {
        return await prisma.card.update({ where: { id }, data: changes })
    },

    // Delete a card by ID
    async delete(id) {
        return await prisma.card.delete({ where: { id } })
    },

    // Get all cards for a specific board, including comments
    async findByBoardId(boardId) {
        return await prisma.card.findMany({ where: { boardId }, include: { comments: true } })
    }
}

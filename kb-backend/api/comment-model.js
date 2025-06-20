const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  // Get all comments for a card, newest first
  async findByCard(cardId) {
    return prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: "desc" },
    });
  },

  // Create a new comment
  async create(data) {
    return prisma.comment.create({ data });
  },
};

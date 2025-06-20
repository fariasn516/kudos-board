const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  /* GET /api/cards/:id/comments */
  async findByCard(cardId) {
    return prisma.comment.findMany({
      where: { cardId },
      orderBy: { createdAt: "desc" },
    });
  },

  /* POST /api/cards/:id/comments */
  async create(data) {
    return prisma.comment.create({ data });
  },
};

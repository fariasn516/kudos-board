-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pinnedAt" TIMESTAMP(3);

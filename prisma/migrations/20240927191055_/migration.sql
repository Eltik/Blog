/*
  Warnings:

  - You are about to drop the `_CategoriesToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoriesToPost" DROP CONSTRAINT "_CategoriesToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoriesToPost" DROP CONSTRAINT "_CategoriesToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" INTEGER;

-- DropTable
DROP TABLE "_CategoriesToPost";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

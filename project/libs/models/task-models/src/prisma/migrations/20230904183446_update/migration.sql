/*
  Warnings:

  - You are about to drop the column `text` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the column `task_id` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tags` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToTask` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[text]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `executor_id` to the `responses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerPrice` to the `responses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToTask" DROP CONSTRAINT "_CategoryToTask_B_fkey";

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_task_id_fkey";

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "text" SET DEFAULT '';

-- AlterTable
ALTER TABLE "responses" DROP COLUMN "text",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "executor_id" TEXT NOT NULL,
ADD COLUMN     "offerPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "task_id",
DROP COLUMN "updated_at",
DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "category_id" INTEGER NOT NULL,
ADD COLUMN     "comments_count" INTEGER DEFAULT 0,
ADD COLUMN     "executor_id" TEXT DEFAULT '',
ADD COLUMN     "responses_count" INTEGER DEFAULT 0,
ALTER COLUMN "city" SET DEFAULT 'Москва',
ALTER COLUMN "status" SET DEFAULT 'New';

-- DropTable
DROP TABLE "_CategoryToTask";

-- CreateTable
CREATE TABLE "reviews" (
    "review_id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "executor_id" TEXT NOT NULL,
    "review" TEXT NOT NULL DEFAULT '',
    "rating" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "_TagToTask" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToTask_AB_unique" ON "_TagToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToTask_B_index" ON "_TagToTask"("B");

-- CreateIndex
CREATE UNIQUE INDEX "tags_text_key" ON "tags"("text");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTask" ADD CONSTRAINT "_TagToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "tags"("tag_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToTask" ADD CONSTRAINT "_TagToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

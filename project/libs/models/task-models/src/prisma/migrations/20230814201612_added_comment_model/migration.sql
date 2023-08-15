/*
  Warnings:

  - You are about to drop the column `comments` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "comments";

-- CreateTable
CREATE TABLE "comments" (
    "comment_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

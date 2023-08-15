/*
  Warnings:

  - You are about to drop the column `category_id` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `responses` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "category_id",
DROP COLUMN "responses",
DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "tags" (
    "tag_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_id")
);

-- CreateTable
CREATE TABLE "responses" (
    "response_id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE ON UPDATE CASCADE;

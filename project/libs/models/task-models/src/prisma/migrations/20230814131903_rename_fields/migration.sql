/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "tasks" (
    "task_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "category" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "due_date" TIMESTAMP(3),
    "image" TEXT DEFAULT '',
    "address" TEXT DEFAULT '',
    "tags" TEXT[],
    "city" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" TEXT,
    "responses" TEXT[],
    "comments" TEXT[],

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("task_id")
);

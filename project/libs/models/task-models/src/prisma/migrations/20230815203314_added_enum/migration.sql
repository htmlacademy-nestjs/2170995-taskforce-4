/*
  Warnings:

  - Added the required column `category_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `tasks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "City" AS ENUM ('Moscow', 'SPB', 'Vladivostok');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('New', 'Cancelled', 'AtWork', 'Completed', 'Failed');

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "category_id" INTEGER NOT NULL,
DROP COLUMN "city",
ADD COLUMN     "city" "City" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TaskStatus" NOT NULL;

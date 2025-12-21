/*
  Warnings:

  - You are about to drop the column `calenderNotionid` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `calendarNotionId` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "calenderNotionid",
ADD COLUMN     "calendarNotionId" TEXT NOT NULL;

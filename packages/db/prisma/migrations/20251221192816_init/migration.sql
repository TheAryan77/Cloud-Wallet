/*
  Warnings:

  - Added the required column `calenderNotionid` to the `Courses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "calenderNotionid" TEXT NOT NULL;

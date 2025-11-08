/*
  Warnings:

  - Added the required column `cost_per_month` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cost_per_month" DECIMAL(10,2) NOT NULL;

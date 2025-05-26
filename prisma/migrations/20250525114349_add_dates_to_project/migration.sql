/*
  Warnings:

  - Added the required column `startDate` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Project` ADD COLUMN `endDate` DATETIME(3) NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL;

/*
  Warnings:

  - Added the required column `countryCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobileNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `countryCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdUserId` INTEGER NULL,
    ADD COLUMN `documentStatus` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `mobileNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedUserId` INTEGER NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

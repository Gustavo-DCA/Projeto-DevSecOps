/*
  Warnings:

  - You are about to drop the column `authorEmail` on the `attention` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `attention` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `attention` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `attention` table. All the data in the column will be lost.
  - You are about to alter the column `commitId` on the `attention` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `reason` on table `attention` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `attention` DROP COLUMN `authorEmail`,
    DROP COLUMN `authorName`,
    DROP COLUMN `message`,
    DROP COLUMN `url`,
    MODIFY `commitId` INTEGER NOT NULL,
    MODIFY `reason` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Attention` ADD CONSTRAINT `Attention_commitId_fkey` FOREIGN KEY (`commitId`) REFERENCES `Commit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

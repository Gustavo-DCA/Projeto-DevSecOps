-- CreateTable
CREATE TABLE `Commit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commitId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NULL,
    `url` VARCHAR(191) NULL,
    `authorName` VARCHAR(191) NULL,
    `authorEmail` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attention` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `commitId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NULL,
    `url` VARCHAR(191) NULL,
    `authorName` VARCHAR(191) NULL,
    `authorEmail` VARCHAR(191) NULL,
    `reason` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

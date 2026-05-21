-- AlterTable
ALTER TABLE `Lead` ADD COLUMN `courseId` VARCHAR(191) NULL,
    ADD COLUMN `learnerType` ENUM('STUDENT', 'PROFESSIONAL', 'REGULATOR') NULL;

-- CreateTable
CREATE TABLE `DonationInterest` (
    `id` VARCHAR(191) NOT NULL,
    `amountMinor` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `source` VARCHAR(191) NOT NULL DEFAULT 'donation-form',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DonationInterest_email_idx`(`email`),
    INDEX `DonationInterest_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Lead_learnerType_idx` ON `Lead`(`learnerType`);

-- CreateIndex
CREATE INDEX `Lead_courseId_idx` ON `Lead`(`courseId`);

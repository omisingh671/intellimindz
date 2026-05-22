-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NULL,
    `mobile` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `learnerType` ENUM('STUDENT', 'PROFESSIONAL', 'REGULATOR') NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'MANAGER', 'LEARNER') NOT NULL DEFAULT 'LEARNER',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_role_idx`(`role`),
    INDEX `User_learnerType_idx`(`learnerType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    INDEX `Session_expires_idx`(`expires`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `courseCount` INTEGER NOT NULL DEFAULT 0,
    `icon` VARCHAR(191) NOT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseLevel` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `step` INTEGER NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `outcome` VARCHAR(191) NOT NULL,
    `idealFor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CourseLevel_label_key`(`label`),
    UNIQUE INDEX `CourseLevel_step_key`(`step`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `levelId` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `mode` VARCHAR(191) NOT NULL,
    `audience` VARCHAR(191) NOT NULL,
    `feeLabel` VARCHAR(191) NOT NULL,
    `tags` JSON NOT NULL,
    `isLatest` BOOLEAN NOT NULL DEFAULT false,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Course_slug_key`(`slug`),
    INDEX `Course_categoryId_idx`(`categoryId`),
    INDEX `Course_levelId_idx`(`levelId`),
    INDEX `Course_isPublished_idx`(`isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CoursePrice` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `priceType` ENUM('FREE', 'PAID', 'CONTACT') NOT NULL DEFAULT 'FREE',
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `baseAmountMinor` INTEGER NULL,
    `taxMode` ENUM('GST_EXCLUSIVE', 'GST_INCLUSIVE', 'GST_EXEMPT') NOT NULL DEFAULT 'GST_EXCLUSIVE',
    `gstRateBps` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `validFrom` DATETIME(3) NULL,
    `validUntil` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CoursePrice_courseId_idx`(`courseId`),
    INDEX `CoursePrice_isActive_idx`(`isActive`),
    INDEX `CoursePrice_validFrom_validUntil_idx`(`validFrom`, `validUntil`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `discountType` ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
    `discountValueBps` INTEGER NULL,
    `discountAmountMinor` INTEGER NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `minimumAmountMinor` INTEGER NULL,
    `maxRedemptions` INTEGER NULL,
    `redeemedCount` INTEGER NOT NULL DEFAULT 0,
    `validFrom` DATETIME(3) NULL,
    `validUntil` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `appliesToAllCourses` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Coupon_code_key`(`code`),
    INDEX `Coupon_isActive_idx`(`isActive`),
    INDEX `Coupon_validFrom_validUntil_idx`(`validFrom`, `validUntil`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CouponCourse` (
    `couponId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CouponCourse_courseId_idx`(`courseId`),
    PRIMARY KEY (`couponId`, `courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lead` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `learnerType` ENUM('STUDENT', 'PROFESSIONAL', 'REGULATOR') NULL,
    `courseId` VARCHAR(191) NULL,
    `message` TEXT NOT NULL,
    `source` VARCHAR(191) NOT NULL DEFAULT 'website',
    `status` ENUM('NEW', 'CONTACTED', 'QUALIFIED', 'CLOSED') NOT NULL DEFAULT 'NEW',
    `assignedToId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Lead_status_idx`(`status`),
    INDEX `Lead_assignedToId_idx`(`assignedToId`),
    INDEX `Lead_learnerType_idx`(`learnerType`),
    INDEX `Lead_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `purpose` ENUM('DONATION', 'COURSE') NOT NULL,
    `mode` ENUM('FULL', 'EMI', 'FLEXIBLE') NOT NULL,
    `status` ENUM('PENDING', 'PAID', 'PARTIALLY_PAID', 'FAILED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    `paymentGroupId` VARCHAR(191) NOT NULL,
    `installmentNo` INTEGER NULL,
    `dueAt` DATETIME(3) NULL,
    `totalAmountMinor` INTEGER NOT NULL,
    `amountMinor` INTEGER NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'INR',
    `payerName` VARCHAR(191) NOT NULL,
    `payerEmail` VARCHAR(191) NOT NULL,
    `payerMobile` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `courseId` VARCHAR(191) NULL,
    `donationInterestId` VARCHAR(191) NULL,
    `couponId` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `gateway` VARCHAR(191) NULL,
    `gatewayOrderId` VARCHAR(191) NULL,
    `gatewayPaymentId` VARCHAR(191) NULL,
    `gatewayStatus` VARCHAR(191) NULL,
    `paidAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Payment_purpose_idx`(`purpose`),
    INDEX `Payment_mode_idx`(`mode`),
    INDEX `Payment_status_idx`(`status`),
    INDEX `Payment_paymentGroupId_idx`(`paymentGroupId`),
    INDEX `Payment_payerEmail_idx`(`payerEmail`),
    INDEX `Payment_userId_idx`(`userId`),
    INDEX `Payment_courseId_idx`(`courseId`),
    INDEX `Payment_donationInterestId_idx`(`donationInterestId`),
    INDEX `Payment_couponId_idx`(`couponId`),
    INDEX `Payment_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_levelId_fkey` FOREIGN KEY (`levelId`) REFERENCES `CourseLevel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CoursePrice` ADD CONSTRAINT `CoursePrice_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CouponCourse` ADD CONSTRAINT `CouponCourse_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CouponCourse` ADD CONSTRAINT `CouponCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Lead` ADD CONSTRAINT `Lead_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_donationInterestId_fkey` FOREIGN KEY (`donationInterestId`) REFERENCES `DonationInterest`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

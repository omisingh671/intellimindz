-- Rename refresh-token session storage without dropping existing sessions.
ALTER TABLE `RefreshSession` DROP FOREIGN KEY `RefreshSession_userId_fkey`;
ALTER TABLE `RefreshSession` DROP INDEX `RefreshSession_tokenHash_key`;
ALTER TABLE `RefreshSession` DROP INDEX `RefreshSession_userId_idx`;
ALTER TABLE `RefreshSession` DROP INDEX `RefreshSession_expiresAt_idx`;

RENAME TABLE `RefreshSession` TO `Session`;
ALTER TABLE `Session` RENAME COLUMN `tokenHash` TO `refreshTokenHash`;

ALTER TABLE `Session` ADD UNIQUE INDEX `Session_refreshTokenHash_key`(`refreshTokenHash`);
ALTER TABLE `Session` ADD INDEX `Session_userId_idx`(`userId`);
ALTER TABLE `Session` ADD INDEX `Session_expiresAt_idx`(`expiresAt`);
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Rename commercial validity windows to clearer names.
ALTER TABLE `CoursePrice` DROP INDEX `CoursePrice_startsAt_endsAt_idx`;
ALTER TABLE `CoursePrice` RENAME COLUMN `startsAt` TO `validFrom`;
ALTER TABLE `CoursePrice` RENAME COLUMN `endsAt` TO `validUntil`;
ALTER TABLE `CoursePrice` ADD INDEX `CoursePrice_validFrom_validUntil_idx`(`validFrom`, `validUntil`);

ALTER TABLE `Coupon` DROP INDEX `Coupon_startsAt_endsAt_idx`;
ALTER TABLE `Coupon` RENAME COLUMN `startsAt` TO `validFrom`;
ALTER TABLE `Coupon` RENAME COLUMN `endsAt` TO `validUntil`;
ALTER TABLE `Coupon` ADD INDEX `Coupon_validFrom_validUntil_idx`(`validFrom`, `validUntil`);

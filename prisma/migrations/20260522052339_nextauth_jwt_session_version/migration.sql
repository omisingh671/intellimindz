-- AlterTable
ALTER TABLE `user` ADD COLUMN `profileCompleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `sessionVersion` INTEGER NOT NULL DEFAULT 0;

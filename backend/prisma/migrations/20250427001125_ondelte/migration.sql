-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `phonenumber` DROP FOREIGN KEY `PhoneNumber_userId_fkey`;

-- DropForeignKey
ALTER TABLE `screenshot` DROP FOREIGN KEY `Screenshot_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `Skill_userId_fkey`;

-- DropForeignKey
ALTER TABLE `sociallink` DROP FOREIGN KEY `SocialLink_userId_fkey`;

-- DropIndex
DROP INDEX `Comment_projectId_fkey` ON `comment`;

-- DropIndex
DROP INDEX `PhoneNumber_userId_fkey` ON `phonenumber`;

-- DropIndex
DROP INDEX `Screenshot_projectId_fkey` ON `screenshot`;

-- DropIndex
DROP INDEX `Skill_userId_fkey` ON `skill`;

-- DropIndex
DROP INDEX `SocialLink_userId_fkey` ON `sociallink`;

-- AddForeignKey
ALTER TABLE `Screenshot` ADD CONSTRAINT `Screenshot_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PhoneNumber` ADD CONSTRAINT `PhoneNumber_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Skill` ADD CONSTRAINT `Skill_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SocialLink` ADD CONSTRAINT `SocialLink_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

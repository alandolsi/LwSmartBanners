<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1736372000AddBannerDismissSettings extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1736372000;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `dismissible` TINYINT(1) NOT NULL DEFAULT 0 AFTER `overlay_alignment`;');
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `dismiss_scope` VARCHAR(32) NULL AFTER `dismissible`;');
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `dismiss_ttl_seconds` INT(11) NULL AFTER `dismiss_scope`;');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}

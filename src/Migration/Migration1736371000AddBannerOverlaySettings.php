<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1736371000AddBannerOverlaySettings extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1736371000;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `display_mode` VARCHAR(32) NULL AFTER `positions`;');
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `overlay_alignment` VARCHAR(32) NULL AFTER `display_mode`;');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}

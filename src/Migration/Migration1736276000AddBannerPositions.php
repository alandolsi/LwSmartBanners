<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1736276000AddBannerPositions extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1736276000;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('ALTER TABLE `lw_smart_banner` ADD COLUMN `positions` JSON NULL AFTER `css_class`;');
    }

    public function updateDestructive(Connection $connection): void
    {
    }
}

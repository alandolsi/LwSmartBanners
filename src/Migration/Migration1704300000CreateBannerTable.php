<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1704300000CreateBannerTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1704300000;
    }

    public function update(Connection $connection): void
    {
        $sql = <<<SQL
CREATE TABLE IF NOT EXISTS `lw_smart_banner` (
    `id` BINARY(16) NOT NULL,
    `active` TINYINT(1) NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `type` VARCHAR(50) NOT NULL DEFAULT 'info',
    `css_class` VARCHAR(255) NULL,
    `rule_id` BINARY(16) NULL,
    `priority` INT(11) NOT NULL DEFAULT 0,
    `active_from` DATETIME(3) NULL,
    `active_to` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`),
    KEY `fk.lw_smart_banner.rule_id` (`rule_id`),
    CONSTRAINT `fk.lw_smart_banner.rule_id` FOREIGN KEY (`rule_id`) REFERENCES `rule` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
SQL;

        $connection->executeStatement($sql);
    }

    public function updateDestructive(Connection $connection): void
    {
        // No destructive changes
    }
}

<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners;

use Shopware\Core\Framework\Plugin;
use Symfony\Component\Routing\Loader\Configurator\RoutingConfigurator;

class LwSmartBanners extends Plugin
{
    public function configureRoutes(RoutingConfigurator $routes, string $environment): void
    {
        $routes->import(__DIR__ . '/Controller', 'attribute');
    }
}

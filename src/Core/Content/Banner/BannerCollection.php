<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Core\Content\Banner;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void               add(BannerEntity $entity)
 * @method void               set(string $key, BannerEntity $entity)
 * @method BannerEntity[]     getIterator()
 * @method BannerEntity[]     getElements()
 * @method BannerEntity|null  get(string $key)
 * @method BannerEntity|null  first()
 * @method BannerEntity|null  last()
 */
class BannerCollection extends EntityCollection
{
    protected function getExpectedClass(): string
    {
        return BannerEntity::class;
    }
}

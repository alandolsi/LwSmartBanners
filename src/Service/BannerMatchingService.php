<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Service;

use LandolsiWebdesign\LwSmartBanners\Core\Content\Banner\BannerCollection;
use LandolsiWebdesign\LwSmartBanners\Core\Content\Banner\BannerEntity;
use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\RangeFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Sorting\FieldSorting;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class BannerMatchingService
{
    public function __construct(
        private readonly EntityRepository $bannerRepository
    ) {
    }

    public function getMatchingBanners(SalesChannelContext $context, ?Cart $cart = null): BannerCollection
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('active', true));
        
        $now = new \DateTime();
        $criteria->addFilter(
            new RangeFilter('activeFrom', [
                RangeFilter::LTE => $now->format('Y-m-d H:i:s'),
            ])
        );
        
        $criteria->addFilter(
            new RangeFilter('activeTo', [
                RangeFilter::GTE => $now->format('Y-m-d H:i:s'),
            ])
        );
        
        $criteria->addSorting(new FieldSorting('priority', FieldSorting::DESCENDING));
        $criteria->addAssociation('rule');

        /** @var BannerCollection $banners */
        $banners = $this->bannerRepository->search($criteria, $context->getContext())->getEntities();

        return $this->filterByRules($banners, $context, $cart);
    }

    private function filterByRules(
        BannerCollection $banners,
        SalesChannelContext $context,
        ?Cart $cart
    ): BannerCollection {
        $matched = new BannerCollection();

        foreach ($banners as $banner) {
            if ($this->matchesRule($banner, $context, $cart)) {
                $matched->add($banner);
            }
        }

        return $matched;
    }

    private function matchesRule(
        BannerEntity $banner,
        SalesChannelContext $context,
        ?Cart $cart
    ): bool {
        $rule = $banner->getRule();
        
        if (!$rule) {
            return true;
        }

        return $rule->getPayload()->match(
            new \Shopware\Core\Checkout\Cart\Rule\CartRuleScope($cart ?? new Cart('banner-matching'), $context)
        );
    }
}

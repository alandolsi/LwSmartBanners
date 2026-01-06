<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Storefront\Subscriber;

use LandolsiWebdesign\LwSmartBanners\Service\BannerMatchingService;
use Shopware\Core\Checkout\Cart\SalesChannel\CartService;
use Shopware\Storefront\Event\StorefrontRenderEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class BannerPageSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly BannerMatchingService $bannerMatchingService,
        private readonly CartService $cartService
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            StorefrontRenderEvent::class => 'onStorefrontRender',
        ];
    }

    public function onStorefrontRender(StorefrontRenderEvent $event): void
    {
        $context = $event->getSalesChannelContext();

        try {
            $cart = $this->cartService->getCart($context->getToken(), $context);
        } catch (\Throwable) {
            $cart = null;
        }

        $matchingBanners = $this->bannerMatchingService->getMatchingBanners($context, $cart);

        $event->setParameter('lwSmartBanners', $matchingBanners);
    }
}

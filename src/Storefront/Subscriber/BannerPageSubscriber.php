<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Storefront\Subscriber;

use LandolsiWebdesign\LwSmartBanners\Service\BannerMatchingService;
use Shopware\Storefront\Event\StorefrontRenderEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class BannerPageSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private readonly BannerMatchingService $bannerMatchingService
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
        $cart = null;

        if (method_exists($event->getRequest(), 'getSession')) {
            $session = $event->getRequest()->getSession();
            if ($session && $session->has('cart')) {
                $cart = $session->get('cart');
            }
        }

        $matchingBanners = $this->bannerMatchingService->getMatchingBanners($context, $cart);

        $event->setParameter('lwSmartBanners', $matchingBanners);
    }
}

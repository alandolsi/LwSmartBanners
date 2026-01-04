<?php declare(strict_types=1);

namespace LandolsiWebdesign\LwSmartBanners\Controller\Administration;

use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(defaults: ['_routeScope' => ['api']])]
class BannerAdminController extends AbstractController
{
    public function __construct(
        private readonly EntityRepository $bannerRepository
    ) {
    }

    /**
     * Create a new banner
     */
    #[Route(
        path: '/api/_action/lw-smart-banner/create',
        name: 'api.action.lw_smart_banner.create',
        methods: ['POST']
    )]
    public function create(Request $request, Context $context): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        // Basic validation
        if (!isset($data['name']) || empty($data['name'])) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Field "name" is required'
            ], Response::HTTP_BAD_REQUEST);
        }
        
        if (!isset($data['content']) || empty($data['content'])) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Field "content" is required'
            ], Response::HTTP_BAD_REQUEST);
        }
        
        if (!isset($data['type']) || !in_array($data['type'], ['info', 'success', 'warning', 'danger'])) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Field "type" must be one of: info, success, warning, danger'
            ], Response::HTTP_BAD_REQUEST);
        }
        
        try {
            // Create banner
            $this->bannerRepository->create([
                $this->prepareBannerData($data)
            ], $context);
            
            return new JsonResponse([
                'success' => true,
                'message' => 'Banner created successfully'
            ], Response::HTTP_CREATED);
            
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Failed to create banner: ' . $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Update an existing banner
     */
    #[Route(
        path: '/api/_action/lw-smart-banner/update/{id}',
        name: 'api.action.lw_smart_banner.update',
        methods: ['PATCH']
    )]
    public function update(string $id, Request $request, Context $context): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        
        // Check if banner exists
        $banner = $this->bannerRepository->search(
            new Criteria([$id]),
            $context
        )->first();
        
        if (!$banner) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Banner not found'
            ], Response::HTTP_NOT_FOUND);
        }
        
        // Validate type if provided
        if (isset($data['type']) && !in_array($data['type'], ['info', 'success', 'warning', 'danger'])) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Field "type" must be one of: info, success, warning, danger'
            ], Response::HTTP_BAD_REQUEST);
        }
        
        try {
            // Update banner
            $updateData = $this->prepareBannerData($data);
            $updateData['id'] = $id;
            
            $this->bannerRepository->update([
                $updateData
            ], $context);
            
            return new JsonResponse([
                'success' => true,
                'message' => 'Banner updated successfully'
            ]);
            
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Failed to update banner: ' . $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Delete a banner
     */
    #[Route(
        path: '/api/_action/lw-smart-banner/delete/{id}',
        name: 'api.action.lw_smart_banner.delete',
        methods: ['DELETE']
    )]
    public function delete(string $id, Context $context): JsonResponse
    {
        // Check if banner exists
        $banner = $this->bannerRepository->search(
            new Criteria([$id]),
            $context
        )->first();
        
        if (!$banner) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Banner not found'
            ], Response::HTTP_NOT_FOUND);
        }
        
        try {
            $this->bannerRepository->delete([
                ['id' => $id]
            ], $context);
            
            return new JsonResponse([
                'success' => true,
                'message' => 'Banner deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Failed to delete banner: ' . $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Prepare banner data for storage
     */
    private function prepareBannerData(array $data): array
    {
        $bannerData = [];
        
        if (isset($data['name'])) {
            $bannerData['name'] = $data['name'];
        }
        
        if (isset($data['content'])) {
            $bannerData['content'] = $data['content'];
        }
        
        if (isset($data['type'])) {
            $bannerData['type'] = $data['type'];
        }
        
        if (isset($data['active'])) {
            $bannerData['active'] = (bool) $data['active'];
        }
        
        if (isset($data['priority'])) {
            $bannerData['priority'] = (int) $data['priority'];
        }
        
        if (isset($data['cssClass'])) {
            $bannerData['cssClass'] = $data['cssClass'];
        }
        
        if (isset($data['ruleId'])) {
            $bannerData['ruleId'] = $data['ruleId'];
        }
        
        // Handle datetime fields with timezone conversion to UTC
        if (isset($data['activeFrom'])) {
            $bannerData['activeFrom'] = $this->convertToUtc($data['activeFrom']);
        }
        
        if (isset($data['activeTo'])) {
            $bannerData['activeTo'] = $this->convertToUtc($data['activeTo']);
        }
        
        return $bannerData;
    }

    /**
     * Convert datetime string to UTC DateTime object
     */
    private function convertToUtc(string $datetime): \DateTime
    {
        try {
            // Try to parse ISO 8601 format with timezone
            $dt = new \DateTime($datetime);
            $dt->setTimezone(new \DateTimeZone('UTC'));
            return $dt;
        } catch (\Exception $e) {
            // Fallback: assume UTC if parsing fails
            return new \DateTime($datetime, new \DateTimeZone('UTC'));
        }
    }
}

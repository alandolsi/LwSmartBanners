/**
 * LwSmartBanners Admin UI Hotfix
 * This file patches the admin UI components until Vite rebuild works
 */

// Wait for Shopware to be ready
if (typeof Shopware !== 'undefined' && Shopware.Component) {
    console.log('[LwSmartBanners] Applying hotfixes...');
    
    // Patch the list component's onToggleActive method
    Shopware.Component.override('lw-banner-list', {
        methods: {
            async onToggleActive(banner) {
                const oldStatus = banner.active;
                banner.active = !banner.active;
                
                try {
                    await this.bannerRepository.save(banner);
                    this.createNotificationSuccess({
                        message: this.$tc('lw-smart-banners.list.successToggleActive')
                    });
                    // Reload list to refresh icons
                    await this.loadBanners();
                } catch (error) {
                    banner.active = oldStatus;
                    this.createNotificationError({
                        message: this.$tc('lw-smart-banners.list.errorToggleActive')
                    });
                }
            }
        }
    });
    
    // Patch the detail component's loadBanner method
    Shopware.Component.override('lw-banner-detail', {
        methods: {
            async loadBanner() {
                this.isLoading = true;

                try {
                    // Load without Criteria pagination
                    this.banner = await this.bannerRepository.get(
                        this.bannerId, 
                        Shopware.Context.api
                    );
                    console.log('[LwSmartBanners] Banner loaded:', this.banner);
                } catch (error) {
                    console.error('[LwSmartBanners] Load error:', error);
                    this.createNotificationError({
                        message: this.$tc('lw-smart-banners.detail.errorLoadingBanner')
                    });
                } finally {
                    this.isLoading = false;
                }
            }
        },
        
        computed: {
            bannerColumns() {
                return [
                    {
                        property: 'name',
                        dataIndex: 'name',
                        label: this.$tc('lw-smart-banners.list.columnName'),
                        routerLink: 'lw.smart.banners.detail',
                        inlineEdit: 'string',
                        allowResize: true,
                        primary: true,
                        width: '300px'
                    },
                    {
                        property: 'type',
                        dataIndex: 'type',
                        label: this.$tc('lw-smart-banners.list.columnType'),
                        allowResize: true,
                        width: '120px'
                    },
                    {
                        property: 'priority',
                        dataIndex: 'priority',
                        label: this.$tc('lw-smart-banners.list.columnPriority'),
                        allowResize: true,
                        align: 'right',
                        width: '100px'
                    },
                    {
                        property: 'active',
                        dataIndex: 'active',
                        label: this.$tc('lw-smart-banners.list.columnActive'),
                        allowResize: true,
                        align: 'center',
                        width: '100px'
                    }
                ];
            }
        }
    });
    
    console.log('[LwSmartBanners] Hotfixes applied successfully');
} else {
    console.warn('[LwSmartBanners] Shopware not ready, hotfixes not applied');
}

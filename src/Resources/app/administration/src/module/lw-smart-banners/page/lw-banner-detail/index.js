import template from './lw-banner-detail.html.twig';
import './lw-banner-detail.scss';

const { Criteria } = Shopware.Data;

Shopware.Component.register('lw-banner-detail', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Shopware.Mixin.getByName('notification')
    ],

    data() {
        return {
            banner: null,
            isLoading: false,
            processSuccess: false,
            bannerId: null,
            showDeleteModal: false,
            dismissTtlValue: 24,
            dismissTtlUnit: 'hours'
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(this.identifier)
        };
    },

    computed: {
        bannerRepository() {
            return this.repositoryFactory.create('lw_smart_banner');
        },

        identifier() {
            return this.banner ? this.banner.name : '';
        },

        isCreateMode() {
            return this.$route.name === 'lw.smart.banners.create';
        },

        typeOptions() {
            return [
                { value: 'info', label: this.$tc('lw-smart-banners.detail.typeInfo') },
                { value: 'success', label: this.$tc('lw-smart-banners.detail.typeSuccess') },
                { value: 'warning', label: this.$tc('lw-smart-banners.detail.typeWarning') },
                { value: 'danger', label: this.$tc('lw-smart-banners.detail.typeDanger') }
            ];
        },

        positionOptions() {
            return [
                { value: 'header', label: this.$tc('lw-smart-banners.detail.positionHeader') },
                { value: 'offcanvas_cart', label: this.$tc('lw-smart-banners.detail.positionOffcanvasCart') },
                { value: 'cart', label: this.$tc('lw-smart-banners.detail.positionCart') },
                { value: 'checkout_confirm', label: this.$tc('lw-smart-banners.detail.positionCheckoutConfirm') },
                { value: 'checkout_finish', label: this.$tc('lw-smart-banners.detail.positionCheckoutFinish') },
                { value: 'pdp', label: this.$tc('lw-smart-banners.detail.positionPdp') }
            ];
        },

        displayModeOptions() {
            return [
                { value: 'inline', label: this.$tc('lw-smart-banners.detail.displayModeInline') },
                { value: 'overlay', label: this.$tc('lw-smart-banners.detail.displayModeOverlay') }
            ];
        },

        overlayAlignmentOptions() {
            return [
                { value: 'top-left', label: this.$tc('lw-smart-banners.detail.overlayTopLeft') },
                { value: 'top-center', label: this.$tc('lw-smart-banners.detail.overlayTopCenter') },
                { value: 'top-right', label: this.$tc('lw-smart-banners.detail.overlayTopRight') },
                { value: 'middle-left', label: this.$tc('lw-smart-banners.detail.overlayMiddleLeft') },
                { value: 'middle-right', label: this.$tc('lw-smart-banners.detail.overlayMiddleRight') },
                { value: 'bottom-left', label: this.$tc('lw-smart-banners.detail.overlayBottomLeft') },
                { value: 'bottom-center', label: this.$tc('lw-smart-banners.detail.overlayBottomCenter') },
                { value: 'bottom-right', label: this.$tc('lw-smart-banners.detail.overlayBottomRight') }
            ];
        },

        dismissScopeOptions() {
            return [
                { value: 'forever', label: this.$tc('lw-smart-banners.detail.dismissScopeForever') },
                { value: 'session', label: this.$tc('lw-smart-banners.detail.dismissScopeSession') },
                { value: 'ttl', label: this.$tc('lw-smart-banners.detail.dismissScopeTtl') }
            ];
        },

        dismissTtlUnitOptions() {
            return [
                { value: 'hours', label: this.$tc('lw-smart-banners.detail.dismissTtlUnitHours') },
                { value: 'days', label: this.$tc('lw-smart-banners.detail.dismissTtlUnitDays') }
            ];
        },

        ruleCriteria() {
            const criteria = new Criteria(1, 25);
            criteria.addSorting(Criteria.sort('name', 'ASC'));
            return criteria;
        },

        isSaveDisabled() {
            if (this.isLoading || !this.banner) {
                return true;
            }

            return !this.banner.name || !this.banner.name.trim() || !this.banner.content || !this.banner.content.trim() || !this.banner.type;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            if (this.isCreateMode) {
                this.banner = this.bannerRepository.create();
                this.banner.active = true;
                this.banner.priority = 0;
                this.banner.type = 'info';
                this.banner.positions = [];
                this.banner.displayMode = 'inline';
                this.banner.overlayAlignment = 'bottom-right';
                this.banner.dismissible = false;
                this.banner.dismissScope = 'forever';
                this.banner.dismissTtlSeconds = null;
            } else {
                this.bannerId = this.$route.params.id;
                this.banner = this.bannerRepository.create(Shopware.Context.api);
                this.loadBanner();
            }
        },

        async loadBanner() {
            this.isLoading = true;

            try {
                this.banner = await this.bannerRepository.get(this.bannerId, Shopware.Context.api);

                if (!Array.isArray(this.banner.positions)) {
                    this.banner.positions = [];
                }

                if (!this.banner.displayMode) {
                    this.banner.displayMode = 'inline';
                }

                if (!this.banner.overlayAlignment) {
                    this.banner.overlayAlignment = 'bottom-right';
                }

                if (this.banner.dismissible === null || this.banner.dismissible === undefined) {
                    this.banner.dismissible = false;
                }

                if (this.banner.dismissible && !this.banner.dismissScope) {
                    this.banner.dismissScope = 'forever';
                }

                if (this.banner.dismissible && this.banner.dismissScope === 'ttl' && this.banner.dismissTtlSeconds) {
                    const seconds = parseInt(this.banner.dismissTtlSeconds, 10);

                    if (!Number.isNaN(seconds) && seconds > 0) {
                        if (seconds % 86400 === 0) {
                            this.dismissTtlUnit = 'days';
                            this.dismissTtlValue = seconds / 86400;
                        } else {
                            this.dismissTtlUnit = 'hours';
                            this.dismissTtlValue = Math.max(1, Math.round(seconds / 3600));
                        }
                    }
                }
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.detail.errorLoadingBanner')
                });
            } finally {
                this.isLoading = false;
            }
        },

        isBannerValid() {
            if (!this.banner) {
                return false;
            }

            return !!(
                this.banner.name && this.banner.name.trim() &&
                this.banner.content && this.banner.content.trim() &&
                this.banner.type
            );
        },

        async onSave() {
            if (!this.isBannerValid()) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.detail.errorValidation')
                });
                return;
            }

            this.isLoading = true;

            try {
                if (Array.isArray(this.banner.positions) && this.banner.positions.length === 0) {
                    this.banner.positions = null;
                }

                if (this.banner.displayMode === 'inline') {
                    this.banner.overlayAlignment = null;
                }

                if (!this.banner.dismissible) {
                    this.banner.dismissScope = null;
                    this.banner.dismissTtlSeconds = null;
                } else {
                    if (!this.banner.dismissScope) {
                        this.banner.dismissScope = 'forever';
                    }

                    if (this.banner.dismissScope === 'ttl') {
                        const value = parseInt(this.dismissTtlValue, 10);

                        if (!Number.isNaN(value) && value > 0) {
                            this.banner.dismissTtlSeconds = value * (this.dismissTtlUnit === 'days' ? 86400 : 3600);
                        } else {
                            this.banner.dismissTtlSeconds = null;
                        }
                    } else {
                        this.banner.dismissTtlSeconds = null;
                    }
                }

                await this.bannerRepository.save(this.banner);

                this.isLoading = false;
                this.processSuccess = true;

                this.createNotificationSuccess({
                    message: this.$tc('lw-smart-banners.detail.successSave')
                });

                if (this.isCreateMode) {
                    this.$router.push({ name: 'lw.smart.banners.detail', params: { id: this.banner.id } });
                } else {
                    // Reload banner to get fresh data from server
                    await this.loadBanner();
                }
            } catch (error) {
                this.isLoading = false;
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.detail.errorSave')
                });
            }
        },

        onDelete() {
            this.showDeleteModal = true;
        },

        onCloseDeleteModal() {
            this.showDeleteModal = false;
        },

        async onConfirmDelete() {
            this.isLoading = true;

            try {
                await this.bannerRepository.delete(this.banner.id);

                this.createNotificationSuccess({
                    message: this.$tc('lw-smart-banners.detail.successDelete')
                });

                this.$router.push({ name: 'lw.smart.banners.list' });
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.detail.errorDelete')
                });
            } finally {
                this.isLoading = false;
                this.showDeleteModal = false;
            }
        },

        onCancel() {
            this.$router.push({ name: 'lw.smart.banners.list' });
        }
    }
});

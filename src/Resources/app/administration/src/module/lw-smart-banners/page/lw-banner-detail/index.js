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
            showDeleteModal: false
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

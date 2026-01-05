import template from './lw-banner-list.html.twig';
import './lw-banner-list.scss';

const { Criteria } = Shopware.Data;

Shopware.Component.register('lw-banner-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Shopware.Mixin.getByName('notification')
    ],

    data() {
        return {
            banners: null,
            isLoading: false,
            total: 0,
            page: 1,
            limit: 25,
            sortBy: 'priority',
            sortDirection: 'DESC',
            searchTerm: '',
            filterType: null,
            filterActive: null
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    computed: {
        bannerRepository() {
            return this.repositoryFactory.create('lw_smart_banner');
        },

        bannerColumns() {
            return [
                {
                    property: 'name',
                    dataIndex: 'name',
                    label: this.$tc('lw-smart-banners.list.columnName'),
                    routerLink: 'lw.smart.banners.detail',
                    primary: true
                },
                {
                    property: 'type',
                    dataIndex: 'type',
                    label: this.$tc('lw-smart-banners.list.columnType')
                },
                {
                    property: 'priority',
                    dataIndex: 'priority',
                    label: this.$tc('lw-smart-banners.list.columnPriority'),
                    align: 'right'
                },
                {
                    property: 'active',
                    dataIndex: 'active',
                    label: this.$tc('lw-smart-banners.list.columnActive'),
                    align: 'center'
                }
            ];
        },

        bannerCriteria() {
            const criteria = new Criteria(this.page, this.limit);

            if (this.searchTerm) {
                criteria.setTerm(this.searchTerm);
            }

            if (this.sortBy) {
                criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection));
            }

            if (this.filterType) {
                criteria.addFilter(Criteria.equals('type', this.filterType));
            }

            if (this.filterActive !== null) {
                criteria.addFilter(Criteria.equals('active', this.filterActive));
            }

            return criteria;
        }
    },

    created() {
        this.loadBanners();
    },

    methods: {
        async loadBanners() {
            this.isLoading = true;

            try {
                const result = await this.bannerRepository.search(this.bannerCriteria);
                this.banners = result;
                this.total = result.total;
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.list.errorLoadingBanners')
                });
            } finally {
                this.isLoading = false;
            }
        },

        onSearch(searchTerm) {
            this.searchTerm = searchTerm;
            this.page = 1;
            this.loadBanners();
        },

        onPageChange({ page, limit }) {
            this.page = page;
            this.limit = limit;
            this.loadBanners();
        },

        onSortColumn(column) {
            if (this.sortBy === column.dataIndex) {
                this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
            } else {
                this.sortBy = column.dataIndex;
                this.sortDirection = 'DESC';
            }
            this.loadBanners();
        },

        onFilterType(type) {
            this.filterType = type;
            this.page = 1;
            this.loadBanners();
        },

        onFilterActive(active) {
            this.filterActive = active;
            this.page = 1;
            this.loadBanners();
        },

        onRefresh() {
            this.loadBanners();
        },

        async onDelete(id) {
            try {
                await this.bannerRepository.delete(id);
                this.createNotificationSuccess({
                    message: this.$tc('lw-smart-banners.list.successDelete')
                });
                this.loadBanners();
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.list.errorDelete')
                });
            }
        },

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
        },

        getTypeVariant(type) {
            const variantMap = {
                'info': 'info',
                'success': 'success',
                'warning': 'warning',
                'danger': 'danger'
            };
            return variantMap[type] || 'neutral';
        },

        async onInlineEditSave(item) {
            try {
                await this.bannerRepository.save(item);
                this.createNotificationSuccess({
                    message: this.$tc('lw-smart-banners.list.successSave')
                });
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.list.errorSave')
                });
            }
        }
    }
});

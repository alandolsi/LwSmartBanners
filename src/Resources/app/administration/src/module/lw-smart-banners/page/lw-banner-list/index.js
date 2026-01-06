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
            filterType: 'all',
            filterActive: 'all'
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

            if (this.filterType !== 'all') {
                criteria.addFilter(Criteria.equals('type', this.filterType));
            }

            if (this.filterActive !== 'all') {
                criteria.addFilter(Criteria.equals('active', this.filterActive === 'active'));
            }

            return criteria;
        },

        filterTypeOptions() {
            return [
                { value: 'all', label: this.$tc('lw-smart-banners.list.filterAllTypes') },
                { value: 'info', label: this.$tc('lw-smart-banners.detail.typeInfo') },
                { value: 'success', label: this.$tc('lw-smart-banners.detail.typeSuccess') },
                { value: 'warning', label: this.$tc('lw-smart-banners.detail.typeWarning') },
                { value: 'danger', label: this.$tc('lw-smart-banners.detail.typeDanger') }
            ];
        },

        filterActiveOptions() {
            return [
                { value: 'all', label: this.$tc('lw-smart-banners.list.filterAllStatuses') },
                { value: 'active', label: this.$tc('lw-smart-banners.list.filterActive') },
                { value: 'inactive', label: this.$tc('lw-smart-banners.list.filterInactive') }
            ];
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

        async onDuplicate(item) {
            const duplicated = this.bannerRepository.create(Shopware.Context.api);

            duplicated.name = `${item.name}${this.$tc('lw-smart-banners.list.copySuffix')}`;
            duplicated.content = item.content;
            duplicated.type = item.type;
            duplicated.priority = item.priority;
            duplicated.active = item.active;
            duplicated.cssClass = item.cssClass;
            duplicated.ruleId = item.ruleId;
            duplicated.activeFrom = item.activeFrom;
            duplicated.activeTo = item.activeTo;

            try {
                await this.bannerRepository.save(duplicated);
                this.createNotificationSuccess({
                    message: this.$tc('lw-smart-banners.list.successDuplicate')
                });

                this.$router.push({ name: 'lw.smart.banners.detail', params: { id: duplicated.id } });
            } catch (error) {
                this.createNotificationError({
                    message: this.$tc('lw-smart-banners.list.errorDuplicate')
                });
            }
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

import './page/lw-banner-list';
import './page/lw-banner-detail';
import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Shopware.Module.register('lw-smart-banners', {
    type: 'plugin',
    name: 'SmartBanners',
    title: 'lw-smart-banners.general.mainMenuItemGeneral',
    description: 'lw-smart-banners.general.description',
    color: '#ff3d58',
    icon: 'regular-megaphone',

    routes: {
        list: {
            component: 'lw-banner-list',
            path: 'list'
        },
        detail: {
            component: 'lw-banner-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'lw.smart.banners.list'
            }
        },
        create: {
            component: 'lw-banner-detail',
            path: 'create',
            meta: {
                parentPath: 'lw.smart.banners.list'
            }
        }
    },

    navigation: [{
        label: 'lw-smart-banners.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'lw.smart.banners.list',
        icon: 'regular-megaphone',
        parent: 'sw-content',
        position: 100
    }],

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    }
});

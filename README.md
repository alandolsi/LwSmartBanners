# LwSmartBanners

**Smart Banners – Rule-based Store Messages for Shopware 6**

Professional plugin for displaying contextual banners in your Shopware 6 storefront based on Shopware's native rule system.

---

## 🎯 Features

- **Rule-based Targeting**: Use Shopware's powerful rule builder for precise banner control
- **4 Banner Types**: Info, Success, Warning, and Danger styles
- **Smart Scheduling**: Set active-from and active-to dates
- **Priority System**: Control display order with priority values
- **Custom Styling**: Add custom CSS classes per banner
- **HTML Content**: Rich text formatting support
- **Seamless Integration**: Works with any Shopware 6.6+ and 6.7+ theme

---

## 📋 Requirements

- Shopware 6.6.0 or higher
- PHP 8.1 or higher
- MySQL 5.7+ or MariaDB 10.3+

---

## 🚀 Installation

### Via Composer (Recommended)

```bash
composer require landolsi-webdesign/lw-smart-banners
bin/console plugin:refresh
bin/console plugin:install --activate LwSmartBanners
bin/console cache:clear
```

### Via ZIP Upload

1. Download the latest release
2. Upload via Shopware Administration → Extensions → My Extensions → Upload extension
3. Install and activate the plugin

### Manual Installation

```bash
# Clone into custom/plugins directory
cd custom/plugins
git clone https://github.com/alandolsi/LwSmartBanners.git
cd ../..

# Install and activate
bin/console plugin:refresh
bin/console plugin:install --activate LwSmartBanners
bin/console cache:clear
bin/console theme:compile
```

---

## 📖 Usage

### Managing Banners (v0.2.0+ - Administration UI)

1. Go to **Administration → Content → Smart Banners**
2. Click **Add banner**
3. Fill the required fields:
   - **Name**
   - **Type** (info/success/warning/danger)
   - **Content** (HTML is supported)
4. Optional fields:
   - **Rule** (banner shows only if the selected Shopware rule matches)
   - **Priority** (higher = shown first)
   - **Active from / Active to** (schedule)
   - **CSS class** (custom styling)

### Listing Features

- Search by name
- Filter by **Type** and **Status** (active/inactive)
- **Duplicate** banner from the row actions menu

### Edit / Delete

- Open a banner to edit and click **Save**
- **Delete** is available in the detail view (with confirmation)
- Validation prevents saving if required fields are missing

### Where Banners Are Shown (Default)

- Below the header navigation
- Offcanvas cart
- Cart page
- Checkout confirm + finish

> Note: Cart-based rules (e.g. cart total >= 50€) only match when products are in the cart; they won’t match on a product detail page.

---

## 🗄️ Database Schema

| Field        | Type         | Description                    |
|--------------|--------------|--------------------------------|
| id           | BINARY(16)   | Primary key                    |
| active       | TINYINT(1)   | Active status                  |
| name         | VARCHAR(255) | Internal name                  |
| content      | LONGTEXT     | HTML content                   |
| type         | VARCHAR(50)  | Banner type                    |
| css_class    | VARCHAR(255) | Custom CSS classes             |
| rule_id      | BINARY(16)   | Shopware rule FK (optional)    |
| priority     | INT(11)      | Display priority (higher first)|
| active_from  | DATETIME(3)  | Start date/time                |
| active_to    | DATETIME(3)  | End date/time                  |
| created_at   | DATETIME(3)  | Created timestamp              |
| updated_at   | DATETIME(3)  | Updated timestamp              |

---

## 🎨 Customization

### Custom Styles

Add custom CSS classes to your banner:

```sql
UPDATE lw_smart_banner 
SET css_class = 'my-custom-banner' 
WHERE id = UNHEX('...');
```

Then define styles in your theme:

```scss
.lw-smart-banner.my-custom-banner {
    background: linear-gradient(45deg, #ff6b6b, #ee5a6f);
    color: white;
    font-weight: bold;
}
```

### Banner Position

Default position is below the header. Override the template to change:

```twig
{# YourTheme/views/storefront/layout/header/header.html.twig #}
{% sw_extends '@LwSmartBanners/storefront/layout/header/header.html.twig' %}

{% block layout_header_navigation %}
    {{ parent() }}
    {# Banners render here by default #}
{% endblock %}
```

---

## 🗺️ Roadmap

### v0.2.0 - Admin UI (Released)
- Administration module for banner management
- Listing with search/filters and duplicate action
- Create/Edit form with validation
- Delete with confirmation
- Rule selector integration

### v0.3.0 - Testing & Polish
**Target**: 1-2 weeks after v0.2.0  
- Unit and integration tests
- Code quality improvements
- Bug fixes
- Documentation

### v1.0.0 - First Stable Release 🚀
**Target**: 6-8 weeks (Shopware Store ready)  
- Production-ready admin interface
- Complete test coverage
- Full documentation
- Store publication

### v1.1.0 - Enhanced UI
- Rich text editor for content
- Banner preview
- Drag & drop priority sorting

### v1.2.0 - Advanced Features
- Banner templates
- Custom positions (header, footer, sidebar)
- Categories and tags

### v2.0.0 - Analytics & Multi-Language
- Multi-language content support
- Banner analytics (impressions, clicks)
- A/B testing
- Advanced scheduling

### v3.0.0 - Marketing Automation
- Personalization features
- Marketing tool integrations
- REST API
- Advanced analytics dashboard

---

## 🧪 Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/alandolsi/LwSmartBanners.git
cd LwSmartBanners

# For development in existing Shopware project:
# Create symlink in custom/plugins
ln -s /path/to/LwSmartBanners /path/to/shopware/custom/plugins/LwSmartBanners

# Install and test
bin/console plugin:refresh
bin/console plugin:install --activate LwSmartBanners
bin/console cache:clear
```

### Running Tests

```bash
# Unit tests (coming in v1.1)
vendor/bin/phpunit
```

---

## 📄 License

Proprietary - © 2026 Landolsi Webdesign. All rights reserved.

---

## 🤝 Support

- **Email**: info@landolsi.de
- **Website**: https://landolsi.de
- **Issues**: https://github.com/alandolsi/LwSmartBanners/issues

---

## 🏆 Quality

This plugin follows:
- Shopware 6 coding standards
- PSR-12 coding style
- SOLID principles
- Clean code practices

Tested and optimized for Shopware Store publication.

---

**Built with ❤️ by Landolsi Webdesign**

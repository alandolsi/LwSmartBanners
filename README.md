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

### Creating Banners (v0.1.0 - Database Only)

Currently in v0.1.0, banners are created directly in the database. Administration UI will be available in v0.2.0.

```sql
INSERT INTO lw_smart_banner (
    id,
    active,
    name,
    content,
    type,
    priority,
    active_from,
    active_to,
    created_at
) VALUES (
    UNHEX(REPLACE(UUID(), '-', '')),
    1,
    'Welcome Banner',
    '<p><strong>Welcome!</strong> Get 10% off with code: <strong>WELCOME10</strong></p>',
    'info',
    100,
    NOW(),
    DATE_ADD(NOW(), INTERVAL 30 DAY),
    NOW()
);
```

### Banner Types

- `info` - Blue background for informational messages
- `success` - Green background for positive messages  
- `warning` - Yellow background for warnings
- `danger` - Red background for critical messages

### Rule Integration

1. Create a rule in Shopware Admin (Marketing → Promotions → Create Rule)
2. Copy the rule ID
3. Set `rule_id` in your banner to the rule's ID
4. The banner will only display when the rule matches

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

### v0.2.0 - Admin UI (Next Release)
**Target**: 2-3 weeks  
- Administration UI for CRUD operations
- Banner list view with sorting
- Create/Edit forms
- Delete functionality
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

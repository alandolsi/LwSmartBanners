# Development Guide - LwSmartBanners

**Version**: 0.1.0 (Alpha)  
**Last Updated**: 2026-01-04

---

## 🎯 Quick Start Summary

### Project Type
- Premium Shopware 6 plugin
- Rule-based banner system
- Target: Shopware Store publication

### Current Version Strategy
- Start: **v0.1.0** (Alpha)
- Next: **v0.2.0** (Admin UI)
- Goal: **v1.0.0** (Production Ready)

### Development Method
**Git Clone Workflow** (Professional approach)

```bash
# In your Shopware installation
cd custom/plugins
git clone <your-repository-url> LwSmartBanners

# Work directly in the cloned repository
cd LwSmartBanners
# Make changes, commit, push
```

**Advantages:**
- ✅ Direct Git integration
- ✅ No copying needed
- ✅ Standard development practice
- ✅ Works with all Git workflows

---

## 🔄 Development Workflow

### Daily Workflow

```bash
# 1. Start your development environment
cd <shopware-root>
# Start ddev/docker/etc.

# 2. Work in the plugin
cd custom/plugins/LwSmartBanners
# Edit files in src/

# 3. Test changes
cd <shopware-root>
bin/console cache:clear
bin/console theme:compile  # if needed

# 4. Commit & Push
cd custom/plugins/LwSmartBanners
git add .
git commit -m "feat: description"
git push origin main
```

### After Code Changes

```bash
# For PHP changes
bin/console cache:clear

# For template/SCSS changes
bin/console theme:compile

# For structure changes (new services, etc.)
bin/console plugin:uninstall LwSmartBanners
bin/console plugin:install --activate LwSmartBanners
bin/console cache:clear
```

---

## 📦 Version Release Process

### Example: v0.1.0 → v0.2.0

```bash
# 1. Update version in composer.json
# "version": "0.2.0"

# 2. Update CHANGELOG.md
# Move items from "Unreleased" to "[0.2.0] - YYYY-MM-DD"

# 3. Commit version bump
git add composer.json CHANGELOG.md
git commit -m "chore: release v0.2.0"

# 4. Create Git tag
git tag -a v0.2.0 -m "Release v0.2.0: Admin UI"

# 5. Push with tags
git push origin main --tags
```

---

## 🎯 Commit Message Convention

Use **Conventional Commits**:

```
feat: add new feature
fix: bug fix
docs: documentation only
style: formatting, missing semicolons, etc.
refactor: code restructuring
test: adding tests
chore: build tasks, dependencies
```

**Examples:**
```bash
git commit -m "feat: add banner type validation"
git commit -m "fix: banner not showing on mobile"
git commit -m "docs: update installation guide"
```

---

## 🗄️ Database Testing

### Create Test Banner

```bash
bin/console dbal:run-sql "
INSERT INTO lw_smart_banner (
    id, active, name, content, type, priority, 
    active_from, active_to, created_at
) VALUES (
    UNHEX(REPLACE(UUID(), '-', '')), 
    1, 
    'Test Banner', 
    '<p><strong>Test Banner</strong> - This is a test message</p>', 
    'info', 
    100, 
    NOW(), 
    DATE_ADD(NOW(), INTERVAL 30 DAY), 
    NOW()
);
"
```

### View Banners

```bash
bin/console dbal:run-sql "
SELECT HEX(id) as id, active, name, type, priority 
FROM lw_smart_banner 
ORDER BY priority DESC;
"
```

---

## 🏗️ Architecture Overview

### Directory Structure

```
LwSmartBanners/
├── composer.json                    # Plugin metadata, version
├── CHANGELOG.md                     # Version history
├── README.md                        # Public documentation
├── LICENSE                          # MIT License
└── src/
    ├── LwSmartBanners.php          # Main plugin class
    ├── Core/
    │   └── Content/Banner/         # Entity layer
    ├── Migration/                   # Database migrations
    ├── Service/                     # Business logic
    ├── Storefront/                  # Frontend integration
    └── Resources/
        ├── config/                  # Service definitions
        ├── views/                   # Twig templates
        └── app/storefront/          # JS & SCSS
```

### Key Classes

- **BannerEntity**: Data model
- **BannerDefinition**: DAL schema
- **BannerMatchingService**: Rule evaluation logic
- **BannerPageSubscriber**: Storefront integration

---

## 🧪 Testing Checklist

### Manual Testing

- [ ] Plugin installs without errors
- [ ] Plugin activates successfully
- [ ] Database table created
- [ ] Test banner displays in storefront
- [ ] Banner types render correctly (info, success, warning, danger)
- [ ] Priority sorting works
- [ ] Date scheduling works (active_from/active_to)
- [ ] Cache clear doesn't break anything

### Before Release

- [ ] All features tested
- [ ] CHANGELOG.md updated
- [ ] composer.json version bumped
- [ ] No debug code left
- [ ] No console.log statements
- [ ] All TODOs addressed or documented
- [ ] Git tag created

---

## 📋 Roadmap

### v0.1.0 - Alpha ✅ Current
- ✅ Core functionality
- ✅ Database schema
- ✅ Storefront rendering
- ⚠️ No admin UI (manual SQL only)

### v0.2.0 - Admin UI (Beta)
**Target**: 2-3 weeks  
**Goal**: Shopware Store minimum requirements

- [ ] Administration CRUD controller
- [ ] Banner listing (data table)
- [ ] Create/Edit forms
- [ ] Form validation
- [ ] Rule selector integration

### v0.3.0 - Testing & Polish (RC)
**Target**: 1-2 weeks after v0.2.0  
**Goal**: Production ready

- [ ] Unit tests
- [ ] Integration tests
- [ ] Code quality checks
- [ ] Performance optimization
- [ ] Bug fixes
- [ ] Complete documentation

### v1.0.0 - First Stable Release 🎯
**Target**: 6-8 weeks total  
**Goal**: Shopware Store publication

- [ ] Complete feature set for v1.0.0
- [ ] Full test coverage
- [ ] Production ready
- [ ] Store submission

### Post-Release

**v1.1.0** - Rich text editor, banner preview, drag & drop  
**v1.2.0** - Templates, custom positions, categories  
**v2.0.0** - Analytics, multi-language, A/B testing  
**v3.0.0** - Marketing automation, advanced analytics

---

## 🔐 Security Notes

### Never Commit
- ❌ Database credentials
- ❌ API keys
- ❌ Personal paths
- ❌ `.env` files
- ❌ `vendor/` directory
- ❌ `node_modules/`

### Always Check
- ✅ Input validation
- ✅ XSS protection (Twig auto-escape)
- ✅ SQL injection prevention (use DAL)
- ✅ ACL permissions (future)

---

## 📚 Resources

### Shopware Documentation
- [Developer Portal](https://developer.shopware.com/)
- [Plugin Development Guide](https://developer.shopware.com/docs/guides/plugins/)
- [DAL Documentation](https://developer.shopware.com/docs/guides/plugins/plugins/framework/data-handling/)
- [Storefront Development](https://developer.shopware.com/docs/guides/plugins/plugins/storefront/)

### Best Practices
- Follow PSR-12 coding standards
- Use Shopware's dependency injection
- Write clean, testable code
- Document complex logic
- Keep commits atomic and focused

---

## 🐛 Troubleshooting

### Plugin not recognized
```bash
bin/console plugin:refresh
bin/console cache:clear
```

### Changes not visible
```bash
bin/console cache:clear
bin/console theme:compile
# Browser: Hard refresh (Ctrl+Shift+R)
```

### Database errors
```bash
bin/console database:migrate --all LwSmartBanners
```

### Git conflicts
```bash
git status
git diff
# Resolve conflicts, then:
git add .
git commit -m "fix: resolve conflicts"
```

---

## 💡 Pro Tips

1. **Commit often**: Small, focused commits are easier to review and revert
2. **Test before commit**: Always test your changes before committing
3. **Update CHANGELOG**: Keep it current as you work
4. **Use branches**: For larger features, create feature branches
5. **Tag releases**: Use semantic versioning tags

---

## ✅ Pre-Commit Checklist

Before committing code:

- [ ] Code follows PSR-12 standards
- [ ] No syntax errors
- [ ] Cache cleared and tested
- [ ] Commit message follows convention
- [ ] No debug code left
- [ ] CHANGELOG.md updated (if needed)

Before releasing:

- [ ] Version bumped in composer.json
- [ ] CHANGELOG.md updated with release notes
- [ ] All tests pass (when available)
- [ ] Git tag created
- [ ] GitHub release created

---

**Happy Coding! 🚀**

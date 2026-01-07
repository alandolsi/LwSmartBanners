# Changelog

All notable changes to LwSmartBanners will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.1] - 2026-01-07

### Added
- Admin: banner display mode (inline/overlay) and overlay alignment settings
- Storefront: global overlay/toast banner rendering with alignment (top-left/top-center/top-right, middle-left/middle-right, bottom-left/bottom-center/bottom-right)

### Changed
- Inline placements no longer render overlay banners (prevents duplicates)

## [0.4.0] - 2026-01-07

### Added
- Admin: per-banner placement selection (header, offcanvas cart, cart, checkout confirm/finish, PDP)
- Storefront: banner rendering filtered by configured placement

### Changed
- Backward compatible behavior: if placements are empty, banner is shown everywhere (legacy)

## [0.2.2] - 2026-01-06

### Added
- Storefront: show banners in offcanvas cart, cart, checkout confirm and finish

### Fixed
- Storefront: cart-based rule matching now uses CartService (reliable cart context)

## [0.2.1] - 2026-01-06

### Added
- Admin: delete banner from detail view (with confirmation)

### Fixed
- Admin: prevent saving banners with missing required fields

## [0.2.0] - 2026-01-06

### Added
- Admin: banner listing filters (type + active status)
- Admin: duplicate banner action from listing

### Changed
- Administration build artifacts updated for release (vite manifest/assets)

## [0.1.3] - 2026-01-05

### Added
- Admin: rule selector in banner detail form to target banners using Shopware rules

## [0.1.2] - 2026-01-05

### Fixed
- Admin: banner listing now updates the "Active" state correctly (list + detail)
- Admin: remove unwanted/empty listing spacer column and fix clipped action texts
- Admin: allow toggling active state by clicking the status icon

### Chore
- Removed debug/hotfix artifacts from the plugin bundle

## [0.1.1] - 2026-01-04

### Fixed
- Fixed timezone mismatch causing banners not to display
- Changed date filtering from database criteria to PHP-level filtering
- Now explicitly uses UTC timezone to match database timezone
- Ensures consistent behavior regardless of server timezone configuration

## [0.1.0] - 2026-01-04

### Added
- Initial development release (Alpha)
- Banner entity with database schema
- Integration with Shopware rule system
- Banner matching service for rule evaluation
- Storefront subscriber for automatic rendering
- Support for 4 banner types (info, success, warning, danger)
- Priority-based sorting
- Date/time scheduling (active_from, active_to)
- Custom CSS class support
- HTML content support
- Responsive SCSS styling
- Database migration
- Shopware 6.6+ and 6.7+ compatibility

### Notes
- ⚠️ Alpha version - not production ready
- Database-only banner management (no admin UI yet)
- Breaking changes possible in future versions

---

## Planned Releases

### v0.2.0 - Admin UI (Beta)
**Target**: 2-3 weeks after v0.1.0  
**Goal**: Shopware Store minimum requirements

- [ ] Administration CRUD controller
- [ ] Banner listing (data table)
- [ ] Create/Edit form
- [ ] Delete functionality
- [ ] Basic form validation
- [x] Shopware rule selector integration
- [ ] Banner type dropdown
- [ ] Priority number input
- [ ] Date/time inputs (HTML5)

**Scope**: Simple HTML textarea for content (no rich text editor yet)

### v0.3.0 - Testing & Polish (Release Candidate)
**Target**: 1-2 weeks after v0.2.0  
**Goal**: Production ready

- [ ] Unit tests for core services
- [ ] Integration tests
- [ ] Code quality checks (PHPStan Level 8)
- [ ] Performance optimization
- [ ] Bug fixes from beta testing
- [ ] Complete documentation
- [ ] Shopware Store screenshots and description
- [ ] Final QA testing

### v1.0.0 - First Stable Release 🚀
**Target**: 6-8 weeks after v0.1.0  
**Goal**: Shopware Store publication

**Release Criteria**:
- ✅ Complete admin UI
- ✅ All tests passing
- ✅ No known bugs
- ✅ Documentation complete
- ✅ Shopware Store QA approved

**Features**:
- Admin UI for banner management
- Rule-based targeting
- 4 banner types with styling
- Priority system
- Date/time scheduling
- Responsive storefront design
- Professional documentation

---

## Post-Release Roadmap

### v1.1.0 - Enhanced UI
**Target**: After v1.0.0 launch  
**Goal**: Improve user experience

- [ ] Rich text editor for content (TinyMCE/CKEditor)
- [ ] Banner preview in admin
- [ ] Drag & drop priority sorting
- [ ] Duplicate banner function
- [ ] Bulk actions (activate/deactivate)

### v1.2.0 - Advanced Features
**Target**: 2-3 months after v1.0.0  
**Goal**: Premium features

- [ ] Banner templates (predefined layouts)
- [ ] Custom banner positions (header, footer, sidebar)
- [ ] Banner categories/tags
- [ ] Export/import functionality
- [ ] Banner scheduling improvements

### v2.0.0 - Analytics & Multi-Language
**Target**: 6+ months after v1.0.0  
**Goal**: Enterprise features

- [ ] Multi-language banner content
- [ ] Banner analytics (impressions, clicks)
- [ ] A/B testing capabilities
- [ ] Advanced scheduling (weekdays, time ranges)
- [ ] Performance dashboard
- [ ] Conversion tracking

### v3.0.0 - Marketing Automation
**Target**: 12+ months after v1.0.0  
**Goal**: Advanced marketing features

- [ ] Personalization (customer group specific)
- [ ] Dynamic content (placeholders)
- [ ] Integration with marketing tools
- [ ] REST API for external systems
- [ ] Advanced analytics and reporting

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2024-01-20

### Fixed
- Fixed GitHub release pipeline NPM authentication issue
- Resolved `ENEEDAUTH` error in automated publishing workflow
- Fixed package.json repository URL format for proper NPM integration

### Changed
- Updated README.md with correct GitHub repository URLs
- Improved CDN installation instructions with version-specific links
- Enhanced documentation with pipeline status badges
- Updated support links and author information

### Infrastructure
- Configured NPM_TOKEN secret for automated publishing
- Cleaned up previous releases for stable version deployment
- Improved CI/CD pipeline reliability
- Added automated release workflow verification

### Added
- Initial release of LucidAlerts
- Modern alert and notification system
- Auto dark/light mode support
- Responsive design for all screen sizes
- Promise-based API
- Custom form support with validation
- Multiple alert types (success, error, warning, info, question)
- Toast notifications with positioning
- Theme management system
- Comprehensive API with utility methods
- ES6 modules, CommonJS, and browser script support
- CDN distribution ready
- TypeScript definitions
- Comprehensive documentation

### Features
- Single file usage (no separate CSS required)
- Lightweight footprint (~15KB minified)
- No external dependencies
- Full customization options
- Keyboard and accessibility support
- Auto-close timers
- Custom CSS classes
- Event callbacks
- Progress indicators for notifications

## [1.0.0] - 2024-01-XX

### Added
- Initial stable release
- Core alert functionality
- Notification system
- Theme support
- Form inputs
- Documentation
- Demo page
- NPM package configuration
- CDN distribution setup

---

## Release Notes

### Version 1.1.1 (Current Stable)
This release focuses on infrastructure improvements and pipeline reliability. The GitHub release workflow now properly publishes to NPM with automated authentication, ensuring consistent and reliable releases.

### Version 1.0.0
This is the initial stable release of LucidAlerts, providing a modern alternative to traditional alert libraries with built-in dark mode support and responsive design.

### Upcoming Features
- Animation customization
- Sound notifications
- Plugin system
- Additional form input types
- Advanced positioning options
- Batch operations
- Performance optimizations
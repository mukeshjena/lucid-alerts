# LucidAlerts Maintenance Guide

This guide provides comprehensive instructions for maintaining the LucidAlerts open-source library, including handling contributions, managing releases, and publishing to NPM.

## 📋 Table of Contents

- [Overview](#overview)
- [Repository Management](#repository-management)
- [Handling Contributions](#handling-contributions)
- [Code Review Process](#code-review-process)
- [Release Management](#release-management)
- [NPM Publishing](#npm-publishing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 Overview

LucidAlerts follows a standard open-source maintenance workflow:

1. **Contributors** submit pull requests
2. **Maintainers** review and merge approved changes
3. **Automated pipelines** handle building and testing
4. **Release process** creates new versions and publishes to NPM
5. **Documentation** is updated to reflect changes

## 🏗️ Repository Management

### Repository Structure

```
lucid-alerts/
├── .github/                 # GitHub workflows and templates
│   ├── workflows/
│   │   ├── ci.yml          # Continuous Integration
│   │   └── release.yml     # Release automation
│   └── ISSUE_TEMPLATE/     # Issue templates
├── src/                    # Source code
├── dist/                   # Built files
├── demo/                   # Demo application
├── docs/                   # Documentation
├── test/                   # Test files
├── CONTRIBUTING.md         # Contribution guidelines
├── MAINTENANCE.md          # This file
├── CHANGELOG.md           # Version history
└── README.md              # Project documentation
```

### Branch Strategy

- **`main`** - Production-ready code, protected branch
- **`develop`** - Integration branch for features (optional)
- **Feature branches** - `feature/description`
- **Hotfix branches** - `hotfix/description`
- **Release branches** - `release/v1.x.x`

### Branch Protection Rules

Configure these rules for the `main` branch:

1. **Require pull request reviews** (at least 1 approval)
2. **Require status checks** (CI must pass)
3. **Require branches to be up to date**
4. **Restrict pushes** (only maintainers)
5. **Require linear history** (optional)

## 🤝 Handling Contributions

### 1. Receiving Pull Requests

When a contributor submits a PR:

```bash
# 1. Review the PR description and changes
# 2. Check if CI/CD passes
# 3. Test locally if needed

# Clone the contributor's branch
git fetch origin pull/PR_NUMBER/head:pr-branch-name
git checkout pr-branch-name

# Test the changes
npm install
npm run build:all
npm run test
npm run demo
```

### 2. Code Review Checklist

**Functionality:**
- [ ] Does the code work as intended?
- [ ] Are edge cases handled?
- [ ] Is error handling appropriate?
- [ ] Are there any breaking changes?

**Code Quality:**
- [ ] Follows existing code style
- [ ] Has appropriate comments/documentation
- [ ] No console.log or debug code
- [ ] Efficient and readable

**Testing:**
- [ ] Includes tests for new functionality
- [ ] All existing tests pass
- [ ] Manual testing completed

**Documentation:**
- [ ] README updated if needed
- [ ] API documentation updated
- [ ] CHANGELOG entry added

### 3. Merging Pull Requests

```bash
# Option 1: Merge via GitHub UI (recommended)
# - Use "Squash and merge" for feature PRs
# - Use "Merge commit" for release PRs

# Option 2: Command line merge
git checkout main
git pull origin main
git merge --no-ff feature-branch
git push origin main
```

### 4. Post-Merge Actions

1. **Delete feature branch** (if from main repo)
2. **Update project board** (if using GitHub Projects)
3. **Notify contributors** (comment on PR)
4. **Plan next release** (if significant changes)

## 🔍 Code Review Process

### Review Guidelines

**For Maintainers:**
- Be constructive and helpful in feedback
- Explain the "why" behind requested changes
- Approve when ready, request changes when needed
- Test complex changes locally

**Review Timeline:**
- **Small fixes:** 1-2 days
- **Features:** 3-5 days
- **Major changes:** 1-2 weeks

### Common Review Comments

```markdown
# Code Style
"Please follow the existing code formatting. Run `npm run format` to auto-format."

# Testing
"Could you add a test case for this new functionality?"

# Documentation
"Please update the README with usage examples for this new feature."

# Performance
"This could be optimized by caching the result. Consider storing it in a variable."

# Breaking Changes
"This is a breaking change. We should increment the major version and document it clearly."
```

## 🚀 Release Management

### Release Types

Follow [Semantic Versioning](https://semver.org/):

- **Major (x.0.0)** - Breaking changes
- **Minor (1.x.0)** - New features, backward compatible
- **Patch (1.1.x)** - Bug fixes, backward compatible

### Release Process

#### 1. Pre-Release Preparation

```bash
# 1. Ensure main branch is up to date
git checkout main
git pull origin main

# 2. Run full test suite
npm run test
npm run build:all

# 3. Update documentation
# - Update CHANGELOG.md
# - Update README.md if needed
# - Update version in package.json (done automatically by npm version)
```

#### 2. Create Release

```bash
# For patch release (bug fixes)
npm version patch

# For minor release (new features)
npm version minor

# For major release (breaking changes)
npm version major

# This automatically:
# - Updates package.json version
# - Creates a git commit
# - Creates a git tag
# - Runs the build process (via npm version script)
```

#### 3. Push Release

```bash
# Push the version commit and tag
git push origin main
git push origin v1.x.x

# The release workflow will automatically:
# - Build the project
# - Create GitHub release
# - Publish to NPM
```

#### 4. Post-Release Actions

1. **Verify NPM publication:**
   ```bash
   npm view lucid-alerts version
   npm view lucid-alerts
   ```

2. **Check GitHub release:**
   ```bash
   gh release list
   gh release view v1.x.x
   ```

3. **Update demo site** (if needed)
4. **Announce release** (social media, discussions)

### Emergency Hotfix Process

For critical bugs in production:

```bash
# 1. Create hotfix branch from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# 2. Make the fix
# ... make changes ...

# 3. Test thoroughly
npm run test
npm run build:all

# 4. Commit and push
git add .
git commit -m "fix: resolve critical security issue"
git push origin hotfix/critical-bug-fix

# 5. Create PR and merge immediately after review
# 6. Create patch release
npm version patch
git push origin main
git push origin v1.x.x
```

## 📦 NPM Publishing

### NPM Configuration

#### 1. NPM Token Setup

```bash
# Generate NPM token (Automation type)
# 1. Go to https://www.npmjs.com/settings/tokens
# 2. Create new token with "Automation" type
# 3. Add to GitHub secrets as NPM_TOKEN

# Verify token locally (for testing)
npm whoami
```

#### 2. Package Configuration

Ensure `package.json` has correct settings:

```json
{
  "name": "lucid-alerts",
  "version": "1.x.x",
  "description": "...",
  "main": "dist/lucid-alerts.js",
  "module": "dist/lucid-alerts.esm.js",
  "browser": "dist/lucid-alerts.min.js",
  "types": "dist/lucid-alerts.d.ts",
  "files": [
    "dist/",
    "src/",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],
  "publishConfig": {
    "access": "public"
  }
}
```

### Manual Publishing (Emergency)

If automated publishing fails:

```bash
# 1. Build the project
npm run build:all

# 2. Login to NPM
npm login

# 3. Publish
npm publish

# 4. Verify publication
npm view lucid-alerts version
```

### NPM Package Management

```bash
# Check package info
npm view lucid-alerts

# Check download stats
npm view lucid-alerts --json | jq '.downloads'

# Deprecate old version (if needed)
npm deprecate lucid-alerts@1.0.0 "Please upgrade to latest version"

# Unpublish (only within 72 hours, use carefully)
npm unpublish lucid-alerts@1.0.0
```

## ⚙️ CI/CD Pipeline

### GitHub Actions Workflows

#### 1. CI Workflow (`.github/workflows/ci.yml`)

Triggers on:
- Push to main
- Pull requests
- Manual dispatch

Actions:
- Install dependencies
- Run linting
- Run tests
- Build project
- Upload artifacts

#### 2. Release Workflow (`.github/workflows/release.yml`)

Triggers on:
- Tag push (v*.*.*)

Actions:
- Build project
- Create GitHub release
- Upload release assets
- Publish to NPM

### Pipeline Monitoring

```bash
# Check workflow status
gh run list --limit 10

# View specific workflow
gh run view RUN_ID

# Re-run failed workflow
gh run rerun RUN_ID

# Check secrets
gh secret list
```

### Pipeline Troubleshooting

**Common Issues:**

1. **NPM Authentication Failed**
   ```bash
   # Check NPM_TOKEN secret
   gh secret list
   # Regenerate token if needed
   ```

2. **Build Failures**
   ```bash
   # Test locally
   npm run build:all
   # Check for missing dependencies
   ```

3. **Test Failures**
   ```bash
   # Run tests locally
   npm test
   # Check for environment differences
   ```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Merge Conflicts

```bash
# Update your branch with latest main
git checkout feature-branch
git fetch upstream
git rebase upstream/main

# Resolve conflicts manually
# Then continue rebase
git rebase --continue
```

#### 2. Failed Releases

```bash
# Check what went wrong
gh run view --log

# Common fixes:
# - Regenerate NPM_TOKEN
# - Fix build errors
# - Update dependencies
```

#### 3. NPM Publishing Issues

```bash
# Check package status
npm view lucid-alerts

# Verify authentication
npm whoami

# Check for version conflicts
npm view lucid-alerts versions --json
```

#### 4. Git Tag Issues

```bash
# List all tags
git tag -l

# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin --delete v1.0.0

# Create new tag
git tag v1.0.1
git push origin v1.0.1
```

## 📋 Best Practices

### For Maintainers

1. **Regular Maintenance**
   - Review PRs promptly
   - Keep dependencies updated
   - Monitor security alerts
   - Update documentation

2. **Communication**
   - Be responsive to contributors
   - Provide clear feedback
   - Document decisions
   - Maintain project roadmap

3. **Quality Control**
   - Maintain test coverage
   - Follow semantic versioning
   - Keep changelog updated
   - Review breaking changes carefully

### Release Schedule

- **Patch releases:** As needed for bug fixes
- **Minor releases:** Monthly or bi-monthly
- **Major releases:** Quarterly or as needed

### Security

1. **Dependency Updates**
   ```bash
   # Check for vulnerabilities
   npm audit
   
   # Fix automatically
   npm audit fix
   
   # Update dependencies
   npm update
   ```

2. **Security Alerts**
   - Enable GitHub security alerts
   - Review Dependabot PRs promptly
   - Monitor NPM advisories

### Documentation Maintenance

1. **Keep Updated**
   - README.md with latest features
   - API documentation
   - CHANGELOG.md for all releases
   - Examples and demos

2. **Version Documentation**
   - Tag documentation versions
   - Maintain migration guides
   - Document breaking changes

## 📞 Support and Resources

### Useful Commands Reference

```bash
# Development
npm run dev                 # Start development mode
npm run build              # Build project
npm run build:all          # Build and minify
npm run test               # Run tests
npm run demo               # Start demo server

# Git
git remote -v              # Check remotes
git branch -a              # List all branches
git log --oneline -10      # Recent commits

# GitHub CLI
gh pr list                 # List pull requests
gh issue list              # List issues
gh release list            # List releases
gh run list                # List workflow runs

# NPM
npm view lucid-alerts      # Package info
npm outdated               # Check outdated deps
npm audit                  # Security audit
```

### External Resources

- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

## 🎉 Conclusion

This guide should help you maintain LucidAlerts effectively. Remember:

- **Be responsive** to the community
- **Maintain quality** standards
- **Document everything** clearly
- **Automate** repetitive tasks
- **Communicate** changes effectively

For questions or suggestions about this guide, please open an issue or discussion on GitHub.

**Happy maintaining! 🚀**
# Contributing to LucidAlerts

Thank you for your interest in contributing to LucidAlerts! We welcome contributions from everyone and are grateful for every contribution, no matter how small.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Git

### Setting Up Your Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/yourusername/lucid-alerts.git
   cd lucid-alerts
   
   # Add upstream remote to keep your fork updated
   git remote add upstream https://github.com/mukeshjena/lucid-alerts.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development mode**
   ```bash
   npm run dev
   ```

4. **Run the demo**
   ```bash
   npm run demo
   ```

## 📋 Development Workflow

### Branch Naming Convention

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation updates
- `refactor/description` - for code refactoring
- `test/description` - for adding tests

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build:all
   npm run demo
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your branch and provide a clear description

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - new features
- `fix:` - bug fixes
- `docs:` - documentation changes
- `style:` - formatting, missing semicolons, etc.
- `refactor:` - code refactoring
- `test:` - adding tests
- `chore:` - maintenance tasks

Examples:
```
feat: add notification positioning options
fix: resolve theme switching bug
docs: update API documentation
style: format code according to prettier rules
```

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Add tests for all new functionality
- Ensure existing tests pass
- Aim for good test coverage
- Test both success and error cases

### Manual Testing

1. Test in different browsers (Chrome, Firefox, Safari, Edge)
2. Test responsive design on various screen sizes
3. Test dark/light mode switching
4. Test keyboard navigation and accessibility

## 📚 Code Style

### JavaScript Style Guide

- Use ES6+ features
- Follow existing code formatting
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### CSS Style Guide

- Use CSS custom properties for theming
- Follow BEM methodology for class naming
- Ensure responsive design
- Support both dark and light themes

## 🐛 Reporting Bugs

### Before Submitting a Bug Report

1. Check if the bug has already been reported
2. Ensure you're using the latest version
3. Test in multiple browsers if possible

### Bug Report Template

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g. Chrome 91]
- OS: [e.g. Windows 10]
- LucidAlerts version: [e.g. 1.0.0]

**Additional context**
Any other context about the problem.
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Other solutions you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## 📖 Documentation

### Updating Documentation

- Update README.md for API changes
- Update JSDoc comments in code
- Add examples for new features
- Update CHANGELOG.md

### Documentation Style

- Use clear, concise language
- Provide code examples
- Include expected outputs
- Use proper markdown formatting

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

### High Priority
- Bug fixes
- Performance improvements
- Accessibility enhancements
- Browser compatibility fixes

### Medium Priority
- New alert types
- Animation improvements
- Additional form input types
- Plugin system development

### Low Priority
- Documentation improvements
- Example applications
- Translations
- Design enhancements

## 🔍 Code Review Process

1. **Automated Checks**
   - All tests must pass
   - Code must build successfully
   - No linting errors

2. **Manual Review**
   - Code quality and style
   - Documentation completeness
   - Test coverage
   - Performance impact

3. **Approval Process**
   - At least one maintainer approval required
   - All feedback addressed
   - CI/CD checks passing

## 📞 Getting Help

- 💬 [GitHub Discussions](https://github.com/mukeshjena/lucid-alerts/discussions)
- 🐛 [Issue Tracker](https://github.com/mukeshjena/lucid-alerts/issues)
- 📧 Email: muk3shjena@gmail.com

## 🏆 Recognition

Contributors will be:
- Listed in the README.md
- Mentioned in release notes
- Added to the contributors list

## 📄 License

By contributing to LucidAlerts, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to LucidAlerts! 🎉
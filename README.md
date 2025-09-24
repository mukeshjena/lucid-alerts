# LucidAlerts 🚀

[![npm version](https://badge.fury.io/js/lucid-alerts.svg)](https://badge.fury.io/js/lucid-alerts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/lucid-alerts.svg)](https://www.npmjs.com/package/lucid-alerts)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/lucid-alerts)](https://bundlephobia.com/package/lucid-alerts)
[![GitHub Release](https://img.shields.io/github/v/release/mukeshjena/lucid-alerts)](https://github.com/mukeshjena/lucid-alerts/releases)
[![CI/CD Pipeline](https://github.com/mukeshjena/lucid-alerts/actions/workflows/ci.yml/badge.svg)](https://github.com/mukeshjena/lucid-alerts/actions)

A modern, lightweight, and highly customizable JavaScript library for alerts and notifications. A beautiful alternative to SweetAlert2 and Notyf with built-in dark/light mode support and responsive design.

🎉 **Latest Release: v1.1.3** - Updated documentation and stable release with latest features!

## ✨ Features

- 🎨 **Modern & Clean Design** - Flat styling with subtle animations
- 🌓 **Auto Dark/Light Mode** - Automatically adapts to system preferences
- 📱 **Fully Responsive** - Works perfectly on all screen sizes
- 🎯 **Single File Usage** - No separate CSS file needed
- ⚡ **Lightweight** - Minimal footprint (~15KB minified)
- 🔧 **Highly Customizable** - Full control over appearance and behavior
- 📝 **Custom Forms** - Built-in form support with validation
- 🎭 **Multiple Types** - Success, error, warning, info, and custom alerts
- 🔗 **Promise-based** - Modern async/await support
- 🌐 **Universal** - Works with ES modules, CommonJS, and browser scripts
- 🎪 **Rich API** - Comprehensive set of methods and options
- 🔄 **No Dependencies** - Pure vanilla JavaScript

## 🚀 Installation

### NPM

```bash
npm install lucid-alerts
```

### Yarn

```bash
yarn add lucid-alerts
```

### CDN

#### jsDelivr

```html
<script src="https://cdn.jsdelivr.net/npm/lucid-alerts@1.1.3/dist/lucid-alerts.min.js"></script>
```

#### unpkg

```html
<script src="https://unpkg.com/lucid-alerts@1.1.3/dist/lucid-alerts.min.js"></script>
```

#### Latest Version (Auto-updates)

```html
<script src="https://cdn.jsdelivr.net/npm/lucid-alerts@latest/dist/lucid-alerts.min.js"></script>
```

## 📖 Usage

### ES6 Modules

```javascript
import LucidAlerts from 'lucid-alerts';

// Simple alert
LucidAlerts.alert('Hello World!');

// Success notification
LucidAlerts.success('Operation completed successfully!');
```

### CommonJS

```javascript
const LucidAlerts = require('lucid-alerts');

LucidAlerts.error('Something went wrong!');
```

### Browser Script

```html
<script src="https://cdn.jsdelivr.net/npm/lucid-alerts@1.1.3/dist/lucid-alerts.min.js"></script>
<script>
  LucidAlerts.info('Welcome to LucidAlerts!');
</script>
```

## 🎯 Quick Examples

### Basic Alerts

```javascript
// Simple alerts
LucidAlerts.success('Success message');
LucidAlerts.error('Error message');
LucidAlerts.warning('Warning message');
LucidAlerts.info('Info message');

// Alert with options
LucidAlerts.question({
  title: 'Are you sure?',
  text: 'This action cannot be undone.',
  confirmText: 'Yes, delete it!',
  cancelText: 'Cancel'
}).then(result => {
  if (result) {
    LucidAlerts.success('Deleted successfully!');
  }
});
```

### Notifications

```javascript
// Simple notification
LucidAlerts.notify({
  type: 'success',
  message: 'File uploaded successfully!',
  position: 'top-right',
  duration: 3000
});

// Persistent notification
LucidAlerts.notify({
  type: 'warning',
  title: 'Important Notice',
  message: 'Please update your profile information.',
  persistent: true,
  position: 'top-center'
});
```

### Form Inputs

```javascript
// Simple input
LucidAlerts.input({
  title: 'Enter your name',
  placeholder: 'Your name here...'
}).then(result => {
  if (result.isConfirmed) {
    console.log('Name:', result.value);
  }
});

// Multi-input form
LucidAlerts.form({
  title: 'User Registration',
  inputs: [
    { name: 'username', type: 'text', placeholder: 'Username', required: true },
    { name: 'email', type: 'email', placeholder: 'Email', required: true },
    { name: 'age', type: 'number', placeholder: 'Age' }
  ]
}).then(result => {
  if (result.isConfirmed) {
    console.log('Form data:', result.values);
  }
});
```

## 🎨 Theming

LucidAlerts automatically detects your system's theme preference and adapts accordingly. You can also manually control the theme:

```javascript
// Set theme manually
LucidAlerts.setTheme('dark');   // 'light', 'dark', or 'auto'

// Get current theme
const currentTheme = LucidAlerts.getTheme();
```

## 📚 API Reference

### Core Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `alert(message, options?)` | Shows a basic alert | `Promise<boolean>` |
| `success(message, options?)` | Shows a success alert | `Promise<boolean>` |
| `error(message, options?)` | Shows an error alert | `Promise<boolean>` |
| `warning(message, options?)` | Shows a warning alert | `Promise<boolean>` |
| `info(message, options?)` | Shows an info alert | `Promise<boolean>` |
| `question(message, options?)` | Shows a question alert | `Promise<boolean>` |
| `input(options)` | Shows an input dialog | `Promise<{isConfirmed, value}>` |
| `select(options)` | Shows a select dialog | `Promise<{isConfirmed, value}>` |
| `form(options)` | Shows a form dialog | `Promise<{isConfirmed, values}>` |
| `notify(options)` | Shows a notification | `string (notification ID)` |

### Utility Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `setTheme(theme)` | Sets the theme ('light', 'dark', 'auto') | `void` |
| `getTheme()` | Gets the current theme | `string` |
| `closeAll()` | Closes all active alerts | `void` |
| `closeAllNotifications()` | Closes all notifications | `void` |
| `getActiveAlerts()` | Gets active alerts count | `number` |
| `getActiveNotifications()` | Gets active notifications count | `number` |

### Configuration Options

#### Alert Options

```javascript
{
  title: 'Alert Title',           // Alert title
  text: 'Alert message',          // Alert message
  confirmText: 'OK',              // Confirm button text
  cancelText: 'Cancel',           // Cancel button text
  showCancel: false,              // Show cancel button
  timer: 0,                       // Auto-close timer (ms)
  customClass: '',                // Custom CSS class
  allowOutsideClick: true,        // Allow clicking outside to close
  allowEscapeKey: true,           // Allow ESC key to close
  showCloseButton: true,          // Show close button
  onConfirm: null,                // Confirm callback
  onCancel: null,                 // Cancel callback
  onClose: null                   // Close callback
}
```

#### Notification Options

```javascript
{
  type: 'info',                   // 'success', 'error', 'warning', 'info'
  title: 'Notification Title',    // Notification title
  message: 'Notification text',   // Notification message
  position: 'top-right',          // Position on screen
  duration: 4000,                 // Duration in ms (0 = persistent)
  persistent: false,              // Never auto-close
  showProgress: false,            // Show progress bar
  onClick: null,                  // Click callback
  onClose: null                   // Close callback
}
```

## 🌍 Browser Support

LucidAlerts supports all modern browsers:

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/mukeshjena/lucid-alerts.git`
3. Install dependencies: `npm install`
4. Start development: `npm run dev`
5. Build for production: `npm run build:all`

### Scripts

- `npm run build` - Build the library
- `npm run dev` - Start development with watch mode
- `npm run build:all` - Build and minify
- `npm run demo` - Start demo server

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by SweetAlert2 and Notyf
- Built with modern web standards
- Designed for developer experience

## 📞 Support

- 📖 [Documentation](https://github.com/mukeshjena/lucid-alerts#readme)
- 🐛 [Issue Tracker](https://github.com/mukeshjena/lucid-alerts/issues)
- 💬 [Discussions](https://github.com/mukeshjena/lucid-alerts/discussions)
- 🌐 [Demo Site](https://mukeshjena.github.io/lucid-alerts/)

---

Made with ❤️ by [Mukesh Jena](https://github.com/mukeshjena)
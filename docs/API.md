# LucidAlerts API Documentation

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Alert Methods](#alert-methods)
- [Notification Methods](#notification-methods)
- [Form Alerts](#form-alerts)
- [Configuration Options](#configuration-options)
- [Theming](#theming)
- [Advanced Usage](#advanced-usage)
- [Promise Support](#promise-support)
- [Chaining](#chaining)

## Installation

### CDN (Recommended)
```html
<!-- Minified version for production -->
<script src="https://cdn.jsdelivr.net/npm/lucid-alerts@1.1.3/dist/lucid-alerts.min.js"></script>

<!-- Development version -->
<script src="https://cdn.jsdelivr.net/npm/lucid-alerts@1.1.3/dist/lucid-alerts.js"></script>
```

### ES Module
```javascript
import LucidAlerts from 'lucid-alerts';
```

### NPM
```bash
npm install lucid-alerts
```

## Basic Usage

LucidAlerts is automatically available as a global variable when included via CDN:

```javascript
// Simple alert
LucidAlerts.alert('Hello World!');

// Success message
LucidAlerts.success('Operation completed successfully!');

// Error message
LucidAlerts.error('Something went wrong!');
```

## Alert Methods

### `alert(config)`
Shows a basic alert dialog.

```javascript
// String parameter
LucidAlerts.alert('Simple message');

// Object parameter
LucidAlerts.alert({
  title: 'Alert Title',
  text: 'Alert message',
  icon: 'info'
});
```

### `success(config)`
Shows a success alert with green styling.

```javascript
LucidAlerts.success('Data saved successfully!');

LucidAlerts.success({
  title: 'Success!',
  text: 'Your changes have been saved.',
  timer: 3000
});
```

### `error(config)`
Shows an error alert with red styling.

```javascript
LucidAlerts.error('Failed to save data!');

LucidAlerts.error({
  title: 'Error!',
  text: 'Please check your internet connection.',
  showCancelButton: false
});
```

### `warning(config)`
Shows a warning alert with yellow styling.

```javascript
LucidAlerts.warning('This action cannot be undone!');

LucidAlerts.warning({
  title: 'Warning!',
  text: 'Are you sure you want to delete this item?',
  showCancelButton: true
});
```

### `info(config)`
Shows an info alert with blue styling.

```javascript
LucidAlerts.info('New features are available!');

LucidAlerts.info({
  title: 'Information',
  text: 'Check out our latest updates.',
  position: 'top'
});
```

### `question(config)`
Shows a question alert with purple styling and cancel button.

```javascript
LucidAlerts.question('Do you want to continue?');

LucidAlerts.question({
  title: 'Confirm Action',
  text: 'This will permanently delete the file.',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel'
});
```

## Notification Methods

### `notify(config)` / `toast(config)`
Shows a notification toast.

```javascript
// Basic notification
LucidAlerts.notify({
  type: 'success',
  title: 'Success!',
  message: 'Data saved successfully'
});

// Different positions
LucidAlerts.toast({
  type: 'info',
  message: 'New message received',
  position: 'top-left',
  duration: 5000
});
```

### Notification Positions
- `top-right` (default)
- `top-left`
- `top-center`
- `bottom-right`
- `bottom-left`
- `bottom-center`

```javascript
LucidAlerts.notify({
  type: 'warning',
  message: 'Session will expire soon',
  position: 'bottom-center',
  duration: 10000
});
```

## Form Alerts

### `form(config)`
Shows an alert with form inputs for user data collection.

```javascript
LucidAlerts.form({
  title: 'User Information',
  text: 'Please fill in your details:',
  inputs: [
    {
      name: 'name',
      type: 'text',
      placeholder: 'Full Name',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Email Address',
      required: true
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone Number'
    }
  ]
}).then(result => {
  if (result.isConfirmed) {
    console.log('User data:', result.values);
    // result.values = { name: '...', email: '...', phone: '...' }
  }
});
```

### Form Input Types
```javascript
LucidAlerts.form({
  title: 'Registration Form',
  inputs: [
    { name: 'username', type: 'text', placeholder: 'Username', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true },
    { name: 'age', type: 'number', placeholder: 'Age', attributes: { min: 18, max: 100 } },
    { name: 'website', type: 'url', placeholder: 'Website URL' },
    { name: 'birthdate', type: 'date' }
  ]
});
```

## Configuration Options

### Alert Configuration
```javascript
const config = {
  // Content
  title: 'Alert Title',
  text: 'Alert message text',
  html: '<p>Custom <strong>HTML</strong> content</p>',
  
  // Icon
  icon: 'success', // 'success', 'error', 'warning', 'info', 'question', or null
  
  // Buttons
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: 'OK',
  cancelButtonText: 'Cancel',
  reverseButtons: false,
  
  // Behavior
  showCloseButton: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  timer: null, // Auto-close timer in milliseconds
  
  // Positioning
  position: 'center', // 'center', 'top', 'bottom'
  
  // Styling
  customClass: 'my-custom-alert',
  width: null,
  padding: null,
  background: null,
  color: null,
  
  // Animation
  animation: true,
  backdrop: true
};

LucidAlerts.show(config);
```

### Notification Configuration
```javascript
const notificationConfig = {
  type: 'info', // 'success', 'error', 'warning', 'info'
  title: 'Notification Title',
  message: 'Notification message',
  position: 'top-right',
  duration: 4000, // 0 for persistent
  dismissible: true,
  icon: true // true, false, or custom icon class
};

LucidAlerts.notify(notificationConfig);
```

## Theming

### Automatic Theme Detection
LucidAlerts automatically detects the user's preferred color scheme:

```javascript
// Theme is automatically set based on user's system preference
// No additional configuration needed
```

### Manual Theme Control
```javascript
// Set light theme
LucidAlerts.setTheme('light');

// Set dark theme
LucidAlerts.setTheme('dark');

// Set automatic detection (default)
LucidAlerts.setTheme('auto');
```

### Custom CSS Variables
You can customize the appearance by overriding CSS variables:

```css
:root {
  --lucid-primary: #your-primary-color;
  --lucid-success: #your-success-color;
  --lucid-error: #your-error-color;
  --lucid-warning: #your-warning-color;
  --lucid-info: #your-info-color;
}

/* Dark theme customization */
[data-theme="dark"] {
  --lucid-bg: #your-dark-background;
  --lucid-text: #your-dark-text-color;
}
```

## Advanced Usage

### HTML Content
```javascript
LucidAlerts.show({
  title: 'Rich Content',
  html: `
    <div style="text-align: center;">
      <img src="success-icon.svg" width="64" height="64">
      <p>Operation completed successfully!</p>
      <ul style="text-align: left;">
        <li>Files processed: 150</li>
        <li>Errors: 0</li>
        <li>Duration: 2.3 seconds</li>
      </ul>
    </div>
  `,
  showCancelButton: false
});
```

### Custom Buttons
```javascript
LucidAlerts.show({
  title: 'Custom Actions',
  text: 'Choose your action:',
  showConfirmButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save & Continue',
  cancelButtonText: 'Discard Changes',
  reverseButtons: true
});
```

### Auto-close Timer
```javascript
LucidAlerts.success({
  title: 'Auto Close',
  text: 'This alert will close automatically in 3 seconds',
  timer: 3000,
  showConfirmButton: false
});
```

### Persistent Notifications
```javascript
LucidAlerts.notify({
  type: 'warning',
  title: 'Important Notice',
  message: 'This notification will stay until manually dismissed',
  duration: 0, // 0 = persistent
  dismissible: true
});
```

## Promise Support

All alert methods return promises for easy async handling:

```javascript
// Basic promise handling
LucidAlerts.question('Do you want to save changes?')
  .then(result => {
    if (result) {
      console.log('User confirmed');
      // Save changes
    } else {
      console.log('User cancelled');
      // Discard changes
    }
  });

// Async/await
async function handleUserAction() {
  const result = await LucidAlerts.warning({
    title: 'Confirm Delete',
    text: 'This action cannot be undone!',
    showCancelButton: true
  });
  
  if (result) {
    // User confirmed
    await deleteItem();
    LucidAlerts.success('Item deleted successfully!');
  }
}

// Form promises
LucidAlerts.form({
  title: 'Login',
  inputs: [
    { name: 'username', type: 'text', placeholder: 'Username', required: true },
    { name: 'password', type: 'password', placeholder: 'Password', required: true }
  ]
}).then(result => {
  if (result.isConfirmed) {
    const { username, password } = result.values;
    // Process login
  }
});
```

## Chaining

Chain multiple alerts for sequential user interactions:

```javascript
LucidAlerts.info('Welcome to our app!')
  .then(() => LucidAlerts.question('Would you like a tour?'))
  .then(wantsTour => {
    if (wantsTour) {
      return LucidAlerts.info('Great! Let\'s start the tour.');
    } else {
      return LucidAlerts.success('You can start the tour anytime from the help menu.');
    }
  })
  .then(() => {
    console.log('Onboarding completed');
  });
```

## Utility Methods

### Close All Alerts
```javascript
// Close all active alerts and notifications
LucidAlerts.closeAll();
```

### Check Active Alerts
```javascript
// Get number of active alerts
console.log('Active alerts:', LucidAlerts.activeAlerts.size);
console.log('Active notifications:', LucidAlerts.activeNotifications.size);
```

## Examples

### Complete Login Form
```javascript
async function showLoginForm() {
  try {
    const result = await LucidAlerts.form({
      title: 'Sign In',
      text: 'Please enter your credentials:',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email Address',
          required: true
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password',
          required: true
        }
      ],
      confirmButtonText: 'Sign In',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      // Show loading
      LucidAlerts.info({
        title: 'Signing In...',
        text: 'Please wait while we verify your credentials.',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false
      });

      // Simulate API call
      setTimeout(() => {
        LucidAlerts.closeAll();
        LucidAlerts.success('Welcome back!');
      }, 2000);
    }
  } catch (error) {
    LucidAlerts.error('An error occurred during sign in.');
  }
}
```

### Confirmation with Custom Styling
```javascript
LucidAlerts.show({
  title: 'Delete Account',
  html: `
    <div style="color: #ef4444; margin: 1rem 0;">
      <strong>⚠️ This action is irreversible!</strong>
    </div>
    <p>All your data, including:</p>
    <ul style="text-align: left; margin: 1rem 0;">
      <li>Profile information</li>
      <li>Saved preferences</li>
      <li>Upload history</li>
    </ul>
    <p>will be permanently deleted.</p>
  `,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Delete Account',
  cancelButtonText: 'Keep Account',
  reverseButtons: true,
  customClass: 'danger-alert'
}).then(result => {
  if (result) {
    LucidAlerts.success('Account deleted successfully.');
  }
});
```

### Multi-step Wizard
```javascript
async function runWizard() {
  // Step 1: Welcome
  await LucidAlerts.info({
    title: 'Setup Wizard',
    text: 'Welcome! Let\'s set up your account in 3 easy steps.',
    confirmButtonText: 'Start Setup'
  });

  // Step 2: Basic Info
  const basicInfo = await LucidAlerts.form({
    title: 'Step 1: Basic Information',
    inputs: [
      { name: 'name', type: 'text', placeholder: 'Full Name', required: true },
      { name: 'company', type: 'text', placeholder: 'Company Name' }
    ]
  });

  if (!basicInfo.isConfirmed) return;

  // Step 3: Preferences
  const preferences = await LucidAlerts.form({
    title: 'Step 2: Preferences',
    inputs: [
      { name: 'theme', type: 'text', placeholder: 'Preferred Theme (light/dark)' },
      { name: 'notifications', type: 'text', placeholder: 'Email Notifications (yes/no)' }
    ]
  });

  if (!preferences.isConfirmed) return;

  // Step 4: Completion
  await LucidAlerts.success({
    title: 'Setup Complete!',
    text: `Welcome ${basicInfo.values.name}! Your account is ready to use.`,
    timer: 3000
  });
}
```

This documentation covers all the features and capabilities of LucidAlerts. For more examples and advanced use cases, check out the demo HTML file included in the package.
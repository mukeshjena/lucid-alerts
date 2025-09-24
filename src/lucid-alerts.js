/**
 * LucidAlerts - A modern, lightweight alert and notification library
 * Version: 1.1.3
 * Author: LucidAlerts Team
 * License: MIT
 */

// Import CSS for bundling
import './lucid-alerts.css';

class LucidAlerts {
  constructor(options = {}) {
    this.currentTheme = 'auto';
    this.activeAlerts = new Set();
    this.activeNotifications = new Set();

    // CSS Configuration
    this.cssConfig = {
      autoLoad: options.autoLoadCSS !== false, // Default: true
      cssPath: options.cssPath || null, // Custom CSS path
      skipCSS: options.skipCSS === true // Skip CSS loading entirely
    };

    this.defaultConfig = {
      title: '',
      text: '',
      html: '',
      icon: null,
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCloseButton: true,
      allowOutsideClick: true,
      allowEscapeKey: true,
      position: 'center',
      timer: null,
      animation: true,
      backdrop: true,
      customClass: '',
      width: null,
      padding: null,
      background: null,
      color: null,
      buttonsStyling: true,
      reverseButtons: false,
      focusConfirm: true,
      focusCancel: false,
      returnFocus: true,
      heightAuto: true,
      scrollbarPadding: true
    };

    this.notificationConfig = {
      type: 'info',
      title: '',
      message: '',
      position: 'top-right',
      duration: 4000,
      dismissible: true,
      ripple: true,
      icon: true
    };

    this.init();
  }

  init() {
    this.injectStyles();
    this.setupThemeDetection();
    this.setupKeyboardHandlers();
  }

  injectStyles() {
    // CSS is automatically bundled and injected by the build process
    // This method is kept for backward compatibility but no longer needed
    // console.log('LucidAlerts: CSS automatically bundled and injected');
  }

  hasExternalCSS() {
    // Check if any stylesheet contains LucidAlerts CSS rules
    const stylesheets = Array.from(document.styleSheets);

    for (const stylesheet of stylesheets) {
      try {
        const rules = stylesheet.cssRules || stylesheet.rules;
        if (rules) {
          for (const rule of rules) {
            if (
              rule.selectorText &&
              rule.selectorText.includes('.lucid-backdrop')
            ) {
              return true;
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheets may throw errors, check href instead
        if (stylesheet.href && stylesheet.href.includes('lucid-alerts')) {
          return true;
        }
      }
    }
    return false;
  }

  loadExternalCSS() {
    return new Promise((resolve, reject) => {
      // Use custom path if provided, otherwise try common paths
      const possiblePaths = this.cssConfig.cssPath
        ? [this.cssConfig.cssPath]
        : [
          './lucid-alerts.css',
          '../src/lucid-alerts.css',
          './src/lucid-alerts.css',
          './css/lucid-alerts.css',
          './assets/lucid-alerts.css'
        ];

      const tryPath = index => {
        if (index >= possiblePaths.length) {
          reject(new Error('No CSS file found'));
          return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = possiblePaths[index];

        link.onload = () => {
          // console.log(`LucidAlerts: CSS loaded from ${possiblePaths[index]}`);
          resolve();
        };

        link.onerror = () => {
          tryPath(index + 1);
        };

        document.head.appendChild(link);
      };

      tryPath(0);
    });
  }

  getCSS() {
    return `
      /* LucidAlerts Core Styles */
      .lucid-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lucid-backdrop.show {
        opacity: 1;
      }

      .lucid-backdrop.position-top {
        align-items: flex-start;
        padding-top: 2rem;
      }

      .lucid-backdrop.position-bottom {
        align-items: flex-end;
        padding-bottom: 2rem;
      }

      .lucid-alert {
        background: var(--lucid-bg);
        color: var(--lucid-text);
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        transform: scale(0.7) translateY(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid var(--lucid-border);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }

      .lucid-backdrop.show .lucid-alert {
        transform: scale(1) translateY(0);
      }

      .lucid-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--lucid-text-secondary);
        padding: 0.25rem;
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.7;
      }

      .lucid-close:hover {
        opacity: 1;
        color: var(--lucid-text);
      }

      .lucid-icon {
        width: 4rem;
        height: 4rem;
        margin: 0 auto 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 2rem;
      }

      .lucid-icon.success {
        background: var(--lucid-success-bg);
        color: var(--lucid-success);
      }

      .lucid-icon.error {
        background: var(--lucid-error-bg);
        color: var(--lucid-error);
      }

      .lucid-icon.warning {
        background: var(--lucid-warning-bg);
        color: var(--lucid-warning);
      }

      .lucid-icon.info {
        background: var(--lucid-info-bg);
        color: var(--lucid-info);
      }

      .lucid-icon.question {
        background: var(--lucid-question-bg);
        color: var(--lucid-question);
      }

      .lucid-title {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
        text-align: center;
        color: var(--lucid-text);
      }

      .lucid-content {
        font-size: 1rem;
        line-height: 1.5;
        margin-bottom: 2rem;
        text-align: center;
        color: var(--lucid-text-secondary);
      }

      .lucid-form {
        margin-bottom: 2rem;
      }

      .lucid-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--lucid-border);
        border-radius: 8px;
        font-size: 1rem;
        background: var(--lucid-input-bg);
        color: var(--lucid-text);
        margin-bottom: 1rem;
        transition: border-color 0.2s ease;
      }

      .lucid-input:focus {
        outline: none;
        border-color: var(--lucid-primary);
      }

      .lucid-input.error {
        border-color: var(--lucid-error);
      }

      .lucid-error-message {
        color: var(--lucid-error);
        font-size: 0.875rem;
        margin-top: -0.5rem;
        margin-bottom: 1rem;
      }

      .lucid-buttons {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
      }

      .lucid-button {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        min-width: 80px;
      }

      .lucid-button.confirm {
        background: var(--lucid-primary);
        color: white;
      }

      .lucid-button.confirm:hover {
        background: var(--lucid-primary-dark);
        opacity: 0.9;
      }

      .lucid-button.cancel {
        background: var(--lucid-secondary);
        color: var(--lucid-text);
      }

      .lucid-button.cancel:hover {
        background: var(--lucid-secondary-dark);
        opacity: 0.9;
      }

      /* Notifications */
      .lucid-notifications {
        position: fixed;
        z-index: 10001;
        pointer-events: none;
      }

      .lucid-notifications.top-right {
        top: 1rem;
        right: 1rem;
      }

      .lucid-notifications.top-left {
        top: 1rem;
        left: 1rem;
      }

      .lucid-notifications.bottom-right {
        bottom: 1rem;
        right: 1rem;
      }

      .lucid-notifications.bottom-left {
        bottom: 1rem;
        left: 1rem;
      }

      .lucid-notifications.top-center {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      .lucid-notifications.bottom-center {
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
      }

      .lucid-notification {
        background: var(--lucid-bg);
        color: var(--lucid-text);
        border: 1px solid var(--lucid-border);
        border-radius: 12px;
        padding: 1rem;
        margin-bottom: 0.75rem;
        max-width: 400px;
        min-width: 300px;
        pointer-events: auto;
        transform: translateX(100%) scale(0.95);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        position: relative;
        overflow: hidden;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      }

      .lucid-notification.show {
        transform: translateX(0) scale(1);
        opacity: 1;
      }

      .lucid-notification.left {
        transform: translateX(-100%) scale(0.95);
      }

      .lucid-notification.left.show {
        transform: translateX(0) scale(1);
      }

      .lucid-notification.success {
        border-left: 4px solid var(--lucid-success);
        background: var(--lucid-success-notification-bg);
      }

      .lucid-notification.error {
        border-left: 4px solid var(--lucid-error);
        background: var(--lucid-error-notification-bg);
      }

      .lucid-notification.warning {
        border-left: 4px solid var(--lucid-warning);
        background: var(--lucid-warning-notification-bg);
      }

      .lucid-notification.info {
        border-left: 4px solid var(--lucid-info);
        background: var(--lucid-info-notification-bg);
      }

      .lucid-notification-icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        flex-shrink: 0;
      }

      .lucid-notification-content {
        flex: 1;
      }

      .lucid-notification-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
        font-size: 0.875rem;
      }

      .lucid-notification-message {
        font-size: 0.875rem;
        color: var(--lucid-text-secondary);
        line-height: 1.4;
      }

      .lucid-notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--lucid-text-secondary);
        padding: 0.25rem;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        flex-shrink: 0;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.7;
      }

      .lucid-notification-close:hover {
        opacity: 1;
        color: var(--lucid-text);
      }

      .lucid-notification-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--lucid-primary);
        transition: width linear;
      }

      /* Theme Variables */
      :root {
        --lucid-primary: #3b82f6;
        --lucid-primary-dark: #2563eb;
        --lucid-secondary: #e5e7eb;
        --lucid-secondary-dark: #d1d5db;
        --lucid-success: #10b981;
        --lucid-success-bg: #d1fae5;
        --lucid-error: #ef4444;
        --lucid-error-bg: #fee2e2;
        --lucid-warning: #f59e0b;
        --lucid-warning-bg: #fef3c7;
        --lucid-info: #3b82f6;
        --lucid-info-bg: #dbeafe;
        --lucid-question: #8b5cf6;
        --lucid-question-bg: #ede9fe;
      }

      /* Light Theme */
      [data-theme="light"], :root {
        --lucid-bg: #ffffff;
        --lucid-text: #1f2937;
        --lucid-text-secondary: #6b7280;
        --lucid-border: #e5e7eb;
        --lucid-hover: #f3f4f6;
        --lucid-input-bg: #ffffff;
        --lucid-success-notification-bg: #f0fdf4;
        --lucid-error-notification-bg: #fef2f2;
        --lucid-warning-notification-bg: #fffbeb;
        --lucid-info-notification-bg: #eff6ff;
      }

      /* Dark Theme */
      [data-theme="dark"] {
        --lucid-bg: #1f2937;
        --lucid-text: #f9fafb;
        --lucid-text-secondary: #d1d5db;
        --lucid-border: #374151;
        --lucid-hover: #374151;
        --lucid-input-bg: #374151;
        --lucid-secondary: #374151;
        --lucid-secondary-dark: #4b5563;
        --lucid-success-bg: #064e3b;
        --lucid-error-bg: #7f1d1d;
        --lucid-warning-bg: #78350f;
        --lucid-info-bg: #1e3a8a;
        --lucid-question-bg: #581c87;
        --lucid-success-notification-bg: #022c22;
        --lucid-error-notification-bg: #450a0a;
        --lucid-warning-notification-bg: #451a03;
        --lucid-info-notification-bg: #1e3a8a;
      }

      /* Auto theme detection */
      @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) {
          --lucid-bg: #1f2937;
          --lucid-text: #f9fafb;
          --lucid-text-secondary: #d1d5db;
          --lucid-border: #374151;
          --lucid-hover: #374151;
          --lucid-input-bg: #374151;
          --lucid-secondary: #374151;
          --lucid-secondary-dark: #4b5563;
          --lucid-success-bg: #064e3b;
          --lucid-error-bg: #7f1d1d;
          --lucid-warning-bg: #78350f;
          --lucid-info-bg: #1e3a8a;
          --lucid-question-bg: #581c87;
          --lucid-success-notification-bg: #022c22;
          --lucid-error-notification-bg: #450a0a;
          --lucid-warning-notification-bg: #451a03;
          --lucid-info-notification-bg: #1e3a8a;
        }
      }

      /* Responsive Design */
      @media (max-width: 640px) {
        .lucid-alert {
          margin: 1rem;
          padding: 1.5rem;
          width: calc(100% - 2rem);
        }

        .lucid-buttons {
          flex-direction: column;
        }

        .lucid-notification {
          min-width: 280px;
          max-width: calc(100vw - 2rem);
        }

        .lucid-notifications.top-right,
        .lucid-notifications.bottom-right {
          right: 0.5rem;
        }

        .lucid-notifications.top-left,
        .lucid-notifications.bottom-left {
          left: 0.5rem;
        }
      }

      /* Animation Classes */
      .lucid-fade-in {
        animation: lucidFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lucid-fade-out {
        animation: lucidFadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lucid-slide-in-right {
        animation: lucidSlideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lucid-slide-out-right {
        animation: lucidSlideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .lucid-bounce-in {
        animation: lucidBounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      .lucid-slide-up {
        animation: lucidSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      @keyframes lucidFadeIn {
        from { 
          opacity: 0; 
          transform: scale(0.95);
        }
        to { 
          opacity: 1; 
          transform: scale(1);
        }
      }

      @keyframes lucidFadeOut {
        from { 
          opacity: 1; 
          transform: scale(1);
        }
        to { 
          opacity: 0; 
          transform: scale(0.95);
        }
      }

      @keyframes lucidSlideInRight {
        from { 
          transform: translateX(100%) scale(0.95); 
          opacity: 0;
        }
        to { 
          transform: translateX(0) scale(1); 
          opacity: 1;
        }
      }

      @keyframes lucidSlideOutRight {
        from { 
          transform: translateX(0) scale(1); 
          opacity: 1;
        }
        to { 
          transform: translateX(100%) scale(0.95); 
          opacity: 0;
        }
      }

      @keyframes lucidBounceIn {
        0% {
          transform: scale(0.3) translateY(20px);
          opacity: 0;
        }
        50% {
          transform: scale(1.05) translateY(-5px);
          opacity: 0.8;
        }
        70% {
          transform: scale(0.98) translateY(2px);
          opacity: 0.9;
        }
        100% {
          transform: scale(1) translateY(0);
          opacity: 1;
        }
      }

      @keyframes lucidSlideUp {
        from {
          transform: translateY(20px) scale(0.95);
          opacity: 0;
        }
        to {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
      }
    `;
  }

  setupThemeDetection() {
    if (this.currentTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', () => {
        this.updateTheme();
      });
      this.updateTheme();
    }
  }

  updateTheme() {
    if (this.currentTheme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute(
        'data-theme',
        isDark ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.updateTheme();
  }

  setupKeyboardHandlers() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && this.activeAlerts.size > 0) {
        const alerts = Array.from(this.activeAlerts);
        const lastAlert = alerts[alerts.length - 1];
        if (lastAlert.config.allowEscapeKey) {
          this.close(lastAlert.element, false);
        }
      }
    });
  }

  getIcon(type) {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
      question: '?'
    };
    return icons[type] || '';
  }

  createAlert(config) {
    const backdrop = document.createElement('div');
    backdrop.className = 'lucid-backdrop';

    if (config.position !== 'center') {
      backdrop.classList.add(`position-${config.position}`);
    }

    const alert = document.createElement('div');
    alert.className = 'lucid-alert';

    if (config.customClass) {
      alert.classList.add(config.customClass);
    }

    let html = '';

    // Close button
    if (config.showCloseButton) {
      html += '<button class="lucid-close" type="button">×</button>';
    }

    // Icon
    if (config.icon) {
      html += `<div class="lucid-icon ${config.icon}">${this.getIcon(config.icon)}</div>`;
    }

    // Title
    if (config.title) {
      html += `<div class="lucid-title">${config.title}</div>`;
    }

    // Content
    if (config.html) {
      html += `<div class="lucid-content">${config.html}</div>`;
    } else if (config.text) {
      html += `<div class="lucid-content">${this.escapeHtml(config.text)}</div>`;
    }

    // Buttons
    if (config.showConfirmButton || config.showCancelButton) {
      html += '<div class="lucid-buttons">';

      if (config.reverseButtons) {
        if (config.showCancelButton) {
          html += `<button class="lucid-button cancel" type="button">${config.cancelButtonText}</button>`;
        }
        if (config.showConfirmButton) {
          html += `<button class="lucid-button confirm" type="button">${config.confirmButtonText}</button>`;
        }
      } else {
        if (config.showConfirmButton) {
          html += `<button class="lucid-button confirm" type="button">${config.confirmButtonText}</button>`;
        }
        if (config.showCancelButton) {
          html += `<button class="lucid-button cancel" type="button">${config.cancelButtonText}</button>`;
        }
      }

      html += '</div>';
    }

    alert.innerHTML = html;
    backdrop.appendChild(alert);

    return { backdrop, alert };
  }

  createFormAlert(config) {
    const { backdrop, alert } = this.createAlert({
      ...config,
      showConfirmButton: true,
      showCancelButton: true
    });

    // Add form before buttons
    const buttonsDiv = alert.querySelector('.lucid-buttons');
    const form = document.createElement('div');
    form.className = 'lucid-form';

    config.inputs.forEach((input, index) => {
      const inputElement = document.createElement('input');
      inputElement.className = 'lucid-input';
      inputElement.type = input.type || 'text';
      inputElement.placeholder = input.placeholder || '';
      inputElement.name = input.name || `input_${index}`;
      inputElement.required = input.required || false;
      inputElement.value = input.value || '';

      if (input.attributes) {
        Object.entries(input.attributes).forEach(([key, value]) => {
          inputElement.setAttribute(key, value);
        });
      }

      form.appendChild(inputElement);
    });

    if (buttonsDiv) {
      alert.insertBefore(form, buttonsDiv);
    } else {
      alert.appendChild(form);
    }

    return { backdrop, alert, form };
  }

  show(config) {
    return new Promise(resolve => {
      const finalConfig = { ...this.defaultConfig, ...config };
      const { backdrop, alert } = this.createAlert(finalConfig);

      const alertData = {
        element: backdrop,
        config: finalConfig,
        resolve
      };

      this.activeAlerts.add(alertData);

      // Event handlers
      const handleClose = result => {
        this.close(backdrop, result);
      };

      // Close button
      const closeBtn = alert.querySelector('.lucid-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => handleClose(false));
      }

      // Confirm button
      const confirmBtn = alert.querySelector('.lucid-button.confirm');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => handleClose(true));
      }

      // Cancel button
      const cancelBtn = alert.querySelector('.lucid-button.cancel');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => handleClose(false));
      }

      // Outside click
      if (finalConfig.allowOutsideClick) {
        backdrop.addEventListener('click', e => {
          if (e.target === backdrop) {
            handleClose(false);
          }
        });
      }

      // Auto close timer
      if (finalConfig.timer) {
        setTimeout(() => {
          if (this.activeAlerts.has(alertData)) {
            handleClose(null);
          }
        }, finalConfig.timer);
      }

      // Add to DOM and show
      document.body.appendChild(backdrop);

      // Trigger animation
      requestAnimationFrame(() => {
        backdrop.classList.add('show');
      });
    });
  }

  form(config) {
    return new Promise(resolve => {
      const finalConfig = {
        ...this.defaultConfig,
        ...config,
        showConfirmButton: true,
        showCancelButton: true
      };

      const { backdrop, alert, form } = this.createFormAlert(finalConfig);

      const alertData = {
        element: backdrop,
        config: finalConfig,
        resolve
      };

      this.activeAlerts.add(alertData);

      const handleSubmit = () => {
        const inputs = form.querySelectorAll('.lucid-input');
        const values = {};
        const errors = {};
        let hasErrors = false;

        // Clear previous errors
        form
          .querySelectorAll('.lucid-error-message')
          .forEach(el => el.remove());
        inputs.forEach(input => input.classList.remove('error'));

        // Validate inputs
        inputs.forEach(input => {
          const value = input.value.trim();
          const name = input.name;

          values[name] = value;

          if (input.required && !value) {
            errors[name] = 'This field is required';
            hasErrors = true;
          } else if (
            input.type === 'email' &&
            value &&
            !this.isValidEmail(value)
          ) {
            errors[name] = 'Please enter a valid email address';
            hasErrors = true;
          }
        });

        if (hasErrors) {
          // Show errors
          inputs.forEach(input => {
            const name = input.name;
            if (errors[name]) {
              input.classList.add('error');
              const errorDiv = document.createElement('div');
              errorDiv.className = 'lucid-error-message';
              errorDiv.textContent = errors[name];
              input.parentNode.insertBefore(errorDiv, input.nextSibling);
            }
          });
          return;
        }

        this.close(backdrop, { isConfirmed: true, values });
      };

      const handleClose = result => {
        this.close(backdrop, result || { isConfirmed: false, values: {} });
      };

      // Event handlers
      const closeBtn = alert.querySelector('.lucid-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => handleClose());
      }

      const confirmBtn = alert.querySelector('.lucid-button.confirm');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', handleSubmit);
      }

      const cancelBtn = alert.querySelector('.lucid-button.cancel');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => handleClose());
      }

      // Form submission on Enter
      form.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit();
        }
      });

      // Outside click
      if (finalConfig.allowOutsideClick) {
        backdrop.addEventListener('click', e => {
          if (e.target === backdrop) {
            handleClose();
          }
        });
      }

      // Add to DOM and show
      document.body.appendChild(backdrop);

      // Focus first input
      const firstInput = form.querySelector('.lucid-input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }

      // Trigger animation
      requestAnimationFrame(() => {
        backdrop.classList.add('show');
      });
    });
  }

  close(element, result) {
    const alertData = Array.from(this.activeAlerts).find(
      data => data.element === element
    );
    if (!alertData) return;

    this.activeAlerts.delete(alertData);

    element.classList.remove('show');

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      alertData.resolve(result);
    }, 300);
  }

  notify(config) {
    const finalConfig = { ...this.notificationConfig, ...config };

    // Create notifications container if it doesn't exist
    let container = document.querySelector(
      `.lucid-notifications.${finalConfig.position}`
    );
    if (!container) {
      container = document.createElement('div');
      container.className = `lucid-notifications ${finalConfig.position}`;
      document.body.appendChild(container);
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `lucid-notification ${finalConfig.type}`;

    if (finalConfig.position.includes('left')) {
      notification.classList.add('left');
    }

    let html = '';

    // Icon
    if (finalConfig.icon) {
      const iconClass =
        typeof finalConfig.icon === 'string'
          ? finalConfig.icon
          : finalConfig.type;
      html += `<div class="lucid-notification-icon ${iconClass}">${this.getIcon(iconClass)}</div>`;
    }

    // Content
    html += '<div class="lucid-notification-content">';
    if (finalConfig.title) {
      html += `<div class="lucid-notification-title">${this.escapeHtml(finalConfig.title)}</div>`;
    }
    if (finalConfig.message) {
      html += `<div class="lucid-notification-message">${this.escapeHtml(finalConfig.message)}</div>`;
    }
    html += '</div>';

    // Close button
    if (finalConfig.dismissible) {
      html +=
        '<button class="lucid-notification-close" type="button">×</button>';
    }

    notification.innerHTML = html;

    // Progress bar
    if (finalConfig.duration > 0) {
      const progress = document.createElement('div');
      progress.className = 'lucid-notification-progress';
      progress.style.width = '100%';
      notification.appendChild(progress);
    }

    const notificationData = {
      element: notification,
      config: finalConfig
    };

    this.activeNotifications.add(notificationData);

    // Event handlers
    const closeBtn = notification.querySelector('.lucid-notification-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeNotification(notification);
      });
    }

    // Add to container
    container.appendChild(notification);

    // Show animation
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Auto close
    if (finalConfig.duration > 0) {
      const progress = notification.querySelector(
        '.lucid-notification-progress'
      );
      if (progress) {
        progress.style.transitionDuration = `${finalConfig.duration}ms`;
        requestAnimationFrame(() => {
          progress.style.width = '0%';
        });
      }

      setTimeout(() => {
        if (this.activeNotifications.has(notificationData)) {
          this.closeNotification(notification);
        }
      }, finalConfig.duration);
    }

    return notification;
  }

  closeNotification(element) {
    const notificationData = Array.from(this.activeNotifications).find(
      data => data.element === element
    );
    if (!notificationData) return;

    this.activeNotifications.delete(notificationData);

    element.classList.remove('show');

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 400);
  }

  // Utility methods
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Public API methods
  alert(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show(config);
  }

  success(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show({ ...config, icon: 'success' });
  }

  error(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show({ ...config, icon: 'error' });
  }

  warning(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show({ ...config, icon: 'warning' });
  }

  info(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show({ ...config, icon: 'info' });
  }

  question(config) {
    if (typeof config === 'string') {
      config = { text: config };
    }
    return this.show({
      ...config,
      icon: 'question',
      showCancelButton: true
    });
  }

  toast(config) {
    return this.notify(config);
  }

  // Close all alerts and notifications
  closeAll() {
    this.activeAlerts.forEach(alertData => {
      this.close(alertData.element, false);
    });

    this.activeNotifications.forEach(notificationData => {
      this.closeNotification(notificationData.element);
    });
  }
}

// Create global instance
const lucidAlerts = new LucidAlerts();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lucidAlerts;
} else if (typeof define === 'function' && define.amd) {
  define(() => lucidAlerts);
} else {
  window.LucidAlerts = lucidAlerts;
}

export default lucidAlerts;

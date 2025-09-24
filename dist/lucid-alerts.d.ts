// Type definitions for LucidAlerts
// Project: https://github.com/yourusername/lucid-alerts
// Definitions by: LucidAlerts Team

export interface AlertOptions {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  timer?: number;
  customClass?: string;
  allowOutsideClick?: boolean;
  allowEscapeKey?: boolean;
  showCloseButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface NotificationOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  duration?: number;
  persistent?: boolean;
  showProgress?: boolean;
  onClick?: () => void;
  onClose?: () => void;
}

export interface InputOptions {
  title?: string;
  text?: string;
  placeholder?: string;
  inputType?: string;
  inputValue?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  customClass?: string;
}

export interface SelectOptions {
  title?: string;
  text?: string;
  options: Array<{ value: string; text: string }>;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  customClass?: string;
}

export interface FormInput {
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
}

export interface FormOptions {
  title?: string;
  text?: string;
  inputs: FormInput[];
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  customClass?: string;
}

export interface AlertResult {
  isConfirmed: boolean;
  value?: string;
  values?: { [key: string]: string };
}

declare class LucidAlerts {
  // Core alert methods
  static alert(message: string, options?: AlertOptions): Promise<boolean>;
  static success(message: string, options?: AlertOptions): Promise<boolean>;
  static error(message: string, options?: AlertOptions): Promise<boolean>;
  static warning(message: string, options?: AlertOptions): Promise<boolean>;
  static info(message: string, options?: AlertOptions): Promise<boolean>;
  static question(message: string, options?: AlertOptions): Promise<boolean>;

  // Input methods
  static input(options: InputOptions): Promise<AlertResult>;
  static select(options: SelectOptions): Promise<AlertResult>;
  static form(options: FormOptions): Promise<AlertResult>;

  // Notification methods
  static notify(options: NotificationOptions): string;
  static toast(options: NotificationOptions): string;

  // Utility methods
  static setTheme(theme: 'light' | 'dark' | 'auto'): void;
  static getTheme(): string;
  static closeAll(): void;
  static closeAllNotifications(): void;
  static getActiveAlerts(): number;
  static getActiveNotifications(): number;
}

export default LucidAlerts;
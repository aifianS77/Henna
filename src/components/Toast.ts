type ToastType = 'success' | 'error' | 'info' | 'warning';

class ToastNotification {
  private toastElement: HTMLElement | null = null;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  init(): void {
    this.toastElement = document.getElementById('toast');
  }

  show(message: string, type: ToastType = 'success', duration: number = 3000): void {
    if (!this.toastElement) {
      this.init();
    }

    if (!this.toastElement) return;

    const messageElement = document.getElementById('toastMessage');
    const iconElement = this.toastElement.querySelector('i');

    if (messageElement) {
      messageElement.textContent = message;
    }

    // Update icon based on type
    if (iconElement) {
      iconElement.className = this.getIconClass(type);
    }

    // Update background color based on type
    this.toastElement.style.background = this.getBackgroundGradient(type);

    // Show toast
    this.toastElement.style.display = 'block';

    // Clear existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Hide after duration
    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    if (this.toastElement) {
      this.toastElement.style.display = 'none';
    }
  }

  private getIconClass(type: ToastType): string {
    const iconMap: Record<ToastType, string> = {
      success: 'fas fa-check-circle text-2xl mr-3',
      error: 'fas fa-exclamation-circle text-2xl mr-3',
      info: 'fas fa-info-circle text-2xl mr-3',
      warning: 'fas fa-exclamation-triangle text-2xl mr-3',
    };
    return iconMap[type];
  }

  private getBackgroundGradient(type: ToastType): string {
    const gradientMap: Record<ToastType, string> = {
      success: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      error: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      info: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    };
    return gradientMap[type];
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }
}

export const toast = new ToastNotification();

import { ModalType } from '@/types';

class ModalManager {
  private currentModal: ModalType = null;

  open(modalType: ModalType): void {
    this.currentModal = modalType;
    const modal = document.getElementById(`${modalType}Modal`);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  close(modalType?: ModalType): void {
    const targetModal = modalType || this.currentModal;
    if (targetModal) {
      const modal = document.getElementById(`${targetModal}Modal`);
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    }
    this.currentModal = null;
  }

  closeAll(): void {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      (modal as HTMLElement).style.display = 'none';
    });
    document.body.style.overflow = 'auto';
    this.currentModal = null;
  }

  isOpen(modalType: ModalType): boolean {
    return this.currentModal === modalType;
  }

  setupEventListeners(): void {
    // Close modal when clicking outside
    window.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('modal')) {
        this.close();
      }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.currentModal) {
        this.close();
      }
    });
  }
}

export const modalManager = new ModalManager();

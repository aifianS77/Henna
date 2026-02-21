import './styles/main.css';
import { modalManager } from './components/ModalManager';
import { toast } from './components/Toast';
import { bookingForm } from './components/BookingForm';
import { paymentForm } from './components/PaymentForm';
import { dashboardManager } from './components/Dashboard';
import { auth } from './components/Authentication';
import { galleryService } from './services/gallery.service';
import { scrollToElement } from './utils/helpers';

class App {
  init(): void {
    console.log('🎨 Linai Henna Business - Initializing...');

    // Check if admin logged in from separate page
    this.checkAdminLogin();

    // Initialize components
    modalManager.setupEventListeners();
    toast.init();
    bookingForm.init();
    paymentForm.init();
    dashboardManager.init();
    auth.init();

    // Setup gallery from images folder
    this.setupGallery();

    // Setup global functions for HTML onclick handlers
    this.setupGlobalFunctions();

    // Setup smooth scrolling
    this.setupSmoothScrolling();

    // Setup contact form
    this.setupContactForm();

    console.log('✅ Application initialized successfully');
  }

  private checkAdminLogin(): void {
    // Check if logged in from admin.html
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    if (isAdminLoggedIn && urlParams.get('dashboard') === 'true') {
      // Hide entire main website and show only dashboard
      setTimeout(() => {
        // Hide all main content
        const mainContent = document.querySelector('body > *:not(#dashboard):not(#toast)');
        if (mainContent) {
          (mainContent as HTMLElement).style.display = 'none';
        }
        
        // Hide all siblings of dashboard except toast
        document.querySelectorAll('body > *:not(#dashboard):not(#toast)').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
        
        // Show dashboard
        dashboardManager.login();
        toast.success('Welcome back, Admin!');
      }, 100);
    }
  }

  private setupGallery(): void {
    // Render gallery from public/images folder
    galleryService.renderGallery('.image-gallery');
    console.log(`✅ Gallery loaded: ${galleryService.getTotalImages()} images`);
  }

  private setupGlobalFunctions(): void {
    // Make functions available globally for onclick handlers
    (window as any).showBookingModal = () => modalManager.open('booking');
    (window as any).showLoginModal = () => {
      // Redirect to admin login page
      const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
      window.location.href = `${basePath}/admin.html`;
    };
    (window as any).closeModal = (modalId: string) => modalManager.close(modalId as any);
    (window as any).logout = () => {
      sessionStorage.removeItem('adminLoggedIn');
      auth.logout();
    };
    (window as any).showDashboardSection = (section: string) => 
      dashboardManager.showSection(section as any);
    (window as any).showImageModal = (src: string) => {
      const modalImage = document.getElementById('modalImage') as HTMLImageElement;
      if (modalImage) {
        modalImage.src = src;
      }
      modalManager.open('image');
    };
    (window as any).downloadReceipt = (receiptId: string) => {
      toast.success(`Receipt ${receiptId} downloaded`);
      // In production, this would generate and download a PDF
    };
  }

  private setupSmoothScrolling(): void {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href && href.length > 1) {
          scrollToElement(href.substring(1));
        }
      });
    });
  }

  private setupContactForm(): void {
    const contactForm = document.getElementById('contactForm') as HTMLFormElement;
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        toast.success("Thank you! We'll get back to you soon.");
        contactForm.reset();
      });
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
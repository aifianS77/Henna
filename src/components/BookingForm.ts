import { Booking } from '@/types';
import { bookingService } from '@/services/booking.service';
import { modalManager } from './ModalManager';
import { toast } from './Toast';
import { validateEmail, validatePhone } from '@/utils/helpers';

class BookingForm {
  private form: HTMLFormElement | null = null;
  private currentPrice: number = 0;
  private pendingBooking: Booking | null = null;

  init(): void {
    this.form = document.getElementById('bookingForm') as HTMLFormElement;
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Service selection handler
    const serviceSelect = document.querySelector('select[name="service"]') as HTMLSelectElement;
    if (serviceSelect) {
      serviceSelect.addEventListener('change', (e) => {
        this.updatePrice((e.target as HTMLSelectElement).value);
      });
    }
  }

  private updatePrice(serviceValue: string): void {
    const priceDisplay = document.getElementById('priceDisplay');
    const totalAmount = document.getElementById('totalAmount');

    if (serviceValue.includes('-')) {
      const price = parseInt(serviceValue.split('-')[1]);
      this.currentPrice = price;
      
      if (totalAmount) {
        totalAmount.textContent = `$${price}`;
      }
      
      if (priceDisplay) {
        priceDisplay.classList.remove('hidden');
      }
    } else {
      this.currentPrice = 0;
      if (priceDisplay) {
        priceDisplay.classList.add('hidden');
      }
    }
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    if (!this.form) return;

    const formData = new FormData(this.form);
    
    // Validation
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePhone(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }

    if (this.currentPrice === 0) {
      toast.warning('Please select a service with a price');
      return;
    }

    // Create booking data
    const serviceName = (formData.get('service') as string)
      .split('-')[0]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    const bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'> = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: serviceName,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      details: formData.get('details') as string,
      amount: this.currentPrice,
    };

    // Create booking
    this.pendingBooking = bookingService.createBooking(bookingData);

    // Update payment modal
    const paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) {
      paymentAmount.textContent = `$${this.currentPrice.toFixed(2)}`;
    }

    // Close booking modal and open payment modal
    modalManager.close('booking');
    modalManager.open('payment');
  }

  getPendingBooking(): Booking | null {
    return this.pendingBooking;
  }

  clearPendingBooking(): void {
    this.pendingBooking = null;
    this.currentPrice = 0;
    this.form?.reset();
    
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) {
      priceDisplay.classList.add('hidden');
    }
  }
}

export const bookingForm = new BookingForm();

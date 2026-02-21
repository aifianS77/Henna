import { bookingService } from '@/services/booking.service';
import { bookingForm } from './BookingForm';
import { modalManager } from './ModalManager';
import { toast } from './Toast';
import { dashboardManager } from './Dashboard';
import { formatCardNumber, getCardLast4 } from '@/utils/helpers';

class PaymentForm {
  private form: HTMLFormElement | null = null;

  init(): void {
    this.form = document.getElementById('paymentForm') as HTMLFormElement;
    if (this.form) {
      this.form.addEventListener('submit', this.handleSubmit.bind(this));
      this.setupCardFormatting();
    }
  }

  private setupCardFormatting(): void {
    const cardInput = this.form?.querySelector('input[placeholder*="1234"]') as HTMLInputElement;
    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        const value = target.value.replace(/\s/g, '');
        target.value = formatCardNumber(value);
      });
    }

    const expiryInput = this.form?.querySelector('input[placeholder="MM/YY"]') as HTMLInputElement;
    if (expiryInput) {
      expiryInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        
        if (value.length >= 2) {
          value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        
        target.value = value;
      });
    }

    const cvvInput = this.form?.querySelector('input[placeholder="123"]') as HTMLInputElement;
    if (cvvInput) {
      cvvInput.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/\D/g, '').slice(0, 3);
      });
    }
  }

  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    const booking = bookingForm.getPendingBooking();
    if (!booking) {
      toast.error('No booking found. Please start over.');
      return;
    }

    if (!this.form) return;

    const formData = new FormData(this.form);
    const cardNumber = (formData.get('cardNumber') as string || this.form.querySelector('input[placeholder*="1234"]')?.value || '').replace(/\s/g, '');
    const cardLast4 = getCardLast4(cardNumber);

    // Validate card details
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      toast.error('Please enter a valid card number');
      return;
    }

    // Simulate payment processing
    toast.info('Processing payment...');

    setTimeout(() => {
      try {
        // Process payment and create receipt
        const { receipt, customer } = bookingService.processPayment(booking, cardLast4);

        // Update dashboard
        dashboardManager.updateStats();

        // Close payment modal
        modalManager.close('payment');

        // Clear forms
        bookingForm.clearPendingBooking();
        this.form?.reset();

        // Show success message
        toast.success('Payment successful! Booking confirmed.');
      } catch (error) {
        console.error('Payment error:', error);
        toast.error('Payment failed. Please try again.');
      }
    }, 1500);
  }
}

export const paymentForm = new PaymentForm();

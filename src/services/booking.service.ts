import { Booking, Receipt, Customer } from '@/types';
import { storageService } from './storage.service';

class BookingService {
  createBooking(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
    const booking: Booking = {
      ...data,
      id: `BK${Date.now()}`,
      status: 'Pending Payment',
      createdAt: new Date().toISOString(),
    };
    
    storageService.addBooking(booking);
    return booking;
  }

  processPayment(booking: Booking, cardLast4: string): { receipt: Receipt; customer: Customer } {
    // Update booking status
    booking.status = 'Paid';
    const bookings = storageService.getBookings();
    const index = bookings.findIndex(b => b.id === booking.id);
    if (index !== -1) {
      bookings[index] = booking;
      storageService.saveBookings(bookings);
    }

    // Create receipt
    const receipt: Receipt = {
      id: `RCP${Date.now()}`,
      bookingId: booking.id,
      customer: booking.name,
      email: booking.email,
      amount: booking.amount,
      date: new Date().toISOString(),
      method: 'Credit Card',
      status: 'Paid',
      cardLast4,
    };
    storageService.addReceipt(receipt);

    // Update or create customer
    let customer = storageService.findCustomer(booking.email);
    
    if (customer) {
      customer.totalSpent += booking.amount;
      customer.bookings += 1;
    } else {
      customer = {
        name: booking.name,
        email: booking.email,
        phone: booking.phone,
        totalSpent: booking.amount,
        bookings: 1,
        joinedAt: new Date().toISOString(),
      };
    }
    
    storageService.addOrUpdateCustomer(customer);

    return { receipt, customer };
  }

  getBookingById(id: string): Booking | undefined {
    return storageService.getBookings().find(b => b.id === id);
  }

  getAllBookings(): Booking[] {
    return storageService.getBookings();
  }
}

export const bookingService = new BookingService();

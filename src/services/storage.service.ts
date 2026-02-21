import { Booking, Receipt, Customer } from '@/types';

const STORAGE_KEYS = {
  BOOKINGS: 'hennaBookings',
  RECEIPTS: 'hennaReceipts',
  CUSTOMERS: 'hennaCustomers',
} as const;

class StorageService {
  private getItem<T>(key: string): T[] {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return [];
    }
  }

  private setItem<T>(key: string, data: T[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }

  // Bookings
  getBookings(): Booking[] {
    return this.getItem<Booking>(STORAGE_KEYS.BOOKINGS);
  }

  saveBookings(bookings: Booking[]): void {
    this.setItem(STORAGE_KEYS.BOOKINGS, bookings);
  }

  addBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    this.saveBookings(bookings);
  }

  // Receipts
  getReceipts(): Receipt[] {
    return this.getItem<Receipt>(STORAGE_KEYS.RECEIPTS);
  }

  saveReceipts(receipts: Receipt[]): void {
    this.setItem(STORAGE_KEYS.RECEIPTS, receipts);
  }

  addReceipt(receipt: Receipt): void {
    const receipts = this.getReceipts();
    receipts.push(receipt);
    this.saveReceipts(receipts);
  }

  // Customers
  getCustomers(): Customer[] {
    return this.getItem<Customer>(STORAGE_KEYS.CUSTOMERS);
  }

  saveCustomers(customers: Customer[]): void {
    this.setItem(STORAGE_KEYS.CUSTOMERS, customers);
  }

  findCustomer(email: string): Customer | undefined {
    return this.getCustomers().find(c => c.email === email);
  }

  addOrUpdateCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    const existingIndex = customers.findIndex(c => c.email === customer.email);
    
    if (existingIndex !== -1) {
      customers[existingIndex] = customer;
    } else {
      customers.push(customer);
    }
    
    this.saveCustomers(customers);
  }

  // Clear all data
  clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.RECEIPTS);
    localStorage.removeItem(STORAGE_KEYS.CUSTOMERS);
  }
}

export const storageService = new StorageService();

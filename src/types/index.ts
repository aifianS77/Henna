export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  details: string;
  amount: number;
  status: 'Pending Payment' | 'Paid' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Receipt {
  id: string;
  bookingId: string;
  customer: string;
  email: string;
  amount: number;
  date: string;
  method: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer';
  status: 'Paid' | 'Refunded' | 'Failed';
  cardLast4?: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  bookings: number;
  joinedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  duration?: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  paidCustomers: number;
  monthRevenue: number;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export type ModalType = 'booking' | 'payment' | 'login' | 'image' | null;
export type DashboardSection = 'overview' | 'bookings' | 'receipts' | 'customers';

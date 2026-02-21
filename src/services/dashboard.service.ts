import { DashboardStats } from '@/types';
import { storageService } from './storage.service';

class DashboardService {
  getStats(): DashboardStats {
    const bookings = storageService.getBookings();
    const receipts = storageService.getReceipts();
    
    const totalRevenue = receipts.reduce((sum, r) => sum + r.amount, 0);
    const paidCustomers = bookings.filter(b => b.status === 'Paid').length;
    
    // Calculate current month revenue
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthRevenue = receipts
      .filter(r => {
        const receiptDate = new Date(r.date);
        return receiptDate.getMonth() === currentMonth && 
               receiptDate.getFullYear() === currentYear;
      })
      .reduce((sum, r) => sum + r.amount, 0);

    return {
      totalRevenue,
      totalBookings: bookings.length,
      paidCustomers,
      monthRevenue,
    };
  }

  getRecentBookings(limit: number = 5) {
    return storageService.getBookings()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  getMonthlyRevenue(months: number = 6): { month: string; revenue: number }[] {
    const receipts = storageService.getReceipts();
    const currentDate = new Date();
    const monthlyData: { month: string; revenue: number }[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const revenue = receipts
        .filter(r => {
          const receiptDate = new Date(r.date);
          return receiptDate.getMonth() === date.getMonth() && 
                 receiptDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, r) => sum + r.amount, 0);

      monthlyData.push({ month: monthName, revenue });
    }

    return monthlyData;
  }
}

export const dashboardService = new DashboardService();

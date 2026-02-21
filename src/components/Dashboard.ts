import { DashboardSection } from '@/types';
import { dashboardService } from '@/services/dashboard.service';
import { storageService } from '@/services/storage.service';
import { formatCurrency, formatDate } from '@/utils/helpers';

class DashboardManager {
  //private isLoggedIn: boolean = false;
  //private _currentSection: DashboardSection = 'overview';

  init(): void {
    this.setupNavigation();
  }

  private setupNavigation(): void {
    document.querySelectorAll('.dashboard-nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = (e.currentTarget as HTMLElement).getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
        if (section) {
          this.showSection(section as DashboardSection);
        }
      });
    });
  }

  showSection(section: DashboardSection): void {
    //this._currentSection = section;
    
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(s => {
      s.classList.add('hidden');
    });

    // Show selected section
    const sectionElement = document.getElementById(`${section}-section`);
    if (sectionElement) {
      sectionElement.classList.remove('hidden');
    }

    // Update content
    this.updateSectionContent(section);
  }

  private updateSectionContent(section: DashboardSection): void {
    switch (section) {
      case 'overview':
        this.updateOverview();
        break;
      case 'bookings':
        this.updateBookingsTable();
        break;
      case 'receipts':
        this.updateReceiptsTable();
        break;
      case 'customers':
        this.updateCustomersTable();
        break;
    }
  }

  updateStats(): void {
    const stats = dashboardService.getStats();

    this.updateElement('totalRevenue', formatCurrency(stats.totalRevenue));
    this.updateElement('totalBookings', stats.totalBookings.toString());
    this.updateElement('paidCustomers', stats.paidCustomers.toString());
    this.updateElement('monthRevenue', formatCurrency(stats.monthRevenue));

    // Update happy customers on main page
    this.updateElement('happyCustomers', `${stats.paidCustomers}+`);
  }

  private updateOverview(): void {
    this.updateStats();
    this.updateRecentBookings();
  }

  private updateRecentBookings(): void {
    const recentBookings = dashboardService.getRecentBookings(5);
    const container = document.getElementById('recentBookingsList');

    if (!container) return;

    if (recentBookings.length === 0) {
      container.innerHTML = '<p class="text-gray-500 text-center py-8">No bookings yet</p>';
      return;
    }

    container.innerHTML = recentBookings.map(booking => `
      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div>
          <p class="font-semibold text-gray-800">${booking.name}</p>
          <p class="text-sm text-gray-500">${booking.service}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-sm ${
          booking.status === 'Paid' 
            ? 'bg-green-100 text-green-600' 
            : 'bg-yellow-100 text-yellow-600'
        }">
          ${booking.status}
        </span>
      </div>
    `).join('');
  }

  private updateBookingsTable(): void {
    const bookings = storageService.getBookings();
    const tbody = document.getElementById('bookingsTable');

    if (!tbody) return;

    if (bookings.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No bookings yet</td></tr>';
      return;
    }

    tbody.innerHTML = bookings.map(booking => `
      <tr class="receipt-row border-b border-gray-100">
        <td class="py-3 px-4">${booking.id}</td>
        <td class="py-3 px-4">${booking.name}</td>
        <td class="py-3 px-4">${booking.service}</td>
        <td class="py-3 px-4">${formatDate(booking.date)}</td>
        <td class="py-3 px-4 font-semibold">${formatCurrency(booking.amount)}</td>
        <td class="py-3 px-4">
          <span class="px-3 py-1 rounded-full text-sm ${
            booking.status === 'Paid' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-yellow-100 text-yellow-600'
          }">
            ${booking.status}
          </span>
        </td>
      </tr>
    `).join('');
  }

  private updateReceiptsTable(): void {
    const receipts = storageService.getReceipts();
    const tbody = document.getElementById('receiptsTable');

    if (!tbody) return;

    if (receipts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-gray-500">No receipts yet</td></tr>';
      return;
    }

    tbody.innerHTML = receipts.map(receipt => `
      <tr class="receipt-row border-b border-gray-100">
        <td class="py-3 px-4 font-mono">${receipt.id}</td>
        <td class="py-3 px-4">${receipt.customer}</td>
        <td class="py-3 px-4">${formatDate(receipt.date)}</td>
        <td class="py-3 px-4 font-semibold text-green-600">${formatCurrency(receipt.amount)}</td>
        <td class="py-3 px-4">${receipt.method}</td>
        <td class="py-3 px-4">
          <button onclick="downloadReceipt('${receipt.id}')" class="text-purple-600 hover:text-purple-800">
            <i class="fas fa-download"></i> Download
          </button>
        </td>
      </tr>
    `).join('');
  }

  private updateCustomersTable(): void {
    const customers = storageService.getCustomers();
    const tbody = document.getElementById('customersTable');

    if (!tbody) return;

    if (customers.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-gray-500">No customers yet</td></tr>';
      return;
    }

    tbody.innerHTML = customers.map(customer => `
      <tr class="receipt-row border-b border-gray-100">
        <td class="py-3 px-4 font-semibold">${customer.name}</td>
        <td class="py-3 px-4">${customer.email}</td>
        <td class="py-3 px-4">${customer.phone}</td>
        <td class="py-3 px-4 font-semibold text-green-600">${formatCurrency(customer.totalSpent)}</td>
        <td class="py-3 px-4">${customer.bookings}</td>
      </tr>
    `).join('');
  }

  private updateElement(id: string, content: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = content;
    }
  }

  login(): void {
    //this.isLoggedIn = true;
    
    // Hide ALL main website content
    document.querySelectorAll('body > *:not(#dashboard):not(#toast)').forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });

    // Show dashboard
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.classList.remove('hidden');
      dashboard.style.display = 'block';
    }

    this.updateStats();
    this.showSection('overview');
  }

  logout(): void {
    //this.isLoggedIn = false;
    
    // Clear session
    sessionStorage.removeItem('adminLoggedIn');

    // Hide dashboard
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
      dashboard.classList.add('hidden');
      dashboard.style.display = 'none';
    }

    // Show ALL main content again
    document.querySelectorAll('body > *:not(#dashboard):not(#toast)').forEach(el => {
      (el as HTMLElement).style.display = '';
    });

    // Redirect to homepage
    window.location.href = '/';
  }
}

export const dashboardManager = new DashboardManager();
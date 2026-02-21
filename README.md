# Linai Henna Business Website

A professional, full-featured henna business website built with TypeScript, featuring booking management, payment processing, and an admin dashboard.

## 🎨 Features

### Customer-Facing
- **Beautiful Landing Page** - Elegant design with smooth animations
- **Gallery** - Showcase henna designs with zoom capability
- **Service Listings** - Detailed service descriptions with pricing
- **Testimonials** - Customer reviews and ratings
- **Booking System** - Easy-to-use appointment booking
- **Payment Gateway** - Secure credit card payment processing
- **Contact Form** - Direct communication channel
- **Instagram Integration** - Social media connectivity

### Admin Dashboard
- **Overview Analytics** - Revenue, bookings, and customer metrics
- **Booking Management** - View and manage all bookings
- **Receipt Tracking** - Complete payment history
- **Customer Database** - Track customer spending and booking history
- **Monthly Reports** - Revenue tracking by month

## 📁 Project Structure

```
henna-business/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Authentication.ts
│   │   ├── BookingForm.ts
│   │   ├── Dashboard.ts
│   │   ├── ModalManager.ts
│   │   ├── PaymentForm.ts
│   │   └── Toast.ts
│   ├── pages/              # Page-specific logic (future)
│   ├── services/           # Business logic services
│   │   ├── booking.service.ts
│   │   ├── dashboard.service.ts
│   │   └── storage.service.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/              # Helper functions
│   │   └── helpers.ts
│   ├── styles/             # CSS styles
│   │   └── main.css
│   └── main.ts            # Application entry point
├── public/                 # Static assets
│   ├── images/
│   └── fonts/
├── index.html             # Main HTML file
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite bundler configuration
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd henna-business
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🔐 Admin Access

**Default Credentials:**
- Email: `admin@linaihenna.com`
- Password: `admin123`

Click the user icon in the navigation to access the admin dashboard.

## 💾 Data Storage

All data is stored in the browser's localStorage:
- Bookings
- Receipts
- Customer information

Data persists across sessions but is device-specific.

## 🎯 Key TypeScript Features

### Type Safety
All components use proper TypeScript types:
```typescript
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  amount: number;
  status: 'Pending Payment' | 'Paid' | 'Completed';
  createdAt: string;
}
```

### Service Layer Architecture
Business logic is separated into services:
- `storageService` - Data persistence
- `bookingService` - Booking management
- `dashboardService` - Analytics and reporting

### Component-Based Structure
Each feature is encapsulated in its own component:
- `ModalManager` - Modal window management
- `BookingForm` - Booking form handling
- `PaymentForm` - Payment processing
- `Dashboard` - Admin dashboard
- `Authentication` - User login

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom CSS** for animations and effects
- **Google Fonts** (Playfair Display + Poppins)
- **Font Awesome** for icons

## 📱 Responsive Design

Fully responsive across all devices:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔧 Customization

### Update Services
Edit prices and services in `index.html`:
```html
<option value="bridal-150">Bridal Henna - $150</option>
```

### Change Admin Credentials
Modify in `src/components/Authentication.ts`:
```typescript
private readonly ADMIN_EMAIL = 'your-email@example.com';
private readonly ADMIN_PASSWORD = 'your-password';
```

### Update Instagram Handle
Change in `index.html`:
```html
<a href="https://instagram.com/your-handle">
```

### Customize Colors
Primary gradient colors in `src/styles/main.css`:
```css
.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🛠️ Technology Stack

- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Font Awesome** - Icon library
- **LocalStorage API** - Data persistence

## 📊 Dashboard Features

### Overview
- Total Revenue
- Total Bookings
- Paid Customers
- Monthly Revenue

### Bookings Management
- View all bookings
- Filter by status
- Track appointment details

### Receipt Management
- Complete payment history
- Download receipts (placeholder)
- Payment method tracking

### Customer Database
- Customer information
- Total spending per customer
- Booking count

## 🔒 Security Notes

**For Development Only:**
- Payment processing is simulated (not real)
- No actual credit card validation
- Admin credentials stored in code

**For Production:**
- Integrate real payment gateway (Stripe, PayPal, etc.)
- Implement secure authentication
- Use backend API for data storage
- Add HTTPS/SSL certificate

## 📝 Future Enhancements

- [ ] Real payment gateway integration
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Calendar integration
- [ ] Multi-user support
- [ ] Backend API
- [ ] Database integration
- [ ] Image upload for gallery
- [ ] Advanced analytics

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change port in vite.config.ts or use:
npm run dev -- --port 3001
```

**TypeScript errors:**
```bash
npm run type-check
```

**Build fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is provided as-is for the henna business.

## 🤝 Support

For questions or issues, please contact the developer or open an issue in the project repository.

---

**Built with ❤️ for Linai Henna**

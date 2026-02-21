# 🚀 Quick Start Guide - Linai Henna Business

## Get Running in 3 Steps

### 1️⃣ Setup (2 minutes)

```bash
# Navigate to project
cd henna-business

# Run setup script (Linux/Mac)
./setup.sh

# OR install manually (Windows/Linux/Mac)
npm install
```

### 2️⃣ Start Development Server (10 seconds)

```bash
npm run dev
```

Your browser will automatically open to `http://localhost:3000`

### 3️⃣ Explore the Website

#### As a Customer:
1. Click **"Book Now"** button
2. Fill in your details
3. Select a service (e.g., Bridal Henna - $150)
4. Choose date and time
5. Proceed to payment
6. Enter card details (simulated)
7. Confirm booking ✅

#### As Admin:
1. Click the **user icon** (top right)
2. Login with:
   - **Email:** admin@linaihenna.com
   - **Password:** admin123
3. View dashboard with:
   - Revenue statistics
   - All bookings
   - Payment receipts
   - Customer database

---

## 📱 Features to Try

### Customer Features
- ✅ Browse beautiful gallery
- ✅ View service pricing
- ✅ Read testimonials
- ✅ Book appointments
- ✅ Make payments
- ✅ Send contact messages

### Admin Features
- ✅ View total revenue
- ✅ Track monthly income
- ✅ Manage bookings
- ✅ View receipts
- ✅ Customer database
- ✅ Export data (coming soon)

---

## 🎨 Customization Quick Tips

### Change Business Name
Edit `index.html` line ~15:
```html
<span class="font-playfair text-2xl font-bold">YOUR BUSINESS NAME</span>
```

### Update Service Prices
Edit `index.html` line ~320:
```html
<option value="bridal-150">Bridal Henna - $150</option>
```

### Change Instagram Link
Edit `index.html` line ~89:
```html
<a href="https://instagram.com/YOUR_HANDLE">
```

### Modify Admin Password
Edit `src/components/Authentication.ts` line ~8:
```typescript
private readonly ADMIN_EMAIL = 'your@email.com';
private readonly ADMIN_PASSWORD = 'yourpassword';
```

---

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Test production build
npm run preview
```

The `dist/` folder contains your production-ready website.

---

## 📤 Deploy Options

### Quick Deploy (Free)

#### Netlify
1. Visit [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder
3. Done! 🎉

#### Vercel
```bash
npm install -g vercel
vercel
```

#### GitHub Pages
```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

---

## 🆘 Common Issues

### Port 3000 Already in Use?
```bash
# Use different port
npm run dev -- --port 3001
```

### TypeScript Errors?
```bash
# Check for type issues
npm run type-check
```

### Blank Screen?
1. Check browser console (F12)
2. Clear browser cache (Ctrl+Shift+R)
3. Verify all files are present

### Build Failed?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 File Structure at a Glance

```
henna-business/
├── 📄 index.html          ← Main page (edit here for content)
├── 📦 package.json        ← Dependencies
├── ⚙️ vite.config.ts     ← Build settings
├── 📝 README.md           ← Full documentation
└── 📂 src/
    ├── 📂 components/     ← UI components (TypeScript)
    ├── 📂 services/       ← Business logic
    ├── 📂 types/          ← Type definitions
    ├── 📂 utils/          ← Helper functions
    ├── 📂 styles/         ← CSS styles
    └── 📄 main.ts         ← App entry point
```

---

## 💡 Pro Tips

1. **Save Often:** LocalStorage keeps data in browser
2. **Test Booking:** Try booking flow to see how it works
3. **Check Dashboard:** Login as admin to see analytics
4. **Responsive Design:** Test on mobile/tablet/desktop
5. **Read README.md:** Full documentation available

---

## 🎯 What's Next?

### Immediate Enhancements
- [ ] Add your real henna images to gallery
- [ ] Update service descriptions
- [ ] Customize color scheme
- [ ] Add your contact information

### Future Upgrades
- [ ] Real payment gateway (Stripe/PayPal)
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Backend database
- [ ] User accounts

---

## 📞 Need Help?

**Common Questions:**

**Q: How do I change colors?**  
A: Edit `src/styles/main.css` - Look for `.gradient-bg`

**Q: How do I add more services?**  
A: Edit `index.html` in two places:
   1. Booking form dropdown (~line 320)
   2. Services section (~line 230)

**Q: Can customers edit bookings?**  
A: Not yet - this is a future feature

**Q: Where is data stored?**  
A: In browser's LocalStorage (device-specific)

**Q: Is the payment real?**  
A: No, it's simulated. Integrate Stripe for real payments.

---

## ✅ Success Checklist

After setup, you should see:
- ✅ Website loads at localhost:3000
- ✅ Navigation menu works
- ✅ Gallery images display
- ✅ Booking form opens
- ✅ Payment modal works
- ✅ Admin login successful
- ✅ Dashboard shows data
- ✅ Toast notifications appear

If any item fails, check the troubleshooting section above.

---

**Ready to go?** Run `npm run dev` and start customizing! 🎨

**Questions?** Check `README.md` or `PROJECT_OVERVIEW.md` for detailed documentation.

---

Made with ❤️ for Linai Henna
Version 1.0.0 | February 2026

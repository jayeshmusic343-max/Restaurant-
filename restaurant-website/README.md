# FoodieHub - Food Ordering Platform

A full-stack food ordering application built with React, Node.js, and MySQL. Order food from your favorite restaurants, track orders, and manage payments through Razorpay.

## 🚀 Features

### User Features
- **User Authentication** - Secure signup/login with JWT
- **Product Browsing** - Browse food items with categories and search
- **Shopping Cart** - Add/remove items, manage quantities
- **Wishlist** - Save favorite items for later
- **Order Placement** - Easy checkout with multiple payment options
- **Order Tracking** - View order history and status
- **Responsive Design** - Works on desktop, tablet, and mobile

### Admin Features
- **Admin Dashboard** - View analytics and statistics
- **Product Management** - Add, edit, delete food items
- **Order Management** - View and update order status
- **Image Upload** - Upload product images to Cloudinary
- **Revenue Tracking** - Monitor total revenue

### Payment Options
- Cash on Delivery
- Razorpay (Online Payment)

---

## 📋 Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router v7** - Routing
- **Axios** - HTTP client
- **React Toastify** - Notifications

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **MySQL 3.22.4** - Database
- **JWT** - Authentication
- **Razorpay** - Payment gateway
- **Cloudinary** - Image hosting

### Deployment
- **Frontend** - Vercel
- **Backend** - Render
- **Database** - Railway MySQL

---

## 🛠️ Installation

### Prerequisites
- Node.js 18+ installed
- MySQL server running
- Git installed

### Local Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd restaurant-website
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

3. **Setup Frontend**
```bash
cd ..
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

4. **Database Setup**
- Create MySQL database `foodiehub`
- Run migrations: `node migrate-add-name.js && node migrate-add-payment.js`
- Create admin user: `node backend/setup-admin.js`

### Access Locally
- Frontend: `http://localhost:5174`
- Backend: `http://localhost:5000/api`
- Admin: `http://localhost:5174` (login with admin@example.com / admin123)

---

## 🔐 Environment Variables

### Backend (.env)
```
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=foodiehub
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_1234567890123456
```

---

## 📁 Project Structure

```
restaurant-website/
├── backend/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── ...
│   ├── utils/
│   │   └── cloudinaryConfig.js
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   ├── FoodCard/
│   │   ├── ProtectedRoute/
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── admin/
│   │   └── ...
│   ├── api/
│   │   └── api.js          # Axios configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│
├── .env.local
├── .env.example
├── vite.config.js
├── vercel.json
├── render.yaml
├── DEPLOYMENT.md
├── AUDIT_REPORT.md
└── package.json
```

---

## 🧪 Testing

Run end-to-end tests:
```bash
npm run test-flow  # Or: node test-flow.js
```

This will test:
- User signup/login
- Product browsing
- Cart operations
- Order placement
- Database integrity
- Admin operations

---

## 📦 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/foods` - Get foods (legacy)

### Orders
- `POST /api/orders/place` - Place order
- `GET /api/orders/:user_id` - Get user orders
- `GET /api/orders/details/:order_id` - Get order details

### Cart
- `POST /api/cart/add` - Add to cart
- `GET /api/cart/:user_id` - Get cart items
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/remove` - Remove from cart

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/order-status/:id` - Update order status
- `POST /api/admin/add-product` - Add product
- `PUT /api/admin/update-product/:id` - Edit product
- `DELETE /api/admin/delete-product/:id` - Delete product
- `POST /api/admin/upload-image` - Upload image

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment

---

## 🚀 Deployment

### Deploy to Production

1. **Frontend to Vercel**
```bash
# Push to GitHub
git push origin main
# Vercel auto-deploys on push
```

2. **Backend to Render**
```bash
# Same as frontend - Render watches GitHub
```

3. **Database on Railway**
- Set up MySQL database
- Import schema
- Update connection strings

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

---

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcryptjs
- ✅ Admin role-based access control
- ✅ Transaction-safe order creation
- ✅ Payment signature verification
- ✅ Protected API endpoints

---

## 📊 Performance

- Frontend build size: 109.96 kB (gzipped)
- Average API response time: <200ms
- Database queries optimized with indexes
- Caching ready for Redis integration

---

## 🐛 Troubleshooting

### Database Connection Failed
- Check MySQL is running
- Verify DB credentials in .env
- Ensure database exists

### Frontend can't connect to Backend
- Check backend is running on port 5000
- Verify VITE_API_URL in .env.local
- Check CORS is enabled

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist && npm run build`

---

## 📝 Database Schema

See [DEPLOYMENT.md](./DEPLOYMENT.md#database-schema) for complete schema documentation.

---

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🎯 Future Enhancements

- [ ] Email notifications
- [ ] SMS delivery tracking
- [ ] Promotional codes
- [ ] Order reviews and ratings
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Real-time order tracking

---

## 👨‍💼 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Version:** 1.0.0  
**Last Updated:** 2026-06-15  
**Status:** Production Ready ✅

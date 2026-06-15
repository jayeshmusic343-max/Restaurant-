# FoodieHub - Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free tier available)
- GitHub repository with the frontend code

### Steps

1. **Connect Repository**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Authorize Vercel access to your GitHub

2. **Configure Environment**
   - Project Name: `foodiehub-frontend` (or your choice)
   - Framework: Vite
   - Root Directory: `restaurant-website` (if monorepo) or `.`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend.onrender.com/api`
   - Save and redeploy

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically deploys on every push to main branch

### Production URL
- Frontend will be available at: `https://foodiehub-frontend.vercel.app`

---

## Backend Deployment (Render)

### Prerequisites
- Render account (free tier available)
- GitHub repository with the backend code

### Steps

1. **Create New Web Service**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect GitHub account if not already connected
   - Select your repository

2. **Configure Service**
   - Name: `foodiehub-backend`
   - Environment: `Node`
   - Region: `Oregon` (or closest to you)
   - Branch: `main`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`

3. **Set Environment Variables**
   - In Render dashboard, go to Environment
   - Add these variables:
   ```
   JWT_SECRET=your_secure_jwt_secret_here
   DB_HOST=your_railway_mysql_host
   DB_USER=your_railway_mysql_user
   DB_PASSWORD=your_railway_mysql_password
   DB_NAME=foodiehub
   PORT=10000
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy

### Production URL
- Backend will be available at: `https://foodiehub-backend.onrender.com`

---

## Database Deployment (Railway)

### Prerequisites
- Railway account (free tier available)
- Credit card (for potential overages)

### Steps

1. **Create MySQL Database**
   - Go to https://railway.app
   - Click "New Project"
   - Select "MySQL"
   - Railway will provision a MySQL instance

2. **Get Connection Details**
   - In Railway dashboard, go to your MySQL service
   - View credentials:
     - Host: `your-host.railway.internal` (for private network)
     - Port: Usually 3306
     - Username: `root`
     - Password: Generated password
     - Database: `railway`

3. **Connect From Backend**
   - Use the connection details in your backend `.env` file
   - For public connection (from Render):
     ```
     DB_HOST=your-public-railway-host.railway.app
     DB_PORT=25061 (or provided port)
     DB_USER=root
     DB_PASSWORD=your_generated_password
     DB_NAME=foodiehub
     ```

4. **Run Migrations**
   - Connect to Railway MySQL using a tool like MySQL Workbench or DBeaver
   - Create the foodiehub database
   - Import the database schema (see schema.sql below)

---

## Database Schema

Create a `backend/schema.sql` file with:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  image LONGTEXT,
  category VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  total_price INT NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'COD',
  payment_status VARCHAR(50) DEFAULT 'pending',
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100),
  razorpay_signature VARCHAR(100),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  price INT,
  quantity INT,
  image LONGTEXT,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create cart table
CREATE TABLE IF NOT EXISTS cart (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  price INT,
  quantity INT,
  image LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create wishlist table
CREATE TABLE IF NOT EXISTS wishlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Post-Deployment Configuration

### 1. Test APIs
- Homepage: `https://foodiehub-frontend.vercel.app`
- API Health: `https://foodiehub-backend.onrender.com/api`

### 2. Update Frontend API URL
- If not already set in environment variables

### 3. Set Up Razorpay
- Get API credentials from https://razorpay.com
- Add to Render environment variables

### 4. Set Up Cloudinary
- Get credentials from https://cloudinary.com
- Add to Render environment variables

### 5. Monitor Logs
- Render: Go to Logs tab to check for errors
- Vercel: Go to Deployments → View logs

---

## Rollback Plan
- If deployment fails, Render and Vercel maintain previous versions
- Click "Redeploy" on a previous deployment to rollback

## Contact & Support
- Render Support: https://render.com/docs
- Vercel Support: https://vercel.com/support
- Railway Support: https://docs.railway.app

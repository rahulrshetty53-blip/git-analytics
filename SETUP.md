# 🚀 Setup Guide - Git Analytics Dashboard

Complete step-by-step guide to set up and run the Git Analytics Dashboard.

## ⚙️ Prerequisites

Before starting, ensure you have:
- **Node.js** (v16+) - Download from https://nodejs.org/
- **npm** or **yarn** - Comes with Node.js
- **MongoDB** - Either local or MongoDB Atlas account
- **Git** - For version control
- **GitHub Account** - For Personal Access Token

## 📋 Step 1: Clone/Download Project

```bash
# If using git
git clone <repository-url>
cd Analytics

# Or extract the downloaded ZIP file
```

## 🗄️ Step 2: Setup MongoDB

### Option A: Local MongoDB (Windows)

1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Install MongoDB as a Service"
4. MongoDB will run automatically on port 27017

Test connection:
```bash
mongosh
```

### Option B: MongoDB Atlas (Cloud - Recommended)

1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project
4. Create a cluster (Free tier available)
5. Add your IP address to network access
6. Create database user with password
7. Get connection string: `mongodb+srv://<username>:<password>@cluster.mongodb.net/git-analytics`
8. Use this in Step 4

## 🔧 Step 3: Setup Backend

### 3.1 Install Dependencies

```bash
cd backend
npm install
```

### 3.2 Configure Environment Variables

Create `.env` file in backend folder:

```bash
# Copy .env.example
cp .env.example .env

# Edit .env with your values (no changes needed for local setup)
```

Content of `.env`:
```env
# Server Config
PORT=5000
NODE_ENV=development

# MongoDB (Choose one)
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/git-analytics

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/git-analytics

# JWT Config
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d

# GitHub Config
GITHUB_API_BASE_URL=https://api.github.com

# CORS
FRONTEND_URL=http://localhost:5173
```

### 3.3 Start Backend

```bash
# From backend directory
npm run dev

# Expected output:
# ✅ MongoDB connected successfully
# 🚀 Server running on port 5000
```

✅ **Backend is ready when you see**: `Server running on port 5000`

## 💻 Step 4: Setup Frontend

### 4.1 Install Dependencies

```bash
cd frontend
npm install
```

### 4.2 Start Frontend

```bash
# From frontend directory
npm run dev

# Expected output:
# VITE v4.x.x ready in xxx ms
# ➜  Local:   http://127.0.0.1:5173/
```

✅ **Frontend is ready when you see**: `Local: http://127.0.0.1:5173/`

## 🔑 Step 5: Get GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in Token name: `git-analytics`
4. Check the following scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `user` (Read user profile data)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)

## 🎯 Step 6: Use the Application

1. **Open** http://localhost:5173 in your browser

2. **Create Account**
   - Click "Sign Up"
   - Enter Name, Email, Password
   - Click "Sign Up"

3. **Login**
   - Enter your email and password
   - Click "Sign In"

4. **Add GitHub Token** (Optional but recommended)
   - Go to "Settings" page
   - Paste your GitHub Personal Access Token
   - Your GitHub repositories will appear

5. **View Dashboard**
   - See your overall statistics
   - View activity charts
   - Check recent activity

6. **View Analytics**
   - Select a repository
   - See detailed metrics
   - View contributor stats
   - Check pull request info

## 🧪 Step 7: Test the Features

### Test Authentication
- ✅ Sign up with valid email
- ✅ Login with credentials
- ✅ Logout and verify redirect to login

### Test GitHub Integration
- ✅ Add GitHub token
- ✅ Verify repositories appear
- ✅ Select a repository
- ✅ Check if data syncs

### Test Analytics
- ✅ View dashboard stats
- ✅ Check line chart
- ✅ View bar chart
- ✅ Check recent activity

## 📱 Useful URLs

| Component | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| MongoDB (Local) | mongodb://localhost:27017 |
| MongoDB Atlas | https://cloud.mongodb.com |
| GitHub Settings | https://github.com/settings |

## 🚨 Common Issues & Solutions

### Issue: "Connection refused" for MongoDB
**Solution:**
```bash
# Check if MongoDB is running
# Windows: MongoDB should auto-start
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue: "EADDRINUSE: address already in use :::5000"
**Solution:**
```bash
# Change port in backend/.env
PORT=5001

# Or kill the process using port 5000
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
```

### Issue: "CORS error" or "Cannot GET /api"
**Solution:**
- Ensure backend is running on port 5000
- Check FRONTEND_URL in .env matches your frontend
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: GitHub token errors
**Solution:**
- Generate new token: https://github.com/settings/tokens
- Ensure token has `repo` and `user` scopes
- Token should start with `ghp_` or `github_pat_`

### Issue: "No repositories showing"
**Solution:**
- Go to Settings and add GitHub token
- Repositories will auto-sync
- Verify token has correct permissions

## 🛑 Stop the Application

Press `Ctrl+C` in both terminal windows to stop:
- Frontend dev server
- Backend dev server

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
# Creates 'dist' folder ready for deployment
```

### Start Backend in Production
```bash
cd backend
NODE_ENV=production npm start
```

## 🎓 Next Steps

- ✅ Explore the dashboard
- ✅ Add more GitHub repositories
- ✅ Study the code structure
- ✅ Deploy to production (Vercel, Heroku, etc.)
- ✅ Customize UI and add more features

## 📞 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Review the main README.md
3. Check browser console for errors (F12)
4. Check backend terminal for error messages

## ✅ Verification Checklist

Before considering setup complete:

- ✅ MongoDB is running and connected
- ✅ Backend server started successfully
- ✅ Frontend dev server started successfully
- ✅ Can access http://localhost:5173
- ✅ Can create account and login
- ✅ Can add GitHub token
- ✅ Dashboard loads with data
- ✅ Analytics page shows charts

---

**Congratulations! Your Git Analytics Dashboard is ready to use! 🎉**

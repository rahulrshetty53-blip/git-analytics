# ⚡ Quick Start (5 Minutes)

## 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

## 2️⃣ Start Backend

```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## 3️⃣ Install Frontend Dependencies (New Terminal)

```bash
cd frontend
npm install
```

## 4️⃣ Start Frontend

```bash
npm run dev
```

Expected output:
```
VITE v4.x.x ready in xxx ms
➜  Local:   http://127.0.0.1:5173/
```

## 5️⃣ Open Application

Visit: **http://localhost:5173**

## 6️⃣ Create Account

- Click "Sign Up"
- Enter name, email, password
- Wait for redirect to dashboard

## 7️⃣ Add GitHub Token (Optional)

1. Go to: https://github.com/settings/tokens
2. Generate new token with `repo` and `user` scopes
3. Copy token
4. In app, go to Settings
5. Paste GitHub token
6. Your repositories will auto-sync!

## 8️⃣ Explore

- **Dashboard**: View overall statistics
- **Analytics**: Deep dive into repository metrics

---

## 🆘 Prerequisites Check

Before starting, ensure you have:

```bash
# Check Node.js
node --version  # Should be v16+

# Check npm
npm --version

# MongoDB should be running
mongosh  # Should connect (if local MongoDB)
```

---

## 🎯 That's it! Your app is running! 🎉

For detailed setup, see `SETUP.md`

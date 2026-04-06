# 🚀 COMPLETE SETUP & SYNC GUIDE

## ✅ PREREQUISITES CHECK

### 1. MongoDB is RUNNING
- You said you installed MongoDB Compass
- **MongoDB Server must also be running in the background**

**Check if running:**
```bash
# If you see "waiting for connections on port 27017", MongoDB is running ✅
mongod
```

### 2. Node.js Version
```bash
node --version  # Should be v14+
npm --version   # Should be v6+
```

---

## 📋 MANUAL STARTUP (DO THIS NOW)

### **WINDOW 1: Start MongoDB**
```bash
# Open Command Prompt, run:
mongod

# Keep this running! You should see:
# [initandlisten] waiting for connections on port 27017
```

### **WINDOW 2: Start Backend**
```bash
cd c:\Users\DELL\Downloads\Analytics\backend
npm install
npm run dev

# Wait for: "Server running on port 5000"
# And: "MongoDB connected successfully"
```

### **WINDOW 3: Start Frontend**
```bash
cd c:\Users\DELL\Downloads\Analytics\frontend
npm run dev

# Wait for: "Local: http://localhost:5173"
```

### **WINDOW 4: Test API Connection**
```bash
curl http://localhost:5000/health
# Should return: {"status":"OK"}
```

---

## 🔄 NOW SYNC YOUR GITHUB DATA

1. Open **http://localhost:5173**
2. You should see the "Sync Repositories" button
3. Click it and **wait 30-60 seconds**
4. Check the browser **Console** (F12) for any errors
5. Check the **Backend terminal** for logs

---

## 🐛 TROUBLESHOOTING

### Problem: "Cannot find module 'express'"
**Solution:** Run in backend folder:
```bash
npm install
```

### Problem: "MongoDB connected failed"
**Solution:**
- MongoDB is not running
- Run `mongod` in a separate terminal window

### Problem: "Port 5000 already in use"
**Solution:**
```bash
# Kill the process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Problem: Sync button shows spinner but no data
**Solution:**
- Open browser Console (F12 → Console tab)
- Look for error messages
- Take a screenshot and send it to me

---

## 📊 EXPECTED RESULT AFTER SYNC

Dashboard should show:
- ✅ Total Commits (number > 0)
- ✅ Pull Requests (number > 0)
- ✅ Issues Resolved (number > 0)
- ✅ Recent Activity feed populated
- ✅ Charts showing data

---

## 🔗 WHAT'S HAPPENING DURING SYNC

1. Your GitHub token is sent to backend
2. Backend calls GitHub API
3. Backend fetches your repositories
4. Commits, PRs, and Issues are saved to MongoDB
5. Dashboard updates with real data

---

## 📞 NEXT STEP

**Send me a screenshot showing:**
1. Browser console (F12) errors (if any)
2. Backend terminal output
3. Frontend showing "Syncing..." state

I'll help fix any issues!

# 🔧 COMPLETE SYNC DEBUGGING GUIDE

## ⚠️ WHY YOU'RE NOT SEEING DATA

There are several reasons your sync might not be showing data:

1. **GitHub token not saved** ❌
2. **GitHub API permissions issue** ❌
3. **Sync only got repositories, not commits/PRs** ❌
4. **MongoDB not storing data** ❌
5. **Frontend not refreshing properly** ❌

---

## 🔍 STEP-BY-STEP DEBUGGING

### **STEP 1: Check if GitHub Token is Saved**

```bash
# Open browser Developer Console (F12)
# Go to Application/Storage → LocalStorage → http://localhost:5173
# Look for: "user" key
# Check if "gitHubToken" is set to something like "ghp_xxx..."
```

**If token is missing or shows as null:**
- Go to Settings page again
- Paste token fresh
- Click Save
- Check LocalStorage again

---

### **STEP 2: Test Backend API Directly**

Open a new Command Prompt and test:

```bash
# Test 1: Health check
curl http://localhost:5000/health

# Test 2: Get your user profile (copy your actual token first)
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/auth/profile

# Test 3: Get repositories
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:5000/repositories
```

**Expected:**
- Test 1: `{"status":"OK"}`
- Test 2: Your user data
- Test 3: Array of repositories

---

### **STEP 3: Check MongoDB for Data**

Open MongoDB Compass and navigate to:
```
Database: git-analytics
Collections:
  - users
  - repositories
  - commits
  - pullrequests
  - issues
```

Click each collection to see if data exists.

---

### **STEP 4: Check Browser Console for Errors**

1. Open http://localhost:5173
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Click **"Sync Repositories"** button
5. **Look for RED error messages**
6. **Screenshot any errors and send them to me**

---

## 🔗 IMPROVED SYNC WORKFLOW

The current sync only gets repositories. We need to **sync repository data** (commits/PRs) too.

Let me give you a manual tested workflow:

### **Manual Full Sync:**

```bash
# 1. First, sync repositories
# Go to Dashboard → Click "Sync Repositories"
# Wait for success message

# 2. Then, get your repository IDs from MongoDB and sync each one
# (This is what we need to automate)
```

---

## ✅ WHAT YOU SHOULD SEE

**After first sync (repositories only):**
- Stats show 0 commits (this is NORMAL - repos synced but not data)
- Settings shows GitHub token ✅

**After syncing repository data:**
- Stats show actual numbers ✅
- Charts show data ✅
- Recent activity shows commits ✅

---

## 🚀 QUICK FIX: AUTO-SYNC REPOSITORY DATA

I'll modify the Dashboard to automatically sync repository data after syncing repos.

The issue is that we need to:
1. Sync repositories ✅ (already done)
2. For each repository, sync its commits, PRs, and issues ❌ (not done)

Let me create an updated version.

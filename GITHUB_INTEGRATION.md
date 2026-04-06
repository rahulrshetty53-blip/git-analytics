# 🔗 GitHub Integration Guide

## Quick Summary

You're almost ready! Follow these simple steps to integrate your GitHub account:

---

## Step 1️⃣ - Create GitHub Personal Access Token (5 minutes)

### **Visit:** https://github.com/settings/tokens

1. Click **"Generate new token"** button
2. Select **"Generate new token (classic)"**
3. Fill in details:
   - **Token name:** `git-analytics`
   - **Expiration:** 30 days (or longer)
   - **Scopes:** Check these boxes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `user` (Read user profile data)

4. Click **"Generate token"** at bottom
5. **COPY YOUR TOKEN** (you won't see it again!)

Token format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## Step 2️⃣ - Add Token in Your App (1 minute)

1. **Refresh** your browser (F5)
2. Click **"Settings"** in the left sidebar
3. Paste your GitHub token in the input field
4. Click **"Add GitHub Token"** button
5. ✅ You'll see: "GitHub token added successfully!"

---

## Step 3️⃣ - See Your Real Data (Instant!)

### **Your repositories will automatically appear!**

#### **On Dashboard:**
- Total Commits → Will show your commit count
- Pull Requests → Will show your PR count
- Issues Resolved → Will show closed issues
- Velocity → Shows commits per week
- Recent Activity → Shows your recent commits

#### **On Analytics Page:**
- Select any repository
- See commit trends
- View top contributors
- Check PR statistics
- View language distribution

---

## 🎯 What Happens After Token is Added

```
1. System fetches your repositories from GitHub
2. Stores them in MongoDB database
3. Calculates analytics automatically
4. Displays real-time data on dashboard
5. Updates as you make new commits/PRs
```

---

## 🚨 Troubleshooting

### **"Token is invalid"**
- ✅ Check token starts with `ghp_`
- ✅ Verify token has `repo` and `user` scopes
- ✅ Make sure token is still valid (not expired)

### **"No repositories showing"**
- ✅ Make sure you have repositories in your GitHub account
- ✅ Token might not have correct permissions
- ✅ Try generating a new token

### **Analytics page shows "No data"**
- ✅ Repositories need to be synced first
- ✅ Try refreshing the page
- ✅ Check browser console (F12) for errors

---

## ⚡ Quick Reference

| What | Where | Status |
|------|-------|--------|
| Create Token | github.com/settings/tokens | 👉 Do this first |
| Add Token | Dashboard → Settings | 👉 Then this |
| View Data | Dashboard | ✅ See stats |
| Analytics | Analytics page | ✅ Detailed metrics |

---

## 📞 Need Help?

### **Browser Console** (F12)
- Check for any error messages
- Network tab shows API calls

### **Backend Terminal**
- Watch for logs when syncing
- Shows if GitHub API calls succeed

### **MongoDB Compass**
- Open to see data in database
- Check `repositories` collection
- Check `commits` collection

---

**Next Step:** 👉 Go to Settings and paste your GitHub token!

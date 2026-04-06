# 📊 MongoDB Connection Guide

## ✅ Status: CONNECTED

**Backend Status:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📊 API: http://localhost:5000
✅ Environment: development
```

**MongoDB Details:**
```
Host: localhost
Port: 27017
Database: git-analytics
Status: Connected ✅
```

---

## 🗄️ Database Structure

Your MongoDB will have the following collections:

### **Collections (Auto-created on first use):**

1. **users** - Stores user accounts
   - Fields: name, email, password, role, gitHubToken, avatar, isActive, timestamps

2. **repositories** - Stores GitHub repositories
   - Fields: userId, gitHubId, name, fullName, description, language, stars, forks, isSynced, lastSyncedAt

3. **commits** - Stores git commits
   - Fields: repositoryId, userId, gitHubSha, message, author, url, additions, deletions, filesChanged, committedDate

4. **pullrequests** - Stores pull request data
   - Fields: repositoryId, userId, gitHubId, number, title, state, author, url, createdAt, updatedAt, mergedAt, closedAt, additions, deletions

5. **issues** - Stores GitHub issues
   - Fields: repositoryId, userId, gitHubId, number, title, state, author, labels, assignees, url, createdAt, updatedAt, closedAt

---

## 🔐 Default Credentials

Your backend is configured with:

**Database:** `git-analytics`
**Username:** (None - local MongoDB doesn't require auth by default)
**Password:** (None)

To add authentication (optional), you would run:
```javascript
db.createUser({
  user: "gitadmin",
  pwd: "your_password",
  roles: [ { role: "readWrite", db: "git-analytics" } ]
})
```

---

## 🛠️ How to Explore in MongoDB Compass

1. **Direct Connection:**
   - Host: localhost
   - Port: 27017
   - Click "Connect"

2. **View Databases:**
   - Left sidebar shows all databases
   - You'll see "git-analytics" when you create it

3. **View Collections:**
   - Click database name
   - See all collections (users, repositories, commits, etc.)

4. **View Documents:**
   - Click collection name
   - See all documents (data)
   - Click any document to view details

---

## 💾 Data Storage Location

**Windows Local MongoDB:**
```
C:\Program Files\MongoDB\Server\7.0\data\
```

**Connection String for .env:**
```
MONGODB_URI=mongodb://localhost:27017/git-analytics
```

---

## ✅ Verification Checklist

- [x] MongoDB installed
- [x] MongoDB running on port 27017
- [x] Backend connected to MongoDB
- [x] Database: git-analytics ready
- [x] Collections will auto-create

---

## 🚀 Next Steps

1. ✅ MongoDB running locally
2. ✅ Backend connected
3. **⏳ Start Frontend:**
   ```bash
   cd c:\Users\DELL\Downloads\Analytics\frontend
   npm run dev
   ```

4. **⏳ Open Browser:**
   ```
   http://localhost:5173
   ```

5. **⏳ Test Application:**
   - Create account
   - Login
   - Explore dashboard

---

## 📱 What You Can Do Now

### In Compass GUI:
- View databases
- Create test documents
- Execute MongoDB queries
- Monitor data changes
- Backup/export data

### In Browser (when frontend starts):
- Sign up for an account
- Add GitHub token
- Sync repositories
- View analytics
- See data in real-time

---

## 🔌 Connection Info Summary

| Property | Value |
|----------|-------|
| **Host** | localhost |
| **Port** | 27017 |
| **Database** | git-analytics |
| **Username** | (none) |
| **Password** | (none) |
| **URI** | mongodb://localhost:27017/git-analytics |
| **Status** | ✅ Connected |

---

## 📝 Sample Data Structure (after signup)

### User Document Example:
```json
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "$2a$10$hashed...",
  "role": "developer",
  "gitHubToken": "ghp_xxx...",
  "isActive": true,
  "createdAt": ISODate("2024-01-15T..."),
  "updatedAt": ISODate("2024-01-15T...")
}
```

### Repository Document Example:
```json
{
  "_id": ObjectId("..."),
  "userId": ObjectId("..."),
  "gitHubId": "123456",
  "name": "awesome-project",
  "fullName": "johndoe/awesome-project",
  "language": "JavaScript",
  "starsCount": 42,
  "forksCount": 5,
  "isSynced": true,
  "lastSyncedAt": ISODate("2024-01-15T...")
}
```

---

## 🎯 Ready to Continue?

**Backend:** ✅ Running on http://localhost:5000
**MongoDB:** ✅ Connected on localhost:27017
**Frontend:** ⏳ Ready to start

**Next: Start Frontend and Open Application**

```bash
cd c:\Users\DELL\Downloads\Analytics\frontend
npm run dev
```

Then visit: **http://localhost:5173**

---

**MongoDB is now fully set up! 🎉**

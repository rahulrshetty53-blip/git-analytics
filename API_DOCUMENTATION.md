# 📚 API Documentation

Complete API reference for Git Analytics Backend.

## 🔗 Base URL

```
http://localhost:5000
```

## 🔐 Authentication

All endpoints (except `/auth/signup` and `/auth/login`) require JWT token in header:

```
Authorization: Bearer <your_jwt_token>
```

---

## 👤 Authentication Endpoints

### 1. Sign Up
Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer"
  }
}
```

**Error (400):**
```json
{
  "message": "User already exists"
}
```

---

### 2. Login
Authenticate user with email and password.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

### 3. Add GitHub Token
Link GitHub Personal Access Token to account.

**Endpoint:** `POST /auth/github-token`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "token": "ghp_xxxxxxxx..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "GitHub token added successfully",
  "gitHubToken": "***"
}
```

---

### 4. Get Profile
Get current user profile.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer",
    "gitHubUsername": "johndoe"
  }
}
```

---

## 📦 Repository Endpoints

### 5. Sync All Repositories
Fetch and sync all repositories from GitHub.

**Endpoint:** `POST /repositories/sync`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Synced 15 repositories"
}
```

---

### 6. Get All Repositories
Get list of all user repositories.

**Endpoint:** `GET /repositories`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "gitHubId": "1234567",
    "name": "awesome-project",
    "fullName": "johndoe/awesome-project",
    "description": "An awesome project",
    "language": "JavaScript",
    "starsCount": 42,
    "forksCount": 5,
    "isPrivate": false,
    "isSynced": true,
    "lastSyncedAt": "2024-01-15T10:30:00Z"
  }
]
```

---

### 7. Sync Repository Data
Sync commits, PRs, and issues for specific repository.

**Endpoint:** `POST /repositories/sync/:repositoryId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Repository data synced successfully",
  "commits": 250,
  "prs": 45,
  "issues": 12
}
```

---

### 8. Get Repository Details
Get specific repository with statistics.

**Endpoint:** `GET /repositories/:repositoryId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "gitHubId": "1234567",
  "name": "awesome-project",
  "fullName": "johndoe/awesome-project",
  "language": "JavaScript",
  "stats": {
    "commits": 250,
    "prs": 45,
    "issues": 12
  }
}
```

---

## 📊 Analytics Endpoints

### 9. Get Dashboard Statistics
Get overall dashboard metrics.

**Endpoint:** `GET /analytics/stats`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "totalCommits": 156,
  "totalPullRequests": 28,
  "resolvedIssues": 15,
  "velocity": 36
}
```

---

### 10. Get Chart Data
Get time-series data for charts (last 30 days).

**Endpoint:** `GET /analytics/chart-data?days=30`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `days` (optional): Number of days to fetch (default: 30)

**Response (200):**
```json
[
  {
    "date": "2024-01-01",
    "commits": 5,
    "pullRequests": 2
  },
  {
    "date": "2024-01-02",
    "commits": 8,
    "pullRequests": 1
  }
]
```

---

### 11. Get Recent Activity
Get recent commits and activities.

**Endpoint:** `GET /analytics/recent-activity?limit=10`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Query Parameters:**
- `limit` (optional): Number of activities to fetch (default: 10)

**Response (200):**
```json
[
  {
    "title": "Fix: resolve authentication bug",
    "repository": "awesome-project",
    "author": "John Doe",
    "time": "2024-01-15"
  },
  {
    "title": "Feature: add dark mode",
    "repository": "awesome-project",
    "author": "John Doe",
    "time": "2024-01-14"
  }
]
```

---

### 12. Get Repository Analytics
Get detailed analytics for specific repository.

**Endpoint:** `GET /analytics/repository/:repositoryId`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "commitTrends": [
    {
      "_id": "2024-01-01",
      "count": 5
    },
    {
      "_id": "2024-01-02",
      "count": 8
    }
  ],
  "topContributors": [
    {
      "name": "John Doe",
      "commits": 145
    },
    {
      "name": "Jane Smith",
      "commits": 102
    }
  ],
  "prStats": {
    "open": 5,
    "closed": 20,
    "merged": 25,
    "avgReviewTime": 12
  },
  "languages": [
    {
      "name": "JavaScript",
      "value": 45
    },
    {
      "name": "CSS",
      "value": 30
    }
  ]
}
```

---

## 🔍 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## 🧪 Testing with cURL

### Example: Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Example: Get Chart Data
```bash
curl -X GET http://localhost:5000/analytics/chart-data \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📝 Error Response Format

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## 🔑 Sample JWT Token

JWT tokens contain:
```
Header: { alg: "HS256", typ: "JWT" }
Payload: { id: "507f1f77bcf86cd799439011", iat: 1234567890 }
Signature: HMACSHA256(...)
```

Tokens expire in: **7 days**

---

## 🚀 Integration Example (JavaScript/Axios)

```javascript
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000'
})

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Example usage
async function getDashboardStats() {
  try {
    const response = await api.get('/analytics/stats')
    console.log(response.data)
  } catch (error) {
    console.error(error.response.data)
  }
}
```

---

## 📞 API Rate Limits

Currently no rate limits implemented. For production, consider adding:
- 100 requests per minute per user
- Exponential backoff for failed requests

---

**Happy coding! 🚀**

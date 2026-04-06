# Git Analytics & Developer Productivity Dashboard

## 📊 Overview

A production-grade SaaS application that provides real-time insights into:
- Code activity and commit frequency
- Pull request statistics and review metrics
- Developer productivity and velocity
- Engineering bottlenecks and workflow analysis
- Issue resolution tracking

## 🎯 Features

✅ **User Authentication**
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control

✅ **GitHub Integration**
- Connect via Personal Access Token
- Fetch repositories, commits, PRs, and issues
- Real-time data synchronization

✅ **Analytics Dashboard**
- Commit frequency tracking (daily/weekly/monthly)
- Pull request statistics and review time
- Issue resolution metrics
- Developer velocity calculations
- Activity heatmaps

✅ **Data Visualization**
- Line charts for trends over time
- Bar charts for comparisons
- Pie charts for distributions
- Activity leaderboards

✅ **Responsive Design**
- Modern, clean SaaS UI
- Mobile-friendly interface
- Dark mode support

## 🏗️ Architecture

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js + Express** server
- **MongoDB** with Mongoose ORM
- **JWT** authentication
- **GitHub REST API** integration
- **MVC** architecture pattern

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- GitHub Personal Access Token

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Analytics
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Frontend Setup**
```bash
cd frontend
npm install
```

### Configuration

Create `.env` in the backend folder:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/git-analytics
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
GITHUB_API_BASE_URL=https://api.github.com
FRONTEND_URL=http://localhost:5173
```

### Running the Application

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm run dev
```

Then open: **http://localhost:5173**

## 📚 API Documentation

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login user
- `POST /auth/github-token` - Add GitHub token
- `GET /auth/profile` - Get user profile

### Repositories
- `GET /repositories` - Get all repositories
- `POST /repositories/sync` - Sync repositories
- `POST /repositories/sync/:id` - Sync repository data

### Analytics
- `GET /analytics/stats` - Dashboard statistics
- `GET /analytics/chart-data` - Chart data
- `GET /analytics/recent-activity` - Recent activity
- `GET /analytics/repository/:id` - Repository analytics

## 📊 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/developer),
  gitHubToken: String,
  gitHubUsername: String
}
```

### Repository
```javascript
{
  userId: ObjectId,
  gitHubId: String,
  name: String,
  fullName: String,
  description: String,
  language: String,
  starsCount: Number,
  forksCount: Number
}
```

### Commit
```javascript
{
  repositoryId: ObjectId,
  userId: ObjectId,
  gitHubSha: String,
  message: String,
  author: {name, email},
  additions: Number,
  deletions: Number,
  committedDate: Date
}
```

### PullRequest
```javascript
{
  repositoryId: ObjectId,
  userId: ObjectId,
  number: Number,
  title: String,
  state: String (open/closed/merged),
  author: {name, login},
  createdAt: Date,
  mergedAt: Date,
  reviewers: [String]
}
```

### Issue
```javascript
{
  repositoryId: ObjectId,
  userId: ObjectId,
  number: Number,
  title: String,
  state: String (open/closed),
  labels: [String],
  createdAt: Date,
  closedAt: Date
}
```

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Password hashing with bcryptjs
- ✅ CORS protection
- ✅ Input validation
- ✅ Protected API routes
- ✅ Environment variable configuration
- ✅ Error handling middleware
- ✅ MongoDB injection prevention

## 📈 Performance

- Redis caching (optional)
- Database indexing on frequently queried fields
- Efficient GitHub API calls
- Optimized MongoDB aggregations
- Lazy loading of components
- Code splitting in frontend

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ using React + Node.js**

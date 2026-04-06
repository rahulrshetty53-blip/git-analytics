# Deployment Guide

## Production Deployment

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- GitHub Personal Access Token
- Heroku/AWS account

### Environment Variables (Production)
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/git-analytics
JWT_SECRET=your_production_secret_key
FRONTEND_URL=https://your-domain.com
```

### Deployment Steps

1. **Backend Deployment (Heroku)**
```bash
heroku login
heroku create your-app-name
git subtree push --prefix backend heroku main
```

2. **Frontend Deployment (Vercel)**
```bash
npm install -g vercel
vercel
```

3. **Database Setup**
- Create MongoDB Atlas cluster
- Add connection string to .env
- Run migrations

4. **Security Checklist**
- [ ] Generate new JWT secret
- [ ] Set environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up monitoring

### Performance Optimization
- Enable Redis caching
- Optimize MongoDB queries
- Implement CDN for frontend
- Use database indexing


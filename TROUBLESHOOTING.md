# Troubleshooting Guide

## Common Issues

### MongoDB Connection Failed
**Problem:** Cannot connect to MongoDB
**Solution:**
1. Verify MongoDB is running
2. Check connection string in .env
3. Ensure correct credentials for Atlas
4. Firewall rules for port 27017

### GitHub Token Issues
**Problem:** Repositories not syncing
**Solution:**
1. Verify token is valid
2. Check token has correct scopes
3. Regenerate token if expired
4. Test token in GitHub settings

### Frontend Not Loading
**Problem:** Blank page or errors
**Solution:**
1. Check browser console for errors
2. Verify backend is running
3. Check CORS configuration
4. Clear browser cache

### API Errors
**Problem:** 500 or 401 errors
**Solution:**
1. Check backend logs
2. Verify JWT token validity
3. Check database connection
4. Validate request format

### Data Not Syncing
**Problem:** Repositories visible but no data
**Solution:**
1. Click "Sync Repositories" button
2. Check browser console logs
3. Verify GitHub API limits not exceeded
4. Check network requests in DevTools

## Performance Issues

### Slow Dashboard Loading
- Clear MongoDB collections
- Check indexing
- Reduce time range filter
- Check network speed

### High Memory Usage
- Restart backend service
- Check for memory leaks
- Clear MongoDB cache
- Optimize queries

## Debug Mode

Enable logging:
```bash
DEBUG=git-analytics:* npm run dev
```


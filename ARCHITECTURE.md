# System Architecture

## Overview
Git Analytics is a full-stack SaaS application for tracking developer productivity and engineering metrics.

## Frontend Architecture
```
src/
├── pages/           # Page components
├── components/      # Reusable UI components
├── context/         # React context for state management
├── services/        # API integration
├── hooks/          # Custom React hooks
└── assets/         # Images and static files
```

## Backend Architecture
```
backend/
├── models/         # MongoDB schemas
├── controllers/    # Business logic
├── routes/        # API endpoints
├── middleware/    # Auth and error handling
├── services/      # GitHub API integration
└── config/        # Database configuration
```

## Data Flow
1. User logs in → JWT token issued
2. GitHub token added → Credentials stored
3. Repository sync → GitHub API called
4. Data stored → MongoDB persists
5. Analytics calculated → Real-time metrics
6. Dashboard displays → Charts and stats rendered

## API Architecture
- RESTful endpoints
- JWT authentication
- Error handling
- Request validation
- Response formatting

## Security Layers
- Token-based auth
- Password encryption
- CORS protection
- Input validation
- MongoDB injection prevention


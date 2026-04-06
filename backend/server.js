import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import 'express-async-errors'
import connectDB from './config/db.js'
import { errorHandler } from './middleware/errorHandler.js'
import authRoutes from './routes/auth.js'
import repositoryRoutes from './routes/repositories.js'
import analyticsRoutes from './routes/analytics.js'

dotenv.config()

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/auth', authRoutes)
app.use('/repositories', repositoryRoutes)
app.use('/analytics', analyticsRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 API: http://localhost:${PORT}`)
  console.log(`✅ Environment: ${process.env.NODE_ENV}`)
})

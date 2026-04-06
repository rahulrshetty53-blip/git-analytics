import express from 'express'
import {
  getDashboardStats,
  getChartData,
  getRecentActivity,
  getRepositoryAnalytics
} from '../controllers/analyticsController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.get('/stats', getDashboardStats)
router.get('/chart-data', getChartData)
router.get('/recent-activity', getRecentActivity)
router.get('/repository/:repositoryId', getRepositoryAnalytics)

export default router

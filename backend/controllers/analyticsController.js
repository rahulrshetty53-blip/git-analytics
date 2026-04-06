import analyticsService from '../services/analyticsService.js'
import Repository from '../models/Repository.js'

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.userId
    const stats = await analyticsService.getDashboardStats(userId)

    res.status(200).json(stats)
  } catch (error) {
    next(error)
  }
}

export const getChartData = async (req, res, next) => {
  try {
    const userId = req.userId
    const { days = 30 } = req.query

    const chartData = await analyticsService.getChartData(userId, parseInt(days))

    res.status(200).json(chartData)
  } catch (error) {
    next(error)
  }
}

export const getRecentActivity = async (req, res, next) => {
  try {
    const userId = req.userId
    const { limit = 10 } = req.query

    const activity = await analyticsService.getRecentActivity(userId, parseInt(limit))

    res.status(200).json(activity)
  } catch (error) {
    next(error)
  }
}

export const getRepositoryAnalytics = async (req, res, next) => {
  try {
    const { repositoryId } = req.params
    const userId = req.userId

    // Verify repository belongs to user
    const repo = await Repository.findById(repositoryId)
    if (!repo || repo.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Repository not found' })
    }

    const analytics = await analyticsService.getRepositoryAnalytics(repositoryId)

    res.status(200).json(analytics)
  } catch (error) {
    next(error)
  }
}

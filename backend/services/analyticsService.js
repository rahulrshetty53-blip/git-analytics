import Commit from '../models/Commit.js'
import PullRequest from '../models/PullRequest.js'
import Repository from '../models/Repository.js'

class AnalyticsService {
  async getDashboardStats(userId) {
    try {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const userRepos = await Repository.find({ userId })
      const repoIds = userRepos.map(r => r._id)

      // Get commits count
      const totalCommits = await Commit.countDocuments({
        repositoryId: { $in: repoIds },
        committedDate: { $gte: thirtyDaysAgo }
      })

      // Get PR count
      const totalPullRequests = await PullRequest.countDocuments({
        repositoryId: { $in: repoIds }
      })

      // Get resolved issues
      const resolvedIssues = await PullRequest.countDocuments({
        repositoryId: { $in: repoIds },
        state: 'merged',
        createdAt: { $gte: thirtyDaysAgo }
      })

      // Calculate velocity (commits per week)
      const velocity = Math.round(totalCommits / 4.3)

      return {
        totalCommits,
        totalPullRequests,
        resolvedIssues,
        velocity
      }
    } catch (error) {
      console.error('Error calculating dashboard stats:', error)
      throw error
    }
  }

  async getChartData(userId, days = 30) {
    try {
      const userRepos = await Repository.find({ userId })
      const repoIds = userRepos.map(r => r._id)

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)

      const commits = await Commit.aggregate([
        {
          $match: {
            repositoryId: { $in: repoIds },
            committedDate: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$committedDate' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      const prs = await PullRequest.aggregate([
        {
          $match: {
            repositoryId: { $in: repoIds },
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      // Merge data
      const chartData = commits.map(c => ({
        date: c._id,
        commits: c.count,
        pullRequests: prs.find(p => p._id === c._id)?.count || 0
      }))

      return chartData
    } catch (error) {
      console.error('Error generating chart data:', error)
      throw error
    }
  }

  async getRepositoryAnalytics(repositoryId) {
    try {
      // Commit trends
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const commitTrends = await Commit.aggregate([
        {
          $match: {
            repositoryId,
            committedDate: { $gte: thirtyDaysAgo }
          }
        },
        {
          $group: {
            _id: {
              $dateToString: { format: '%Y-%m-%d', date: '$committedDate' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ])

      // Top contributors
      const topContributors = await Commit.aggregate([
        {
          $match: { repositoryId }
        },
        {
          $group: {
            _id: '$author.name',
            commits: { $sum: 1 }
          }
        },
        { $sort: { commits: -1 } },
        { $limit: 10 },
        {
          $project: {
            _id: 0,
            name: '$_id',
            commits: 1
          }
        }
      ])

      // PR Stats
      const prStats = await PullRequest.aggregate([
        {
          $match: { repositoryId }
        },
        {
          $group: {
            _id: '$state',
            count: { $sum: 1 }
          }
        }
      ])

      let prStatsObj = {
        open: 0,
        closed: 0,
        merged: 0,
        avgReviewTime: 0
      }

      for (const stat of prStats) {
        if (stat._id === 'open') prStatsObj.open = stat.count
        if (stat._id === 'closed') prStatsObj.closed = stat.count
        if (stat._id === 'merged') prStatsObj.merged = stat.count
      }

      return {
        commitTrends,
        topContributors,
        prStats: prStatsObj,
        languages: []
      }
    } catch (error) {
      console.error('Error calculating repository analytics:', error)
      throw error
    }
  }

  async getRecentActivity(userId, limit = 10) {
    try {
      const userRepos = await Repository.find({ userId })
      const repoIds = userRepos.map(r => r._id)

      const commits = await Commit.find({
        repositoryId: { $in: repoIds }
      })
        .sort({ committedDate: -1 })
        .limit(limit)
        .lean()

      return commits.map(c => ({
        title: c.message,
        repository: c.repositoryId?.toString(),
        author: c.author?.name || 'Unknown',
        time: new Date(c.committedDate).toLocaleDateString()
      }))
    } catch (error) {
      console.error('Error fetching recent activity:', error)
      throw error
    }
  }
}

export default new AnalyticsService()

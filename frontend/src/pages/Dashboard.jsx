import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import StatBox from '../components/StatBox'
import Card from '../components/Card'
import LineChartComponent from '../components/LineChartComponent'
import BarChartComponent from '../components/BarChartComponent'
import api from '../services/api'
import { GitBranch, GitPullRequest, AlertCircle, TrendingUp, RefreshCw } from 'lucide-react'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchDashboardData()
    // Auto-sync repositories on first load
    syncRepositories()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [statsRes, activityRes, chartRes] = await Promise.all([
        api.get('/analytics/stats'),
        api.get('/analytics/recent-activity'),
        api.get('/analytics/chart-data')
      ])

      setStats(statsRes.data)
      setRecentActivity(activityRes.data)
      setChartData(chartRes.data)
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const syncRepositories = async () => {
    try {
      setSyncing(true)
      setError(null)

      // Step 1: Sync repositories list
      console.log('🔄 Step 1: Syncing repositories...')
      const reposResponse = await api.post('/repositories/sync')
      console.log('✅ Repositories synced:', reposResponse.data)
      setSuccess(`📦 ${reposResponse.data.message}. Syncing repository data...`)

      // Step 2: Get all repositories
      console.log('🔄 Step 2: Fetching repository list...')
      const reposList = await api.get('/repositories')
      console.log('✅ Repositories list:', reposList.data)

      // Step 3: Sync data for each repository
      if (reposList.data && reposList.data.length > 0) {
        console.log(`🔄 Step 3: Syncing data for ${reposList.data.length} repositories...`)
        for (let i = 0; i < reposList.data.length; i++) {
          const repo = reposList.data[i]
          try {
            console.log(`  ⏳ Syncing ${repo.name}... (${i + 1}/${reposList.data.length})`)
            await api.post(`/repositories/sync/${repo._id}`)
            console.log(`  ✅ Synced ${repo.name}`)
          } catch (err) {
            console.warn(`  ⚠️ Could not sync ${repo.name}:`, err.message)
          }
        }
        console.log('✅ All repositories synced!')
      }

      // Step 4: Refresh dashboard data
      console.log('🔄 Step 4: Refreshing dashboard data...')
      await fetchDashboardData()
      setSuccess(`✨ Sync complete! Your data is now updated.`)
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      console.error('❌ Sync error:', err)
      setError(err.response?.data?.message || 'Sync failed. Check console for details.')
    } finally {
      setSyncing(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your productivity overview.</p>
          </div>
          <button
            onClick={syncRepositories}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Repositories'}
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✅ {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatBox
              title="Total Commits"
              value={stats.totalCommits}
              subtitle="This month"
              icon={GitBranch}
              color="blue"
            />
            <StatBox
              title="Pull Requests"
              value={stats.totalPullRequests}
              subtitle="Open & closed"
              icon={GitPullRequest}
              color="purple"
            />
            <StatBox
              title="Issues Resolved"
              value={stats.resolvedIssues}
              subtitle="This month"
              icon={AlertCircle}
              color="green"
            />
            <StatBox
              title="Velocity"
              value={stats.velocity}
              subtitle="Commits/week"
              icon={TrendingUp}
              color="orange"
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {chartData.length > 0 && (
            <>
              <LineChartComponent
                data={chartData}
                title="Activity Over Time"
              />
              <BarChartComponent
                data={chartData.slice(0, 7)}
                title="Weekly Statistics"
              />
            </>
          )}
        </div>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">by {activity.author}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard

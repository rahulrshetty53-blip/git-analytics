import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import api from '../services/api'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

function Analytics() {
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [analyticsData, setAnalyticsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRepositories()
  }, [])

  useEffect(() => {
    if (selectedRepo) {
      fetchAnalytics(selectedRepo)
    }
  }, [selectedRepo])

  const fetchRepositories = async () => {
    try {
      const res = await api.get('/repositories')
      setRepositories(res.data)
      if (res.data.length > 0) {
        setSelectedRepo(res.data[0]._id)
      }
    } catch (err) {
      console.error('Error fetching repositories:', err)
      setError('Failed to load repositories')
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async (repoId) => {
    try {
      setLoading(true)
      const res = await api.get(`/analytics/repository/${repoId}`)
      setAnalyticsData(res.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Deep dive into your repository metrics</p>
        </div>

        {/* Repository Selector */}
        {repositories.length > 0 && (
          <Card className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Repository
            </label>
            <select
              value={selectedRepo || ''}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            >
              {repositories.map((repo) => (
                <option key={repo._id} value={repo._id}>
                  {repo.name}
                </option>
              ))}
            </select>
          </Card>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Analytics Visualizations */}
        {analyticsData && (
          <div className="space-y-8">
            {/* Commit Trends */}
            <Card title="Commit Trends (30 Days)">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.commitTrends || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    name="Commits"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Contributors */}
            <Card title="Top Contributors">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.topContributors || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="commits" fill="#3b82f6" name="Commits" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Language Distribution */}
            {analyticsData.languages && analyticsData.languages.length > 0 && (
              <Card title="Language Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={analyticsData.languages}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {analyticsData.languages.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            )}

            {/* PR Statistics */}
            <Card title="Pull Request Statistics">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Open</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analyticsData.prStats?.open || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Merged</p>
                  <p className="text-2xl font-bold text-green-600">
                    {analyticsData.prStats?.merged || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Closed</p>
                  <p className="text-2xl font-bold text-red-600">
                    {analyticsData.prStats?.closed || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Avg Review Time</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {analyticsData.prStats?.avgReviewTime || 0}h
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Analytics

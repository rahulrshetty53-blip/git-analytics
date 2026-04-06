import { useState } from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import api from '../services/api'
import { Key, Github } from 'lucide-react'

function Settings() {
  const [gitHubToken, setGitHubToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAddGitHubToken = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await api.post('/auth/github-token', {
        token: gitHubToken
      })
      setSuccess('GitHub token added successfully! Your repositories will be synced automatically.')
      setGitHubToken('')
      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add GitHub token')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your integrations and preferences</p>
        </div>

        {/* GitHub Integration Card */}
        <Card className="max-w-2xl">
          <div className="flex items-start gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <Github className="w-8 h-8 text-gray-900" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">GitHub Integration</h2>
              <p className="text-gray-600 mb-6">
                Connect your GitHub account to see your repositories, commits, pull requests, and issues in real-time.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                  ✅ {success}
                </div>
              )}

              <form onSubmit={handleAddGitHubToken} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Personal Access Token
                  </label>
                  <input
                    type="password"
                    value={gitHubToken}
                    onChange={(e) => setGitHubToken(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none font-mono text-sm"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 Create token at: {' '}
                    <a
                      href="https://github.com/settings/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      github.com/settings/tokens
                    </a>
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>📋 Required Scopes:</strong>
                  </p>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>✅ <code className="bg-blue-100 px-2 py-1 rounded">repo</code> - Full control of private repositories</li>
                    <li>✅ <code className="bg-blue-100 px-2 py-1 rounded">user</code> - Read user profile data</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !gitHubToken.trim()}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Key className="w-5 h-5" />
                    {loading ? 'Adding Token...' : 'Add GitHub Token'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card className="max-w-2xl mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">What Happens Next?</h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white text-sm font-semibold">1</div>
              <div>
                <p className="font-medium text-gray-900">Repositories Sync</p>
                <p className="text-sm text-gray-600">Your GitHub repositories will automatically appear</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white text-sm font-semibold">2</div>
              <div>
                <p className="font-medium text-gray-900">Data Collection</p>
                <p className="text-sm text-gray-600">Dashboard will show commits, PRs, issues, and metrics</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white text-sm font-semibold">3</div>
              <div>
                <p className="font-medium text-gray-900">Real-time Analytics</p>
                <p className="text-sm text-gray-600">View detailed analytics in the Analytics page</p>
              </div>
            </div>
          </div>
        </Card>

        {/* How to Create Token */}
        <Card className="max-w-2xl mt-6 bg-yellow-50">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📖 How to Create a GitHub Token</h3>
          <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
            <li>Visit <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">github.com/settings/tokens</a></li>
            <li>Click "Generate new token" → "Generate new token (classic)"</li>
            <li>Name it: <code className="bg-gray-200 px-2 py-1 rounded">git-analytics</code></li>
            <li>Set Expiration to 30 days (or longer)</li>
            <li>Check <code className="bg-gray-200 px-2 py-1 rounded">repo</code> and <code className="bg-gray-200 px-2 py-1 rounded">user</code> scopes</li>
            <li>Click "Generate token"</li>
            <li>Copy the token and paste it above</li>
          </ol>
        </Card>
      </div>
    </Layout>
  )
}

export default Settings

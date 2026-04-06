import { Link } from 'react-router-dom'
import { BarChart3, GitBranch, BarChart2, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-700">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-8 h-8" />
          <h1 className="text-xl font-bold">GitMetrics</h1>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-blue-700">
        <p className="text-sm text-blue-100">Logged in as</p>
        <p className="font-semibold text-white truncate">{user?.name}</p>
        <p className="text-xs text-blue-200 truncate">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <Link
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <GitBranch className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/analytics"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <BarChart2 className="w-5 h-5" />
          <span>Analytics</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

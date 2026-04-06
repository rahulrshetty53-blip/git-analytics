import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const userData = JSON.parse(localStorage.getItem('user'))
        setUser(userData)
      } catch (err) {
        console.error('Error loading user data:', err)
      }
    }
    setLoading(false)
  }, [])

  const signup = async (name, email, password) => {
    try {
      setError(null)
      const response = await api.post('/auth/signup', {
        name,
        email,
        password
      })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate('/dashboard')
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Signup failed'
      setError(errorMsg)
      throw err
    }
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await api.post('/auth/login', {
        email,
        password
      })
      const { token, user: userData } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      navigate('/dashboard')
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed'
      setError(errorMsg)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  const addGitHubToken = async (token) => {
    try {
      setError(null)
      const response = await api.post('/auth/github-token', { token })
      const updatedUser = { ...user, gitHubToken: response.data.gitHubToken }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add GitHub token'
      setError(errorMsg)
      throw err
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signup,
        login,
        logout,
        addGitHubToken,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

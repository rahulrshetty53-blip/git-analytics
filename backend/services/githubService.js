import axios from 'axios'

const GITHUB_API_BASE = process.env.GITHUB_API_BASE_URL || 'https://api.github.com'

class GitHubService {
  constructor(token) {
    this.token = token
    this.client = axios.create({
      baseURL: GITHUB_API_BASE,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    })
  }

  async getRepositories() {
    try {
      const response = await this.client.get('/user/repos', {
        params: {
          per_page: 100,
          sort: 'updated',
          direction: 'desc'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching repositories:', error.message)
      throw error
    }
  }

  async getRepository(owner, repo) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}`)
      return response.data
    } catch (error) {
      console.error('Error fetching repository:', error.message)
      throw error
    }
  }

  async getCommits(owner, repo, params = {}) {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/commits`, {
        params: {
          per_page: 100,
          ...params
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching commits:', error.message)
      throw error
    }
  }

  async getPullRequests(owner, repo, state = 'all') {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/pulls`, {
        params: {
          state,
          per_page: 100
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching pull requests:', error.message)
      throw error
    }
  }

  async getIssues(owner, repo, state = 'all') {
    try {
      const response = await this.client.get(`/repos/${owner}/${repo}/issues`, {
        params: {
          state,
          per_page: 100
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching issues:', error.message)
      throw error
    }
  }

  async getContributors(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/contributors`,
        {
          params: { per_page: 50 }
        }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching contributors:', error.message)
      throw error
    }
  }

  async getLanguages(owner, repo) {
    try {
      const response = await this.client.get(
        `/repos/${owner}/${repo}/languages`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching languages:', error.message)
      throw error
    }
  }
}

export default GitHubService

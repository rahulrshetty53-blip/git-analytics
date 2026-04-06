import Repository from '../models/Repository.js'
import Commit from '../models/Commit.js'
import PullRequest from '../models/PullRequest.js'
import Issue from '../models/Issue.js'
import User from '../models/User.js'
import GitHubService from '../services/githubService.js'

export const syncRepositories = async (req, res, next) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId).select('+gitHubToken')

    if (!user || !user.gitHubToken) {
      return res.status(400).json({ message: 'GitHub token not found. Please add your token in Settings.' })
    }

    const githubService = new GitHubService(user.gitHubToken)
    const repos = await githubService.getRepositories()

    for (const repo of repos) {
      await Repository.updateOne(
        { gitHubId: repo.id.toString(), userId },
        {
          gitHubId: repo.id.toString(),
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.url,
          htmlUrl: repo.html_url,
          language: repo.language,
          starsCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          watchers: repo.watchers_count,
          isPrivate: repo.private,
          defaultBranch: repo.default_branch,
          userId
        },
        { upsert: true }
      )
    }

    res.status(200).json({
      success: true,
      message: `Synced ${repos.length} repositories`
    })
  } catch (error) {
    next(error)
  }
}

export const getRepositories = async (req, res, next) => {
  try {
    const userId = req.userId
    const repositories = await Repository.find({ userId }).sort({ createdAt: -1 })

    res.status(200).json(repositories)
  } catch (error) {
    next(error)
  }
}

export const syncRepositoryData = async (req, res, next) => {
  try {
    const { repositoryId } = req.params
    const userId = req.userId

    const repository = await Repository.findById(repositoryId)
    if (!repository || repository.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Repository not found' })
    }

    const user = await User.findById(userId).select('+gitHubToken')
    const githubService = new GitHubService(user.gitHubToken)

    const [owner, repo] = repository.fullName.split('/')

    // Sync commits
    const commits = await githubService.getCommits(owner, repo)
    for (const commit of commits) {
      await Commit.updateOne(
        {
          gitHubSha: commit.sha,
          repositoryId: repository._id
        },
        {
          gitHubSha: commit.sha,
          message: commit.commit.message,
          author: {
            name: commit.commit.author.name,
            email: commit.commit.author.email
          },
          url: commit.html_url,
          additions: commit.stats?.additions || 0,
          deletions: commit.stats?.deletions || 0,
          filesChanged: commit.files?.length || 0,
          committedDate: new Date(commit.commit.author.date),
          repositoryId: repository._id,
          userId
        },
        { upsert: true }
      )
    }

    // Sync pull requests
    const prs = await githubService.getPullRequests(owner, repo, 'all')
    for (const pr of prs) {
      await PullRequest.updateOne(
        {
          gitHubId: pr.id.toString(),
          repositoryId: repository._id
        },
        {
          gitHubId: pr.id.toString(),
          number: pr.number,
          title: pr.title,
          body: pr.body,
          author: {
            name: pr.user?.login || 'Unknown',
            login: pr.user?.login || 'Unknown',
            avatarUrl: pr.user?.avatar_url
          },
          state: pr.merged_at ? 'merged' : pr.state,
          url: pr.url,
          htmlUrl: pr.html_url,
          createdAt: new Date(pr.created_at),
          updatedAt: new Date(pr.updated_at),
          closedAt: pr.closed_at ? new Date(pr.closed_at) : null,
          mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
          additions: pr.additions || 0,
          deletions: pr.deletions || 0,
          changedFiles: pr.changed_files || 0,
          commits: pr.commits || 0,
          repositoryId: repository._id,
          userId
        },
        { upsert: true }
      )
    }

    // Sync issues
    const issues = await githubService.getIssues(owner, repo, 'all')
    for (const issue of issues) {
      // Skip pull requests (they have pull_request property)
      if (issue.pull_request) continue

      await Issue.updateOne(
        {
          gitHubId: issue.id.toString(),
          repositoryId: repository._id
        },
        {
          gitHubId: issue.id.toString(),
          number: issue.number,
          title: issue.title,
          body: issue.body,
          author: {
            name: issue.user?.login || 'Unknown',
            login: issue.user?.login || 'Unknown',
            avatarUrl: issue.user?.avatar_url
          },
          state: issue.state,
          labels: issue.labels?.map(l => l.name) || [],
          assignees: issue.assignees?.map(a => a.login) || [],
          url: issue.url,
          htmlUrl: issue.html_url,
          createdAt: new Date(issue.created_at),
          updatedAt: new Date(issue.updated_at),
          closedAt: issue.closed_at ? new Date(issue.closed_at) : null,
          comments: issue.comments || 0,
          repositoryId: repository._id,
          userId
        },
        { upsert: true }
      )
    }

    repository.isSynced = true
    repository.lastSyncedAt = new Date()
    await repository.save()

    res.status(200).json({
      success: true,
      message: 'Repository data synced successfully',
      commits: commits.length,
      prs: prs.length,
      issues: issues.filter(i => !i.pull_request).length
    })
  } catch (error) {
    next(error)
  }
}

export const getRepositoryDetails = async (req, res, next) => {
  try {
    const { repositoryId } = req.params
    const userId = req.userId

    const repository = await Repository.findById(repositoryId)
    if (!repository || repository.userId.toString() !== userId) {
      return res.status(404).json({ message: 'Repository not found' })
    }

    const commits = await Commit.countDocuments({ repositoryId })
    const prs = await PullRequest.countDocuments({ repositoryId })
    const issues = await Issue.countDocuments({ repositoryId })

    res.status(200).json({
      ...repository.toObject(),
      stats: { commits, prs, issues }
    })
  } catch (error) {
    next(error)
  }
}

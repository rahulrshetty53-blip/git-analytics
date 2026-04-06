import mongoose from 'mongoose'

const pullRequestSchema = new mongoose.Schema(
  {
    repositoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Repository',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gitHubId: {
      type: String,
      required: true
    },
    number: Number,
    title: String,
    body: String,
    author: {
      name: String,
      login: String,
      avatarUrl: String
    },
    state: {
      type: String,
      enum: ['open', 'closed', 'merged'],
      default: 'open'
    },
    url: String,
    htmlUrl: String,
    createdAt: Date,
    updatedAt: Date,
    closedAt: Date,
    mergedAt: Date,
    additions: Number,
    deletions: Number,
    changedFiles: Number,
    commits: Number,
    reviews: Number,
    reviewers: [String]
  },
  { timestamps: true }
)

pullRequestSchema.index({ repositoryId: 1, state: 1 })

export default mongoose.model('PullRequest', pullRequestSchema)

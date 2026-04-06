import mongoose from 'mongoose'

const issueSchema = new mongoose.Schema(
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
      enum: ['open', 'closed'],
      default: 'open'
    },
    labels: [String],
    assignees: [String],
    url: String,
    htmlUrl: String,
    createdAt: Date,
    updatedAt: Date,
    closedAt: Date,
    comments: Number
  },
  { timestamps: true }
)

issueSchema.index({ repositoryId: 1, state: 1 })

export default mongoose.model('Issue', issueSchema)

import mongoose from 'mongoose'

const commitSchema = new mongoose.Schema(
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
    gitHubSha: {
      type: String,
      required: true
    },
    message: String,
    author: {
      name: String,
      email: String,
      avatarUrl: String
    },
    url: String,
    additions: Number,
    deletions: Number,
    filesChanged: Number,
    committedDate: Date
  },
  { timestamps: true }
)

commitSchema.index({ repositoryId: 1, committedDate: -1 })

export default mongoose.model('Commit', commitSchema)

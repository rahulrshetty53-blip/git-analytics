import mongoose from 'mongoose'

const repositorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    gitHubId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    fullName: String,
    description: String,
    url: String,
    htmlUrl: String,
    language: String,
    starsCount: {
      type: Number,
      default: 0
    },
    forksCount: {
      type: Number,
      default: 0
    },
    watchers: {
      type: Number,
      default: 0
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    isSynced: {
      type: Boolean,
      default: false
    },
    lastSyncedAt: Date,
    defaultBranch: String
  },
  { timestamps: true }
)

export default mongoose.model('Repository', repositorySchema)

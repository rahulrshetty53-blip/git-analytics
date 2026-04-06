import express from 'express'
import {
  syncRepositories,
  getRepositories,
  syncRepositoryData,
  getRepositoryDetails
} from '../controllers/repositoryController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.use(protect)

router.post('/sync', syncRepositories)
router.get('/', getRepositories)
router.post('/sync/:repositoryId', syncRepositoryData)
router.get('/:repositoryId', getRepositoryDetails)

export default router

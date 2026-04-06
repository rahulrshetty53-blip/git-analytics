import express from 'express'
import { signup, login, addGitHubToken, getProfile } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/github-token', protect, addGitHubToken)
router.get('/profile', protect, getProfile)

export default router

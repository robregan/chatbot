import express from 'express'
import { tokenAuth } from '../middlewares/token.js'
import { chatCompletion } from '../controllers/chatController.js'

const router = express.Router()

router.post('/', tokenAuth, chatCompletion)

export default router

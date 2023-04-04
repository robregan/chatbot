import express from 'express'
import userRoute from './userRoute.js'
import chatRoute from './chatRoute.js'

const router = express.Router()

router.use('/users', userRoute)
router.use('/chats', chatRoute)
export default router

import express from 'express'
import { body } from 'express-validator'
import { userRegister, userSignIn } from '../controllers/userController.js'

import { tokenAuth } from '../middlewares/token.js'
import { validate } from '../utils/validator.js'

const router = express.Router()

router.post(
  '/signup',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 6 })
    .withMessage('username must be at least 6 characters')
    .isLength({ max: 15 })
    .withMessage('username must be at most 15 characters'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
  validate,
  userRegister
)

router.post(
  '/signin',
  body('username')
    .exists()
    .withMessage('username is required')
    .isLength({ min: 6 })
    .withMessage('username must be at least 6 characters'),

  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
  validate,
  userSignIn
)

router.get('/check-token', tokenAuth, (req, res) => {
  res.status(200).json({ username: req.user.username })
})

export default router

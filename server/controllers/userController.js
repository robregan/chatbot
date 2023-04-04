import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body

    const checkUser = await User.findOne({ username })
    if (checkUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({ username })
    user.setPassword(password)

    await user.save()

    res.status(201).json({ message: 'User created' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const userSignIn = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select(
      'username password salt id'
    )
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (!user.validPassword(password)) {
      return res.status(400).json({ message: 'Password incorrect' })
    }

    const token = jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '24h',
    })

    res.status(200).json({ token, username, id: user._id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

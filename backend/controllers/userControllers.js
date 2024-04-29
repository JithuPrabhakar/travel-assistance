import { generateToken } from '../utils/generateToken.js'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    Register a new user
// @route   POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, gender, phone } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    name,
    gender,
    phone,
    email,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      gender: user.gender,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc    Auth user & get token
// @route   POST /api/users
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error('invalid email and password')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged Out Successfully' })
})

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isAdmin: { $ne: true } })
    res.status(200).json(users)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id })
    res.status(200).json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export { authUser, registerUser, logoutUser, getAllUsers, deleteUser }

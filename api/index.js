const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const User = require('./models/User.js')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '12345'

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5174',
  })
)

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json({ createdUser: user })
  } catch (e) {
    res.status(422).json(e)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (checkPassword) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err
          res.cookie('token', token).json(user)
        }
      )
    } else {
      res.status(422).json('pass not ok')
    }
  } else {
    res.json('user not found')
  }
})

app.get('/profile', (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err
      console.log(userData)
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else {
    res.json({ token })
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
})

app.listen(8080)

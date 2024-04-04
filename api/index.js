const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config()

const User = require('./models/User.js')

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '12345'

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
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
          res.cookie('token', token).json('pass ok')
        }
      )
    } else {
      res.status(422).json('pass not ok')
    }
  } else {
    res.json('user not found')
  }
})

app.listen(8080)

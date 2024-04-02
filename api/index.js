const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

mongoose.connect(
  'mongodb+srv://jp1234:jp1234@samplecluster.k1g075f.mongodb.net/travel-assistance'
)

app.get('/test', (req, res) => {
  res.json('test ok')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  res.json({ name, email, password })
})

app.listen(8080)

import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import imageDownloader from 'image-downloader'

dotenv.config()

const port = process.env.PORT || 8000

connectDB()
const app = express()

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie Parser Middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API IS RUNNING')
})

app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.post('upload-by-link', async (req, res) => {
  const { link } = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads' + newName,
  })
  res.json(__dirname + '/uploads' + newName)
})

app.listen(port, () => console.log(`Server running on port : ${port}`))

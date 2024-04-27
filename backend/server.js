import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url' // Import fileURLToPath
import path, { dirname, join } from 'path' // Import dirname and join
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import placeRoutes from './routes/placeRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import imageDownloader from 'image-downloader'
import multer from 'multer'
import fs from 'fs'
// import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 8000

connectDB()
const app = express()

// app.use(cors())

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie Parser Middleware
app.use(cookieParser())

// Use fileURLToPath to get file path from import.meta.url
const __filename = fileURLToPath(import.meta.url)
// Use dirname to get the directory name
const __dirname = dirname(__filename)

// Serve static files
app.use('/uploads', express.static(join(__dirname, 'uploads')))

app.get('/', (req, res) => {
  res.send('API IS RUNNING')
})

app.use('/api/users', userRoutes)
app.use('/api/places', placeRoutes)
app.use('/api/bookings', bookingRoutes)

app.post('/api/upload-by-link', async (req, res) => {
  const { link } = req.body

  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: join(__dirname, 'uploads', newName),
  })
  res.json(newName)
})

const photosMiddleware = multer({ dest: 'backend/uploads/' })
app.post(
  '/api/upload',
  photosMiddleware.array('photos', 100),
  async (req, res) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i]
      const parts = originalname.split('.')
      const ext = parts[parts.length - 1]
      const newPath = path.replace(/\\/g, '/') + '.' + ext
      fs.renameSync(path, newPath)
      uploadedFiles.push(newPath.replace('backend/uploads/', ''))
    }
    res.json(uploadedFiles)
  }
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port : ${port}`))

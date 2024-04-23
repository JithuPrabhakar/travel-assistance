import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url' // Import fileURLToPath
import { dirname, join } from 'path' // Import dirname and join
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import imageDownloader from 'image-downloader'
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

app.post('/suhail', (req, res) => {
  res.send('suh')
})

app.use('/api/users', userRoutes)

app.post('/api/upload-by-link', async (req, res) => {
  // Fix the route path
  console.log('ss')
  const { link } = req.body

  const newName = 'photo' + Date.now() + '.jpg'
  console.log(newName)
  await imageDownloader.image({
    url: link,
    dest: join(__dirname, 'uploads', newName), // Use join to construct path
  })
  res.json(join('/uploads', newName)) // Construct URL correctly
})

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port : ${port}`))

import express from 'express'
import Place from '../models/placeModel.js'
import { protect } from '../middleware/authMiddleware.js' // Import your authentication middleware

const router = express.Router()

router.get('/', async (req, res) => {
  const id = req.query.id
  try {
    const places = await Place.find({ owner: id })
    res.status(200).json(places)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

router.get('/all', async (req, res) => {
  const places = await Place.find()
  res.json(places)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Place.findById({ _id: id }))
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  res.json(await Place.findByIdAndDelete({ _id: id }))
})

router.post('/', protect, async (req, res) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      owner,
      price,
    } = req.body
    const place = await Place.create({
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      owner,
      price,
    })
    res.status(201).json(place)
  } catch (error) {
    console.error('Error creating place:', error)
    res.status(500).json({ error: 'Could not create place' })
  }
})

export default router

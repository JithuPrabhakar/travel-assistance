import express from 'express'
import Booking from '../models/bookingModel.js'

const router = express.Router()

router.post('/', async (req, res) => {
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    cab,
    user,
  } = req.body
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    cab,
    user,
  })
    .then((doc) => {
      res.json(doc)
    })
    .catch((err) => {
      throw err
    })
})

router.get('/', async (req, res) => {
  try {
    let bookings = await Booking.find().populate('place')
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found.' })
    } else {
      res.json(bookings)
    }
  } catch (err) {
    console.error(err)
  }
})

router.get('/all', async (req, res) => {
  try {
    let bookings = await Booking.find()
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found.' })
    } else {
      res.json(bookings)
    }
  } catch (err) {
    console.error(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let booking = await Booking.findByIdAndDelete(id)
    res.status(404).json({ message: 'No bookings found.' })
  } catch (err) {
    console.error(err)
  }
})

export default router

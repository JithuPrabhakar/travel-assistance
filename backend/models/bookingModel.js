import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place' },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: { type: Number },
  cab: { type: Boolean, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking

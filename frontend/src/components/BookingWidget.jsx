import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { useBookHotelMutation } from '../slices/hotelApiSlice'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BookingWidget = ({ data }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [cab, setCab] = useState(false)
  const [redirect, setRedirect] = useState('')

  const [bookHotel] = useBookHotelMutation()

  // const { userInfo } = JSON.parse(localStorage.getItem('userInfo'))
  const { userInfo } = useSelector((state) => state.auth)

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    )
  }

  let amount = 0
  if (numberOfNights > 0) {
    if (cab) {
      amount = (data.price + 500) * numberOfNights
    } else {
      amount = data.price * numberOfNights
    }
  }

  async function bookThisPlace() {
    const bookingData = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      cab,
      price: amount,
      place: data._id,
      user: userInfo._id,
    }
    const response = await bookHotel(bookingData)
    console.log(response.data)
    console.log(response.data._id)
    setRedirect('/account/bookings/')
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <div className='bg-white shadow p-4 rounded-2xl'>
        <div className='text-2xl text-center'>
          Price: Rs.{data.price} / night
        </div>
        <div className='flex'>
          <div className='py-3 px-4'>
            <label>Check in:</label>
            <input
              type='date'
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div className='py-3 px-4 border-l'>
            <label>Check out:</label>
            <input
              type='date'
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
        </div>
        <div className='py-3 px-4 border-t'>
          <label>Number of guests:</label>
          <input
            type='number'
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
          />
        </div>
        <div className='py-3 px-4 border-t flex items-center gap-2'>
          <input type='checkbox' checked={cab} onChange={() => setCab(!cab)} />
          <label>Cab service - Rs. 500/day</label>
        </div>
        <p className='text-xs flex justify-center mb-2'>
          (for 10kms and Rs.10/extra km-can pay after the trip/day)
        </p>
        {numberOfNights > 0 && (
          <div className='py-3 px-4 border-t'>
            <label>Your full name:</label>
            <input
              type='text'
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type='tel'
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
          </div>
        )}
        <button onClick={bookThisPlace} className='primary mt-4'>
          Book this place
          {numberOfNights > 0 && (
            <div className='py-3 px-4 border-t'>Rs. {amount}</div>
          )}
        </button>
      </div>
    </div>
  )
}

export default BookingWidget

import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

const BookingWidget = ({ data }) => {
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    )
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
        <button className='primary'>
          Book this place
          {numberOfNights > 0 && (
            <div className='py-3 px-4 border-t'>
              Rs. {numberOfNights * data.price}
            </div>
          )}
        </button>
      </div>
    </div>
  )
}

export default BookingWidget

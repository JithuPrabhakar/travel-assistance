import { Link, useParams } from 'react-router-dom'
import BookingPage from './BookingPage'
import { useGetBookedHotelsQuery } from '../slices/hotelApiSlice'
import PlaceImage from '../components/PlaceImage'
import { differenceInCalendarDays, format } from 'date-fns'

const BookingsPage = () => {
  const { action } = useParams()

  const { data, isLoading, error } = useGetBookedHotelsQuery()
  console.log({ data, isLoading, error })

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  if (isLoading) {
    return <h3>Loading...</h3>
  }

  const myBookings = data && data.filter((place) => place.user === userInfo._id)
  const place = myBookings.filter((place) => place._id === action)

  return (
    <div>
      {action ? (
        <BookingPage booking={place} />
      ) : (
        <div className='flex gap-4 flex-col'>
          {myBookings.length > 0 &&
            myBookings.map((booking) => (
              <div
                // to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'
              >
                <div className='w-48'>
                  <PlaceImage place={booking.place} />
                </div>
                <div className='py-3 pr-3 grow'>
                  <h2 className='text-xl'>{booking.place.title}</h2>
                  <div className='border-t border-gray-300 text-gray-500 text-sm'>
                    {format(new Date(booking.checkIn), 'yyyy-MM-dd')} &rarr;{' '}
                    {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
                  </div>
                  <div className='text-xl'>
                    Number of Nights:{' '}
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}
                    {' | '}
                    Total amount: Rs.
                    {booking.price}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default BookingsPage

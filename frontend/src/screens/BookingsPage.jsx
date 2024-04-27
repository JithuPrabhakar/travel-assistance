import { useParams } from 'react-router-dom'
import BookingPage from './BookingPage'
import { useGetBookedHotelsQuery } from '../slices/hotelApiSlice'

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
        <BookingPage place={place} />
      ) : (
        <div>
          {myBookings.length > 0 &&
            myBookings.map((booking) => (
              <div key={`${booking._id}-container`}>
                <h2 className='text-center mt-5'>Your bookings: </h2>
                <p>{booking.title}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default BookingsPage

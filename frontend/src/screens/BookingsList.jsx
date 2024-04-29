import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from '../slices/hotelApiSlice'

const BookingsList = () => {
  const { data, isLoading, error, refetch } = useGetAllBookingsQuery()
  const [deleteBooking] = useDeleteBookingMutation()

  const onDelete = async (userId) => {
    try {
      const booking = deleteBooking(userId)
      refetch()
      console.log(booking)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  return (
    <div className='overflow-x-auto'>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Booking ID</th>
              <th className='px-4 py-2'>Booked Place ID</th>
              <th className='px-4 py-2'>Booked Person</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Cab booking</th>
              <th className='px-4 py-2'>Amount</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className='bg-white'>
                <td className='border px-4 py-2'>{user._id}</td>
                <td className='border px-4 py-2'>{user.place}</td>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='border px-4 py-2'>{user.phone}</td>
                <td className='border px-4 py-2'>
                  {user.cab ? 'booked' : 'not booked'}
                </td>
                <td className='border px-4 py-2'>{user.price}</td>
                <td className='border px-4 py-2'>
                  <button
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => onDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default BookingsList

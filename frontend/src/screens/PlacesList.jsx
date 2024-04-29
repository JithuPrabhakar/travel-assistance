import {
  useDeleteHotelMutation,
  useGetAllHotelsQuery,
} from '../slices/hotelApiSlice'

const PlacesList = () => {
  const { data, isLoading, error, refetch } = useGetAllHotelsQuery()
  const [deleteHotel] = useDeleteHotelMutation()

  const onDelete = async (userId) => {
    try {
      const hotel = deleteHotel(userId)
      refetch()
      console.log(hotel)
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
              <th className='px-4 py-2'>Hotel ID</th>
              <th className='px-4 py-2'>Owner ID</th>
              <th className='px-4 py-2'>Location</th>
              <th className='px-4 py-2'>Max Guests</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className='bg-white'>
                <td className='border px-4 py-2'>{user._id}</td>
                <td className='border px-4 py-2'>{user.owner}</td>
                <td className='border px-4 py-2'>{user.address}</td>
                <td className='border px-4 py-2'>{user.maxGuests}</td>
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

export default PlacesList

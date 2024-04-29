import { useAllUsersQuery, useDeleteUserMutation } from '../slices/userApiSlice'

const UserList = () => {
  const { data, isLoading, error, refetch } = useAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()

  const onDelete = async (userId) => {
    try {
      const user = deleteUser(userId)
      refetch()
      console.log(user)
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
              <th className='px-4 py-2'>User ID</th>
              <th className='px-4 py-2'>Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user._id} className='bg-white'>
                <td className='border px-4 py-2'>{user._id}</td>
                <td className='border px-4 py-2'>{user.name}</td>
                <td className='border px-4 py-2'>{user.email}</td>
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

export default UserList

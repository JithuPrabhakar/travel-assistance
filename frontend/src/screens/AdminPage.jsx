import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FaRegUser, FaList, FaHotel } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import UserList from './UserList'
import PlacesList from './PlacesList'
import BookingsList from './BookingsList'

const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [redirect, setRedirect] = useState(null)

  const { userInfo: user } = useSelector((state) => state.auth)

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'users'
  }

  function linkClass(type = null) {
    let classes = 'inline-flex items-center gap-1 py-2 px-6 rounded-full'
    if (type === subpage) {
      classes += ' bg-primary text-white'
    }
    return classes
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      <nav className='w-full flex justify-center my-8 gap-4'>
        <Link className={linkClass('users')} to={'/admin'}>
          <FaRegUser />
          User List
        </Link>
        <Link className={linkClass('bookings')} to={'/admin/bookings'}>
          <FaList />
          Bookings List
        </Link>
        <Link className={linkClass('places')} to={'/admin/places'}>
          <FaHotel />
          Places and Hotels List
        </Link>
      </nav>
      {subpage === 'users' && <UserList />}
      {subpage === 'places' && <PlacesList />}
      {subpage === 'bookings' && <BookingsList />}
    </div>
  )
}

export default AdminPage

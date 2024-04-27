import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import PlacesPage from './PlacesPage'
import { FaRegUser, FaList, FaHotel } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../slices/userApiSlice'
import { logout } from '../slices/authSlice'
import BookingsPage from './BookingsPage'

const AccountPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [redirect, setRedirect] = useState(null)

  const { userInfo: user } = useSelector((state) => state.auth)

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
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
        <Link className={linkClass('profile')} to={'/account'}>
          <FaRegUser />
          My Profile
        </Link>
        <Link className={linkClass('bookings')} to={'/account/bookings'}>
          <FaList />
          My Bookings
        </Link>
        <Link className={linkClass('places')} to={'/account/places'}>
          <FaHotel />
          My Accomodations
        </Link>
      </nav>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name} ({user.email})
          <button onClick={logoutHandler} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
      {subpage === 'bookings' && <BookingsPage />}
    </div>
  )
}

export default AccountPage

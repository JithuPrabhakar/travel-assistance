import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios'
import PlacesPage from './PlacesPage'
import { FaRegUser, FaList, FaHotel } from 'react-icons/fa'

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null)
  const { ready, user, setUser } = useContext(UserContext)

  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = 'profile'
  }

  async function logout() {
    await axios.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!ready) {
    return <div>Loading...</div>
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
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
          <button onClick={logout} className='primary max-w-sm mt-2'>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  )
}

export default AccountPage

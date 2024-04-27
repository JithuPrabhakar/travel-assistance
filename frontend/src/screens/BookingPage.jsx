import { useParams } from 'react-router-dom'

const BookingPage = ({ booking }) => {
  const { action } = useParams()
  console.log(booking)
  return (
    <div>
      <h2>Booked Place</h2>
    </div>
  )
}

export default BookingPage

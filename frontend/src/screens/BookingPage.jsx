import { useParams } from 'react-router-dom'

const BookingPage = ({ place }) => {
  const { action } = useParams()
  console.log(place)
  return (
    <div>
      <h2>Booked Place</h2>
    </div>
  )
}

export default BookingPage

import { useParams } from 'react-router-dom'
import { useGetHotelByIdQuery } from '../slices/hotelApiSlice'
import { useState } from 'react'
import BookingWidget from '../components/BookingWidget'

const Placepage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetHotelByIdQuery(id)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  if (showAllPhotos) {
    return (
      <div className='absolute inset-0 bg-black text-white min-h-screen'>
        <div className='bg-black p-8 grid gap-4'>
          <div>
            <h2 className='text-3xl mr-48'>Photos of {data.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className='fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'
            >
              Close photos
            </button>
          </div>
          {data?.photos?.length > 0 &&
            data.photos.map((photo) => (
              <div key={photo}>
                <img src={'http://localhost:8000/uploads/' + photo} alt='' />
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className='mt-4 bg-gray-100 px-8 pt-8 w-[60%] mx-auto'>
      {!isLoading && data && (
        <div>
          <h1 className='text-3xl'>{data.title}</h1>
          <a
            className='block font-semibold underline my-2'
            target='_blank'
            to={'https://maps.google.com/?q=' + data.address}
          >
            {data.address}
          </a>
          <div className='grid gap-2 grid-cols-[2fr_1fr] relative'>
            <div>
              {data.photos?.[0] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className='aspect-square object-cover cursor-pointer'
                  src={'http://localhost:8000/uploads/' + data.photos[0]}
                />
              )}
            </div>
            <div>
              {data.photos?.[1] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className='aspect-square object-cover cursor-pointer pb-2'
                  src={'http://localhost:8000/uploads/' + data.photos[1]}
                />
              )}
              {data.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className='aspect-square object-cover cursor-pointer'
                  src={'http://localhost:8000/uploads/' + data.photos[2]}
                />
              )}
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500'
            >
              Show more photos
            </button>
          </div>
          <div className='mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]'>
            <div>
              <div className='my-4'>
                <h2 className='font-semibold text-2xl'>Description</h2>
                {data.description}
              </div>
              Check-in: {data.checkIn}
              <br />
              Check-out: {data.checkOut}
              <br />
              Max number of guests: {data.maxGuests}
            </div>
            <div>
              <BookingWidget data={data} />
            </div>
          </div>
          <div className='bg-white -mx-8 px-8 py-8 border-t'>
            <div>
              <h2 className='font-semibold text-2xl'>Extra info</h2>
            </div>
            <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>
              {data.extraInfo}
            </div>
          </div>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default Placepage

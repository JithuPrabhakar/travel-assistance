import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { useGetAllHotelsQuery } from '../slices/hotelApiSlice'

export const IndexPage = () => {
  const { data, isLoading, error } = useGetAllHotelsQuery()
  console.log({ data, isLoading, error })

  return (
    <div className='py-4 px-8 flex flex-col min-h-screen'>
      <Header />
      {isLoading && <div>Loading...</div>}
      <div className='mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
        {!isLoading &&
          data.length > 0 &&
          data.map((place) => (
            <Link to={'/place/' + place._id} key={place._id}>
              <div className='bg-gray-500 mb-2 rounded-2xl flex'>
                {place.photos?.[0] && (
                  <img
                    className='rounded-2xl object-cover aspect-square w-full'
                    alt=''
                    src={'http://localhost:8000/uploads/' + place.photos?.[0]}
                  />
                )}
              </div>
              <h3>{place.title}</h3>
              <p>{place.address}</p>
              <p>Rs. {place.price} / night</p>
            </Link>
          ))}
      </div>
    </div>
  )
}

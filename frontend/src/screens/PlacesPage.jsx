import { Link, Navigate, useParams } from 'react-router-dom'
import { FaPlus, FaUpload } from 'react-icons/fa6'
import Perks from '../components/Perks'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  useGetHotelByIdQuery,
  useGetHotelsQuery,
  useSaveHotelMutation,
  useUploadImageMutation,
  useUploadPhotosMutation,
} from '../slices/hotelApiSlice'

const PlacesPage = () => {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [price, setPrice] = useState(100)
  const [redirect, setRedirect] = useState(false)
  const [photoLink, setPhotoLink] = useState('')

  const [uploadImage] = useUploadImageMutation()
  const [uploadPhotos] = useUploadPhotosMutation()
  const [saveHotel] = useSaveHotelMutation()

  const userInfo = JSON.parse(localStorage.getItem('userInfo'))

  // const { data, isLoading } = useGetHotelsQuery(userInfo._id)

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>
  }
  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>
  }
  function preInput(header, description) {
    return (
      <div>
        {inputHeader(header)}
        {inputDescription(description)}
      </div>
    )
  }

  async function addPhotoByLink(e) {
    e.preventDefault()
    try {
      const res = await uploadImage({
        link: photoLink,
      }).unwrap()
      setAddedPhotos((prev) => {
        return [...prev, res]
      })
      setPhotoLink('')
    } catch (err) {
      console.error(err)
    }
  }

  async function uploadPhoto(e) {
    e.preventDefault()
    const files = e.target.files
    console.log(files)
    const data = new FormData()
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i])
    }
    const { data: filenames } = await uploadPhotos(data)
    setAddedPhotos((prev) => {
      return [...prev, ...filenames]
    })
    console.log(addedPhotos)
  }

  async function addNewPlace(e) {
    e.preventDefault()
    const data = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      owner: userInfo._id,
      price,
    }
    const response = await saveHotel(data)
    console.log(response)
    setRedirect('/account/places')
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div>
      {action !== 'new' ? (
        <div className='text-center'>
          <Link
            className='inline-flex items-center gap-1 bg-primary text-white rounded-full py-2 px-6'
            to={'/account/places/new'}
          >
            <FaPlus />
            Add new place
          </Link>
          {/*<div>
            {isLoading && <div>Loading...</div>}
            {!isLoading &&
              data.length > 0 &&
              data.map((place) => (
                <Link
                  to={'/account/places/' + place._id}
                  key={place._id}
                  className='flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer'
                >
                  <div className='w-32 h-32 bg-gray-300 grow shrink-0'>
                    {place.photos.length && (
                      <img
                        src={'http://localhost:8000/uploads/' + place.photos[0]}
                        alt=''
                      />
                    )}
                  </div>
                  <div className='grow-0 shrink'>
                    <h2 className='text-xl'>{place.title}</h2>
                    <p className='text-sm mt-2'>{place.description}</p>
                  </div>
                </Link>
              ))}
            </div>*/}
        </div>
      ) : (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              'Title',
              'Title for your place. should be short and catchy as in advertisement'
            )}
            <input
              type='text'
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder='title, for example: My lovely apt'
            />
            {preInput('Address', 'Address to this place')}
            <input
              type='text'
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder='address'
            />
            {preInput('Photos', 'more = better')}
            <div className='flex gap-2'>
              <input
                type='text'
                placeholder='Add using link ..... jpg'
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className='bg-gray-200 px-4 rounded-2xl'
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2'>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link, index) => (
                  <div className='h-32 flex' key={index}>
                    <img
                      className='rounded-2xl w-full'
                      src={'http://localhost:8000/uploads/' + link}
                      alt='preview'
                      width='150px'
                      height='150px'
                    />
                  </div>
                ))}
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2'>
              <label className='cursor-pointer flex justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600'>
                <input
                  type='file'
                  multiple
                  className='hidden'
                  onChange={uploadPhoto}
                />
                <FaUpload className='w-8 h-8' />
                Upload
              </label>
            </div>
            {preInput('Description', 'description of the place')}
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            {preInput('Perks', 'select all the perks of your place')}
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput('Extra info', 'house rules, etc')}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              'Check in&out times',
              'add check in and out times, remember to have some time window for cleaning the room between guests'
            )}
            <div className='grid gap-2 grid-cols-2 md:grid-cols-4'>
              <div>
                <h3 className='mt-2 -mb-1'>Check in time</h3>
                <input
                  type='text'
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder='14'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Check out time</h3>
                <input
                  type='text'
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder='11'
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                <input
                  type='number'
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                />
              </div>
              <div>
                <h3 className='mt-2 -mb-1'>Price per night</h3>
                <input
                  type='number'
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                />
              </div>
            </div>
            <button className='primary my-4'>Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacesPage

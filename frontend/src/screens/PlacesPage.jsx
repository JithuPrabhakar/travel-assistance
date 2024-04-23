import { Link, useParams } from 'react-router-dom'
import { FaPlus, FaUpload } from 'react-icons/fa6'
import Perks from '../components/Perks'
import { useState } from 'react'
import axios from 'axios'
import { useUploadImageMutation } from '../slices/userApiSlice'

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

  function inputHeader(text) {
    return <h2 className='text-2xl mt-4'>{text}</h2>
  }
  function inputDescription(text) {
    return <p className='text-gray-500 text-sm'>{text}</p>
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addPhotoByLink(e) {
    e.preventDefault()
    // await axios.post('http://localhost:8000/upload-by-link', {
    //   link: photoLink,
    // })
    console.log('ss')
    await uploadImage({
      link: 'https://img.freepik.com/free-photo/beautiful-view-sunset-sea_23-2148019892.jpg?t=st=1713851196~exp=1713854796~hmac=45163f2bcb7853f834b5513c0d7a3fec438f74f2b4d8969183a0e35065c1fc75&w=1380',
    })
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
        </div>
      ) : (
        <div>
          <form>
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
                addedPhotos.map((link) => (
                  <div key={link}>
                    <img
                      src={'/uploads/' + link}
                      alt='preview'
                      width='150px'
                      height='150px'
                    />
                  </div>
                ))}
            </div>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2'>
              <button className='flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600'>
                <FaUpload className='w-8 h-8' />
                Upload
              </button>
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
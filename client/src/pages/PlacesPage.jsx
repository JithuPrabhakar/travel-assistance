import { Link, useParams } from 'react-router-dom'
import { FaPlus, FaUpload } from 'react-icons/fa6'
import { useState } from 'react'
import Perks from '../components/Perks'
import axios from 'axios'

const PlacesPage = () => {
  const { action } = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  function inputHeader(text) {
    return <h2 className='text-xl mt-4'>{text}</h2>
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

  async function addPhotoByLink(ev) {
    ev.preventDefault()
    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    })
    setAddedPhotos((prev) => {
      return [...prev, filename]
    })
    // onChange((prev) => {
    //   return [...prev, filename]
    // })
    setPhotoLink('')
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
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
                type='text'
                placeholder={'Add using a link ....jpg'}
              />
              <button
                onClick={addPhotoByLink}
                className='bg-gray-200 px-4 rounded-2xl'
              >
                Add&nbsp;photo
              </button>
            </div>
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => <div key={link}>{link}</div>)}
            {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
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
              {/* <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input type="number" value={price}
                   onChange={ev => setPrice(ev.target.value)}/>
          </div> */}
            </div>
            <button className='primary my-4'>Save</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default PlacesPage

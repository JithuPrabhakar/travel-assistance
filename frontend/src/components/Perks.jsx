import { FaWifi, FaSquareParking, FaBowlFood } from 'react-icons/fa6'
import { PiTelevision } from 'react-icons/pi'
import { RiBattery2ChargeFill } from 'react-icons/ri'

const Perks = ({ selected, onChange }) => {
  function handleCbClick(ev) {
    const { checked, name } = ev.target
    if (checked) {
      onChange([...selected, name])
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)])
    }
  }
  return (
    <>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input name='wifi' onChange={handleCbClick} type='checkbox' />
        <FaWifi />
        <span>Wifi</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input name='parking' onChange={handleCbClick} type='checkbox' />
        <FaSquareParking />
        <span>Free Parking spot</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input name='tv' onChange={handleCbClick} type='checkbox' />
        <PiTelevision />
        <span>TV</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input name='ev' onChange={handleCbClick} type='checkbox' />
        <RiBattery2ChargeFill />
        <span>EV Charging</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
        <input name='food' onChange={handleCbClick} type='checkbox' />
        <FaBowlFood />
        <span>Complementary food</span>
      </label>
    </>
  )
}

export default Perks

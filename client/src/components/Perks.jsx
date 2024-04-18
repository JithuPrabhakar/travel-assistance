import { FaWifi,
FaSquareParking,
FaBowlFood } from 'react-icons/fa6'
import { PiTelevision } from 'react-icons/pi'
import { RiBattery2ChargeFill } from 'react-icons/ri'

export default function Perks({selected, onChange}) {
    return (
        <>
            <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' />
                <FaWifi />
                <span>Wifi</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' />
                <FaSquareParking />
                <span>Free Parking spot</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' />
                <PiTelevision />
                <span>TV</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' />
                <RiBattery2ChargeFill />
                <span>EV Charging</span>
              </label>
              <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer'>
                <input type='checkbox' />
                <FaBowlFood />
                <span>Complementary food</span>
              </label>
        </>
    )
}
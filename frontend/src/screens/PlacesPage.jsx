import { Link, useParams } from "react-router-dom";
import {
  FaPlus,
  FaUpload,
  FaWifi,
  FaSquareParking,
  FaBowlFood,
} from "react-icons/fa6";
import { PiTelevision } from "react-icons/pi";
import { RiBattery2ChargeFill } from "react-icons/ri";

const PlacesPage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" ? (
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-1 bg-primary text-white rounded-full py-2 px-6"
            to={"/account/places/new"}
          >
            <FaPlus />
            Add new place
          </Link>
        </div>
      ) : (
        <div>
          <form>
            <h2 className="text-xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              title for your place. should be small and catchy as in
              advertisement
            </p>
            <input type="text" placeholder="title, eg: My Apartment" />
            <h2 className="text-xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">address of your place</p>
            <input type="text" placeholder="address" />
            <h2 className="text-xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">
              photos of your place, the more the better
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="Add using link ..... jpg" />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
              <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <FaUpload className="w-8 h-8" />
                Upload
              </button>
            </div>
            <h2 className="text-xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">description of your place</p>
            <textarea />
            <h2 className="text-xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">
              select all the perks of your place
            </p>
            <div className="grid mt-2 grid-cols-2 md:grid-cols-3 gap-1 lg:grid-cols-6">
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <FaWifi />
                <span>Wifi</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <FaSquareParking />
                <span>Free Parking spot</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <PiTelevision />
                <span>TV</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <RiBattery2ChargeFill />
                <span>EV Charging</span>
              </label>
              <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" />
                <FaBowlFood />
                <span>Complementary food</span>
              </label>
            </div>
            <h2 className="text-xl mt-4">Extra info</h2>
            <p className="text-gray-500 text-sm">house rules, etc</p>
            <textarea />
            <h2 className="text-xl mt-4">Check in & out times, max guests</h2>
            <p className="text-gray-500 text-sm">
              add check in and out times, remember to have some time window for
              cleaning
            </p>
            <div className="grid gap-1 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text" placeholder="14:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input type="text" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input type="text" />
              </div>
            </div>
            <button className="my-4 primary">Save</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;

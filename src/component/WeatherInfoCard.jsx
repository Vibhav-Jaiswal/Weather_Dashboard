import React from "react";
import { FaStreetView } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";

const WeatherInfoCard = ({ search, setSearch, city, addFavorite }) => {
  return (
    <div className="glassCard max-w-lg mx-auto p-4 sm:p-12 text-gray-900 font-medium">
      <div className="max-w-lg flex flex-col sm:flex-row gap-4 mx-auto">
        <input
          type="search"
          className="max-w-lg px-4 py-2 text-md outline-none rounded-md cursor-pointer font-medium"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          className="text-md glassCard px-4 py-2 hover:scale-105 text-gray-900"
          onClick={addFavorite}
        >
          Add To Favourite
        </button>
      </div>

      {!city ? (
        <p className="text-center text-3xl font-semibold text-gray-800 mt-12">
          No Data Found
        </p>
      ) : (
        <div className="pt-8 flex flex-col items-center gap-4">
          <h2 className="flex items-center gap-4 text-3xl font-semibold text-gray-800">
            <FaStreetView />
            {search}
          </h2>
          <h1 className="flex items-center gap-4 text-3xl font-semibold text-gray-800">
            <CiTempHigh />
            {city.temp} °C
          </h1>
          <h1 className="text-xl font-semibold text-gray-800">
            Feels Like: {city.feels_like} °C
          </h1>
          <h1 className="text-xl font-semibold text-gray-800">
            Humidity: {city.humidity} %
          </h1>
          <h3 className="text-xl font-semibold text-gray-800">
            Min: {city.temp_min} °C || Max: {city.temp_max} °C
          </h3>
        </div>
      )}
    </div>
  );
};

export default WeatherInfoCard;

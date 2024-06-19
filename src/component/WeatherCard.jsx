import React, { useEffect, useState } from "react";
import { FaStreetView } from "react-icons/fa";
import { CiTempHigh } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavrateList from "./FavrateList";
import WeatherInfoCard from "./WeatherInfoCard";
import WeatherForecast from "./WeatherForecast";

const WeatherCard = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Ayodhya");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    fetchApi();
  }, [search]);

  const fetchApi = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=62d5bc5e7f41b7a98cdba991db36acca`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const resJson = await response.json();
      setCity(resJson.main);
      toast.success(`Weather data for ${search} fetched successfully!`);
    } catch (error) {
      //   console.error("Error fetching weather data:", error);
      toast.error(`Failed to fetch weather data for ${search}`);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3000/favorites");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      //   console.error("Error fetching favorites:", error);
      toast.error("Failed to fetch favorites");
    }
  };

  const addFavorite = async () => {
    if (!city) return;

    const newFavorite = { name: search, ...city };

    try {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFavorite),
      });

      if (response.ok) {
        fetchFavorites();
        toast.success(`Added ${search} to favorites!`);
      } else {
        toast.error(`Failed to add ${search} to favorites`);
      }
    } catch (error) {
      //   console.error("Error adding favorite:", error);
      toast.error("Failed to add to favorites");
    }
  };

  const removeFavorite = async (id, name) => {
    try {
      const response = await fetch(`http://localhost:3000/favorites/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFavorites();
        toast.success(`Removed ${name} from favorites`);
      } else {
        toast.error(`Failed to remove ${name} from favorites`);
      }
    } catch (error) {
      //   console.error("Error removing favorite:", error);
      toast.error("Failed to remove from favorites");
    }
  };

  const selectFavorite = (name) => {
    setSearch(name);
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full min-h-screen bg-gray-500 p-2 sm:p-12">
        <h1 className="text-6xl text-gray-800 text-center font-bold mb-12">
          Weather App
        </h1>
        <WeatherInfoCard
          search={search}
          setSearch={setSearch}
          city={city}
          addFavorite={addFavorite}
        />

        <WeatherForecast search={search} />

        <FavrateList
          favorites={favorites}
          selectFavorite={selectFavorite}
          removeFavorite={removeFavorite}
        />
      </div>
    </>
  );
};

export default WeatherCard;

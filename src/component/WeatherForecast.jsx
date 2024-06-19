// WeatherForecast.js
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const WeatherForecast = ({ search }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchForecast();
  }, [search]);

  const fetchForecast = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=62d5bc5e7f41b7a98cdba991db36acca`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const { list } = await response.json();
      
      // Filter forecast data to get only the next 5 days
      const filteredForecast = list.filter((item, index) => index % 8 === 0);

      setForecast(filteredForecast);
      toast.success(`Forecast data for ${search} fetched successfully!`);
    } catch (error) {
      toast.error(`Failed to fetch forecast data for ${search}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-12">
      <h1 className="text-3xl text-gray-800 text-center font-bold mb-6">
        5-Day Forecast
      </h1>
      <div className="flex justify-center flex-wrap gap-4">
        {forecast.map((item) => (
          <div key={item.dt} className="glassCard p-4 text-gray-900 font-medium">
            <h2 className="text-xl font-semibold text-gray-800">
              {new Date(item.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </h2>
            <div className="flex items-center justify-center">
              <img
                className="w-12 h-12 mr-2"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <span className="text-xl font-semibold">{item.main.temp.toFixed(1)} °C</span>
            </div>
            <p className="text-sm text-gray-600">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;

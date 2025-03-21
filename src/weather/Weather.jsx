import React from "react";
import "./Weather.css";
import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=frankrike&appid=ffd76b07ad6c23883f4dd787b3c0d8f5&units=metric&lang=sv"
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="weather">
      <h2>Väder i {weather?.name}</h2>
      <p>{weather?.weather?.[0]?.description}</p>
      <p>Temperatur: {weather?.main?.temp}</p>
      <p>Wind: {weather?.wind?.speed}</p>
    </div>
  );
};

export default Weather;

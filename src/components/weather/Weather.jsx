import React from "react";
import "./Weather.css";
import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCordinates] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  console.log(coords);

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
      {weather?.weather?.[0] && (
        <>
          <h2>Väder i {weather.name}</h2>
          <p>Väder beskrivning: {weather.weather[0].description}</p>
          <p>Temperatur: {weather.main?.temp ?? "Okänd"}°C</p>
          <p>Wind: {weather.wind?.speed ?? "Okänd"}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </>
      )}
    </div>
  );
};

export default Weather;

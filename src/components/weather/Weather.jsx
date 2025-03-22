import React from "react";
import "./Weather.css";
import { useEffect, useState } from "react";
import starFilled from "../../images/star-filled.png";
import starEmpty from "../../images/star-empty.png";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCordinates] = useState(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState(null);
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Stockholm",
      temperature: 20,
      description: "Kallt",
      isFavorited: true,
    },
  ]);

  let starIcon = favorites.isFavorited ? starFilled : starEmpty;

  function toggleFavorite() {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      isFavorited: !prevFavorites.isFavorited,
    }));
  }

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

  useEffect(() => {
    if (!coords) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=ffd76b07ad6c23883f4dd787b3c0d8f5&units=metric&lang=sv`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    console.log(coords);
  }, [coords]);

  useEffect(() => {
    if (!searchCity) return;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=ffd76b07ad6c23883f4dd787b3c0d8f5&units=metric&lang=sv`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [searchCity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      setSearchCity(city.trim());
      setCity("");
    }
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Sök Ort, Stad, land.."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Sök</button>
        </form>
      </header>
      <main>
        <article className="card">
          <button onClick={toggleFavorite} className="favorite-button">
            <img src={starIcon} alt="favorit" />
          </button>
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
              <button>Mer info</button>
            </>
          )}
        </article>
      </main>
    </>
  );
};

export default Weather;

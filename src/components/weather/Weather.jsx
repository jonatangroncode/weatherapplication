import "./Weather.css";
import { useEffect, useState } from "react";
import starFilled from "../../images/star-filled.png";
import starEmpty from "../../images/star-empty.png";
import WeatherCard from "../weathercard/WeatherCard";
import FavoriteList from "../favoritelist/FavoriteList";
import {
  fetchWeaterByCoord,
  fetchWeatherByCity,
} from "../../services/Services";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCordinates] = useState(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  console.log(favorites);
  const isFavorited = favorites.some((fav) => fav.name === weather?.name);

  const starIcon = isFavorited ? starFilled : starEmpty;

  function toggleFavorite() {
    if (!weather) return;
    setFavorites((prevFavorites) => {
      const alreadyFavorited = prevFavorites.some(
        (fav) => fav.name === weather.name
      );
      if (alreadyFavorited) {
        return prevFavorites.filter((fav) => fav.name !== weather.name);
      } else {
        const newFavorite = {
          id: Date.now(),
          name: weather.name,
          temperature: weather.main.temp,
          description: weather.weather[0].description,
        };
        return [...prevFavorites, newFavorite];
      }
    });
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

    fetchWeaterByCoord(coords.lat, coords.lon)
      .then(setWeather)
      .catch((error) => console.error("Error:", error));
    console.log(coords);
  }, [coords]);

  useEffect(() => {
    if (!searchCity) return;

    fetchWeatherByCity(searchCity)
      .then(setWeather)
      .catch((error) => console.error("Error:", error));
  }, [searchCity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      setSearchCity(city.trim());
      setCity("");
    }
  };

  const handleFavoriteSeach = (favName) => {
    setSearchCity(favName);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <header>
        <a href="/">
          {" "}
          <img
            className="logo"
            src="../src/images/logoweather.png"
            alt="cloud and sun"
          />
        </a>

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
        <WeatherCard
          weather={weather}
          onToggleFavorite={toggleFavorite}
          starIcon={starIcon}
        />

        <FavoriteList
          favorites={favorites}
          handleFavoriteSeach={handleFavoriteSeach}
        />
      </main>
    </>
  );
};

export default Weather;

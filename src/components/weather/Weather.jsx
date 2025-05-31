import "./Weather.css";
import { useEffect, useState } from "react";
import starFilled from "../../images/star-filled.png";
import starEmpty from "../../images/star-empty.png";
import WeatherCard from "../weathercard/WeatherCard";
import FavoriteList from "../favoritelist/FavoriteList";
import ForecastList from "../forecastlist/ForecastList";
import Header from "../header/Header";

import {
  fetchWeatherByCoord,
  fetchWeatherByCity,
  fetchWeaterForecastByCity,
  fetchWeaterForecastByCoord,
} from "../../services/Services";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCordinates] = useState(null);
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState(null);
  const [weatherForecastReport, setWeatherForecastReport] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00:00");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const isFavorited = favorites.some((fav) => fav.name === weather?.name);

  const starIcon = isFavorited ? starFilled : starEmpty;

  const filterdForecast =
    weatherForecastReport?.list?.filter((item) =>
      selectedTime ? item.dt_txt.includes(selectedTime) : true
    ) || [];

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

  const getMyLocation = () => {
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
  };

  useEffect(() => {
    getMyLocation();
  }, []);

  useEffect(() => {
    if (!coords) return;

    fetchWeatherByCoord(coords.lat, coords.lon)
      .then(setWeather)
      .catch((error) => console.error("Error:", error));

    fetchWeaterForecastByCoord(coords.lat, coords.lon)
      .then(setWeatherForecastReport)
      .catch((error) => console.error("Error:", error));
    console.log(coords);
  }, [coords]);

  useEffect(() => {
    if (!searchCity) return;

    fetchWeatherByCity(searchCity)
      .then(setWeather)
      .catch((error) => console.error("Error:", error));

    fetchWeaterForecastByCity(searchCity)
      .then(setWeatherForecastReport)
      .catch((error) => console.error("Error:", error));
  }, [searchCity]);

  console.log(weatherForecastReport);

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
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Header
        handleSubmit={handleSubmit}
        city={city}
        setCity={setCity}
        getMyLocation={getMyLocation}
      />
      <main className="main-grid">
        <section className="startsection">
          <WeatherCard
            weather={weather}
            onToggleFavorite={toggleFavorite}
            starIcon={starIcon}
          />

          <FavoriteList
            favorites={favorites}
            handleFavoriteSeach={handleFavoriteSeach}
          />
        </section>
        <ForecastList
          selectedTime={selectedTime}
          filterdForecast={filterdForecast}
          setSelectedTime={setSelectedTime}
        />
      </main>
    </>
  );
};

export default Weather;

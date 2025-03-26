import "./Weather.css";
import { useEffect, useState } from "react";
import starFilled from "../../images/star-filled.png";
import starEmpty from "../../images/star-empty.png";
import WeatherCard from "../weathercard/WeatherCard";
import FavoriteList from "../favoritelist/FavoriteList";
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

      <h2>Väder prognos 5 dagar fram: </h2>
      <h3>Välj tidpunkt:</h3>
      <select
        name=""
        id=""
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="00:00:00">00:00</option>
        <option value="03:00:00">03:00</option>
        <option value="06:00:00">06:00</option>
        <option value="09:00:00">09:00</option>
        <option value="12:00:00">12:00</option>
        <option value="15:00:00">15:00</option>
        <option value="18:00:00">18:00</option>
        <option value="21:00:00">21:00</option>
      </select>
      <article>
        {" "}
        <div className="accordion">
          {filterdForecast.map((day) => (
            <div key={day.dt} className="accordion-item">
              <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
              <img
                className="report-icon"
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p>
                Temperatur: {day.main.temp}°C <br />
                Väder: {day.weather[0].description}
              </p>

              <p>
                {" "}
                Temp Min/Max: {day.main.temp_min} / {day.main.temp_max}°C <br />
              </p>
              <div>+</div>
            </div>
          ))}
        </div>
      </article>
    </>
  );
};

export default Weather;

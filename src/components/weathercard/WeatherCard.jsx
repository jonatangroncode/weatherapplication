import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ weather, onToggleFavorite, starIcon }) => {
  if (!weather?.weather?.[0]) return null;
  return (
    <article className="card" id="location">
      {weather?.weather?.[0] && (
        <>
          <div className="cardheader">
            <h2>Väder i {weather.name}</h2>{" "}
            <button onClick={onToggleFavorite} className="favorite-button">
              <img src={starIcon} alt="favorit" className="favorite" />
            </button>
          </div>
          <p>
            Senaste prognos: <br />
            <span>{new Date(weather.dt * 1000).toLocaleString()}</span>
          </p>

          <p>
            Väder beskrivning: <br />
            <span>{weather.weather[0].description}</span>
          </p>
          <p>
            Temperatur: <span>{weather.main?.temp ?? "Okänd"}°C</span>
          </p>
          <p>
            Wind:
            <span> {weather.wind?.speed ?? "Okänd"}</span>
          </p>

          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </>
      )}
    </article>
  );
};

export default WeatherCard;

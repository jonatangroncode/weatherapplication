import React from "react";

const WeatherCard = ({ weather, onToggleFavorite, starIcon }) => {
  if (!weather?.weather?.[0]) return null;
  return (
    <article className="card">
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
            {new Date(weather.dt * 1000).toLocaleString()}
          </p>

          <p>Väder beskrivning: {weather.weather[0].description}</p>
          <p>Temperatur: {weather.main?.temp ?? "Okänd"}°C</p>
          <p>Wind: {weather.wind?.speed ?? "Okänd"}</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <button>
            Mer info <hr />
          </button>
        </>
      )}
    </article>
  );
};

export default WeatherCard;

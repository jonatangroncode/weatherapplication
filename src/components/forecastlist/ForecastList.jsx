import React from "react";
import "./ForecastList.css";

const ForecastList = ({ selectedTime, filterdForecast, setSelectedTime }) => {
  return (
    <article className="forecastcard">
      <h2>Väder prognos 5 dagar fram: </h2>
      <h3>Välj tidpunkt:</h3>
      <select
        className="time-select"
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
      </select>{" "}
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
          </div>
        ))}{" "}
      </div>
    </article>
  );
};

export default ForecastList;

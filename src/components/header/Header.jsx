import React from "react";
import "./Header.css";

const Header = ({ handleSubmit, city, setCity }) => {
  return (
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
      <div className="bookmark-btn">
        <button
          className="fav-btn"
          onClick={() => (window.location.hash = "#location")}
        >
          Min plats 📍
        </button>
        <button
          className="fav-btn"
          onClick={() => (window.location.hash = "#favorites")}
        >
          {" "}
          Gå till favoriter ⭐️
        </button>
        <button
          className="fav-btn"
          onClick={() => (window.location.hash = "#forecast")}
        >
          Gå till prognos 🗓️
        </button>
      </div>
    </header>
  );
};

export default Header;

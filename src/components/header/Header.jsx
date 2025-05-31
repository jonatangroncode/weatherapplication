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
        <button className="fav-btn">Min plats 📍</button>
        <button className="fav-btn">Favoriter ⭐️</button>
        <button className="fav-btn">5 dagars prognos 🗓️</button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import "./Header.css";
import logo from "../../images/logoweather.png";

const Header = ({ handleSubmit, city, setCity, getMyLocation }) => {
  return (
    <header>
      <a href="/">
        {" "}
        <img className="logo" src={logo} alt="cloud and sun" />
      </a>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sök Ort, Stad, land.."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="searchbtn" type="submit">
          Sök
        </button>
      </form>
      <div className="bookmark-btn">
        <button
          className="fav-btn"
          onClick={() => {
            window.history.replaceState(null, null, " ");
            getMyLocation();
          }}
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

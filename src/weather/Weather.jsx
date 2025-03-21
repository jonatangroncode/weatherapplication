import React from "react";
import "./Weather.css";
import { useEffect } from "react";

const Weather = () => {
  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=ffd76b07ad6c23883f4dd787b3c0d8f5&units=metric&lang=sv"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return <div></div>;
};

export default Weather;

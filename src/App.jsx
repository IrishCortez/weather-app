import { useEffect, useState } from "react";
import React from "react";
import "./App.css";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import {
  FaSun,
  FaCloud,
  FaCloudSun,
  FaCloudMoon,
  FaMoon,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

const api = {
  key: "YOUR_API_KEY",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [selected, setSelected] = React.useState(false);
  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    setTemp();
  }, [selected, weather]);

  function WeatherComponent({ weatherCode }) {
    return (
      <div>
        <WeatherIcon weatherCode={weatherCode} />
      </div>
    );
  }
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setTemp();
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  function setTemp() {
    if (weather && weather.main && weather.main.temp) {
      if (selected) {
        const fahrenheitValue = (weather.main.temp * 9) / 5 + 32;
        setTemperature(fahrenheitValue.toFixed(2));
      } else if (!selected) {
        setTemperature(weather.main.temp);
      }
    }
  }

  function getTemp() {
    if (!selected) {
      return `${weather.main.temp}`;
    } else if (selected) {
      return `${temperature}`;
    }
    return "";
  }

  function WeatherIcon({ weatherCode }) {
    switch (weatherCode) {
      case "01d":
        return <FaSun />;
      case "02d":
        return <FaCloudSun />;
      case "03d":
        return <FaCloud />;
      case "04d":
        return <FaCloud />;
      case "09d":
        return <FaCloudRain />;
      case "10d":
        return <FaCloudShowersHeavy />;
      case "11d":
        return <FaBolt />;
      case "13d":
        return <FaSnowflake />;
      case "50d":
        return <FaMoon />;
      case "01n":
        return <FaMoon />;
      case "02n":
        return <FaCloudMoon />;
      case "03n":
        return <FaCloud />;
      case "04n":
        return <FaCloud />;
      case "09n":
        return <FaCloudRain />;
      case "10n":
        return <FaCloudShowersHeavy />;
      case "11n":
        return <FaBolt />;
      case "13n":
        return <FaSnowflake />;
      case "50n":
        return <FaMoon />;
      default:
        return null;
    }
  }

  return (
    <div className="App">
      <h1>Weather</h1>

      <TextField
        id="search-field"
        label="Search here"
        variant="outlined"
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{
          endAdornment: (
            <Button onClick={searchPressed} variant="contained" color="primary">
              Search
            </Button>
          ),
        }}
      />

      {typeof weather.main !== "undefined" ? (
        <div>
          <div>
            <h1> {getTemp()}&deg;</h1>
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                setSelected(!selected);
                console.log(selected);
                setTemp();
              }}
            >
              {selected ? "Fahrenheit" : "Celcius"}
            </ToggleButton>
          </div>
          <h2> {weather.name}</h2>
          <p> {weather.main.humidity}</p>
          <p> {weather.wind.speed} mph</p>

          <p>
            {weather.weather[0].main}({weather.weather[0].description})
          </p>
          <h1>
            <WeatherComponent weatherCode={weather.weather[0].icon} />
          </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;

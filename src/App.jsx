import { useEffect } from "react";
import "./App.css";
import {
  CurrentWeatherByGeo,
  CurrentWeatherByIP,
  GetLocByIp,
} from "./components/WeatherApi";
import { useState } from "react";
import UnixTimestampToHumanReadable from "./components/time";

function App() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [iconCode, setIconCode] = useState();
  const [weatherDesc, setWeaterDesc] = useState();
  const [city, setCity] = useState();
  const [temp, setTemp] = useState();
  const [date, setDate] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const crd = pos.coords;
        setLat(crd.latitude);
        setLon(crd.longitude);
        CurrentWeatherByGeo(lat, lon)
          .then((results) => {
            setIconCode(results.data.weather[0].icon);
            setWeaterDesc(results.data.weather[0].description);
            setCity(results.data.name);
            setTemp(results.data.main.temp);
            setDate(results.data.dt);
            setFeelsLike(results.data.main.feels_like);
            setMaxTemp(results.data.main.temp_max);
            setMinTemp(results.data.main.temp_min);
            setHumidity(results.data.main.humidity);
            setWindSpeed(results.data.wind.speed);
            setWindDirection(results.data.wind.deg);
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (err) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        GetLocByIp().then((results) => {
          CurrentWeatherByIP(results)
            .then((results) => {
              setIconCode(results.data.weather[0].icon);
              setWeaterDesc(results.data.weather[0].description);
              setCity(results.data.name);
              setTemp(results.data.main.temp);
              setDate(results.data.dt);
              setFeelsLike(results.data.main.feels_like);
              setMaxTemp(results.data.main.temp_max);
              setMinTemp(results.data.main.temp_min);
              setHumidity(results.data.main.humidity);
              setWindSpeed(results.data.wind.speed);
              setWindDirection(results.data.wind.deg);
            })
            .catch((error) => {
              console.error(error);
            });
        });
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, [lat, lon]);

  return (
    <div className="app">
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt="Main Weather"
      />
      <div className="weather-head-wrapper">
        <div className="city-name">{lat ? 'Geo Loc' : 'IP Loc'} {city}</div>
        <div className="weather-desc">{weatherDesc}</div>
        <div className="weather-degree">{temp}&deg;C</div>
      </div>
      <div className="weather-today-wrapper">
        <div className="today-bg">
          <div className="today-date">
            <div>Today</div>
            <div className="date">{UnixTimestampToHumanReadable(date)}</div>
          </div>
          <div className="today-info">
            <div className="today-temp">
              <p>Feels Like: {feelsLike}&deg;C</p>
              <p>Max: {maxTemp}&deg;C</p>
              <p>Min: {minTemp}&deg;C</p>
            </div>
            <div className="today-wind">
              <p>Kelembapan: {humidity}% </p>
              <p>Wind Speed: {windSpeed} m/s</p>
              <p>Wind Direction: {windDirection}&deg;</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        Create by Alvindo Tri Jatmiko using Openweather and IPinfo API
        &copy;2023
      </div>
    </div>
  );
}

export default App;

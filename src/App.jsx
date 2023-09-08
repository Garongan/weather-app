import { useEffect } from "react";
import "./App.css";
import { CurrentWeatherByGeo, GetLocByIp } from "./components/WeatherApi";
import { useState } from "react";
import UnixTimestampToHumanReadable from "./components/UnixTimestampToHumanReadable";

function App() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [iconCode, setIconCode] = useState();
  const [weatherDesc, setWeaterDesc] = useState();
  const [city, setCity] = useState();
  const [ipLoc, setIpLoc] = useState();
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
      },
      { enableHighAccuracy: true, maximumAge: 0 }
    );
    GetLocByIp().then((results) => {
      setIpLoc(results);
    });
  }, [lat, lon]);

  return (
    <div className="app">
      <div className="icon-wrapper">
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
          alt=""
        />
        <div className={`${iconCode ? iconCode : "spinner"}`}></div>
      </div>

      <div className="weather-head-wrapper">
        <div className="city-name">{city ? city : "Invalid"}</div>
        <div className={`${city ? "valid-desc" : "invalid-desc"}`}>Please enable the GPS access to this website!</div>
        <div className="ip-city">IP Location: City Of {ipLoc}</div>
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
              <p>Terasa Seperti: {feelsLike}&deg;C</p>
              <p>Maks: {maxTemp}&deg;C</p>
              <p>Min: {minTemp}&deg;C</p>
            </div>
            <div className="today-wind">
              <p>Kelembapan: {humidity}% </p>
              <p>Kecepatan Angin: {windSpeed} m/s</p>
              <p>Arah Angin: {windDirection}&deg;</p>
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

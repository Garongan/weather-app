import axios from "axios";
const baseUrlFromOpenWeather = import.meta.env.VITE_OPENWEATHER_BASE_URL;
const apiKeyFromOpenWeather = import.meta.env.VITE_OPENWEATHER_API_KEY;
const baseUrlFromIpInfo = import.meta.env.VITE_IPINFO_BASE_URL;
const apiTokenFromIpInfo = import.meta.env.VITE_IPINFO_TOKEN;

export const GetLocByIp = async () => {
  const request = await fetch(
    `${baseUrlFromIpInfo}/json?token=${apiTokenFromIpInfo}`
  );
  const jsonResponse = await request.json();
  const city_name = await axios.get(
    `${baseUrlFromIpInfo}/${jsonResponse.ip}?token=${apiTokenFromIpInfo}`
  );
  return city_name.data.city;
};

export const CurrentWeatherByGeo = async (lat, lon) => {
    const CurrentWeather = await axios.get(
      `${baseUrlFromOpenWeather}?lat=${lat}&lon=${lon}&lang=id&appid=${apiKeyFromOpenWeather}&units=metric`
    );
    return CurrentWeather;
};

export const CurrentWeatherByIP = async (city_name) => {
  const CurrentWeather = await axios.get(
    `${baseUrlFromOpenWeather}?q=${city_name}&lang=id&appid=${apiKeyFromOpenWeather}&units=metric`
  );
  return CurrentWeather;
};

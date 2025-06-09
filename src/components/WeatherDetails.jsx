// import { useEffect, useState } from "react";
// import { searchWeather } from "../services/apiConnector";
// import { FaTemperatureHigh, FaTint, FaWind, FaCloudRain } from "react-icons/fa";

// const WeatherDetails = ({ city, country }) => {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!city || !country) return;
//     setLoading(true);
//     searchWeather(city, country, token)
//       .then(res => setWeather(res.data))
//       .finally(() => setLoading(false));
//   }, [city, country, token]);

//   if (loading) return <div className="text-white">Loading...</div>;
//   if (!weather) return <div className="text-gray-400">No weather data.</div>;

//   return (
//     <div className="bg-gray-800 rounded-lg p-4 text-white shadow w-full max-w-xs mx-auto">
//       <h3 className="text-lg font-bold mb-2">{weather.name}</h3>
//       <div className="text-sm space-y-2">
//         <div className="flex justify-between items-center">
//           <span>Temperature: {weather.main?.temp}K</span>
//           <FaTemperatureHigh />
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Humidity: {weather.main?.humidity}%</span>
//           <FaTint />
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Wind Speed: {weather.wind?.speed} m/s</span>
//           <FaWind />
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Condition: {weather.weather?.[0]?.main}</span>
//           <FaCloudRain />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherDetails;

import { useEffect, useState } from "react";
import { searchWeather } from "../services/apiConnector";
import { FaTemperatureHigh, FaTint, FaWind, FaCloudRain } from "react-icons/fa";

const toCelsius = (k) => (k ? (k - 273.15).toFixed(1) : "--");

const WeatherDetails = ({ city, country }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!city || !country) return;
    setLoading(true);
    searchWeather(city, country, token)
      .then((res) => setWeather(res.data))
      .finally(() => setLoading(false));
  }, [city, country, token]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (!weather) return <div className="text-gray-400">No weather data.</div>;

  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white shadow w-full max-w-xs mx-auto">
      <h3 className="text-lg font-bold mb-2">{weather.name}</h3>
      <div className="text-sm space-y-2">
        <div className="flex justify-between items-center">
          <span>Temperature: {toCelsius(weather.main?.temp)}°C</span>
          <FaTemperatureHigh />
        </div>
        <div className="flex justify-between items-center">
          <span>Humidity: {weather.main?.humidity}%</span>
          <FaTint />
        </div>
        <div className="flex justify-between items-center">
          <span>Wind Speed: {weather.wind?.speed} m/s</span>
          <FaWind />
        </div>
        <div className="flex justify-between items-center">
          <span>Condition: {weather.weather?.[0]?.main}</span>
          <FaCloudRain />
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
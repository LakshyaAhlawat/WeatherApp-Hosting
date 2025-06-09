import { useState } from "react";
import WeatherDetails from "../components/WeatherDetails";

const CityMapPage = () => {
  const [selectedCity, setSelectedCity] = useState("New York");
  const [selectedCountry, setSelectedCountry] = useState("US");

  // You can replace this with your map and pin logic
  return (
    <div className="min-h-[80vh] bg-gray-950 text-white flex flex-col items-center py-8 px-2">
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
        >
          <option>New York</option>
          <option>London</option>
          <option>Tokyo</option>
        </select>
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded"
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        >
          <option value="US">US</option>
          <option value="GB">GB</option>
          <option value="JP">JP</option>
        </select>
      </div>
      <WeatherDetails city={selectedCity} country={selectedCountry} />
    </div>
  );
};

export default CityMapPage;



import { useSelector } from "react-redux";
import WeatherCard from "../components/WeatherCard";

const toCelsius = (k) => (k ? (k - 273.15).toFixed(1) : "--");

const Dashboard = () => {
  const userCards = useSelector((state) => state.weather.cards || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white">

      <h2 className="text-3xl font-bold text-purple-300 mb-8 text-center drop-shadow-md">
        Your Weather Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {userCards.length > 0 ? (
          userCards.map((card, idx) => (
            <WeatherCard
              key={`${card.city}-${idx}`}
              city={card.city}
              temp={toCelsius(card.temp) + "°C"}
              humidity={card.humidity ? card.humidity + "%" : "--"}
              wind={card.wind ? card.wind + " m/s" : "--"}
              precipitation={card.condition || "--"}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-400 text-lg italic">
            No cities added yet. Search for cities on the Home page 🌍
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;



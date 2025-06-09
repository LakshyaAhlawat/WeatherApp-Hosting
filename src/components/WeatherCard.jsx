import { FaTemperatureHigh, FaTint, FaWind, FaCloudRain } from "react-icons/fa";

const WeatherCard = ({ city, temp, humidity, wind, precipitation }) => (
  <div
    className="
      bg-gradient-to-br from-gray-900/60 to-gray-800/40
      backdrop-blur-lg
      rounded-2xl
      p-8
      text-white
      shadow-[0_4px_30px_rgba(0,0,0,0.7), 0_0_0_1px_rgba(255,255,255,0.05)]
      max-w-md
      mx-auto
      hover:scale-[1.05]
      transition-transform
      duration-300
      cursor-default
    "
  >
    <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-3">{city}</h3>
    <div className="space-y-6 text-lg">
      {[
        { label: "Temperature", value: temp, icon: FaTemperatureHigh, iconColor: "text-yellow-400" },
        { label: "Humidity", value: humidity, icon: FaTint, iconColor: "text-blue-400" },
        { label: "Wind Speed", value: wind, icon: FaWind, iconColor: "text-gray-300" },
        { label: "Precipitation", value: precipitation, icon: FaCloudRain, iconColor: "text-cyan-400" },
      ].map(({ label, value, icon: Icon, iconColor }) => (
        <div key={label} className="flex items-center justify-between">
          <span>{label}: {value}</span>
          <Icon className={`${iconColor} w-7 h-7 ml-4 flex-shrink-0`} />
        </div>
      ))}
    </div>
  </div>
);

export default WeatherCard;

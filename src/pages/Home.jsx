import { useState, useEffect } from "react";
import { FaSearch, FaSun, FaCloudRain } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { searchWeather, fetchUserSearches } from "../services/apiConnector";
import useLoadGoogleMaps from "../hooks/useLoadGoogleMaps";
import { addWeatherCard } from "../redux/slices/weatherSlice";
import GooglePlacesAutocompleteInput from "../components/GooglePlacesAutocompleteInput";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const FALLBACK_IMAGE = "https://images.pexels.com/photos/15286/pexels-photo.jpg";

const toCelsius = (k) => (k ? (k - 273.15).toFixed(1) : "--");
const formatUnixTime = (unix, tz) =>
  new Date((unix + tz) * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const getLocalTime = (tz) =>
  new Date(Date.now() + tz * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function Home() {
  useLoadGoogleMaps(process.env.REACT_APP_GOOGLE_PLACES_API_KEY);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((s) => s.auth);
  const weatherCards = useSelector((s) => s.weather.cards);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [cityImage, setCityImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usedOnce, setUsedOnce] = useState(localStorage.getItem("usedOnce") === "true");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const check = () =>
      window.google?.maps?.places ? setMapsLoaded(true) : setTimeout(check, 100);
    check();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserSearches(token).then((result) => {
        if (!result.success) throw new Error(result.message);
        result.data.map((s) => ({
          city: s.city,
          country: s.country ?? "Unknown",
          temp: s.response.main.temp,
          feels_like: s.response.main.feels_like,
          humidity: s.response.main.humidity,
          wind: s.response.wind.speed,
          condition: s.response.weather[0].main,
          description: s.response.weather[0].description,
          pressure: s.response.main.pressure,
          visibility: s.response.visibility,
          sunrise: s.response.sys.sunrise,
          sunset: s.response.sys.sunset,
          timezone: s.response.timezone,
          lat: s.response.coord.lat,
          lng: s.response.coord.lon,
        })).forEach((c) => {
          if (!weatherCards.find((w) => w.city.toLowerCase() === c.city.toLowerCase())) {
            dispatch(addWeatherCard(c));
          }
        });
      }).catch(console.error);
    }
  }, [token, dispatch, weatherCards]);

  const fetchCityImage = async (city) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/pexels/image?city=${encodeURIComponent(city)}`);
      const json = await res.json();
      return json.imageUrl || FALLBACK_IMAGE;
    } catch {
      return FALLBACK_IMAGE;
    }
  };

  const handleSelect = async (address) => {
    setSearch(address);
    setLoading(true);
    setCityImage(null);
    setSelectedPlace(null);

    let city = address.split(",")[0].trim();
    const country = address.split(",").at(-1)?.trim();

    if (weatherCards.find((w) => w.city.toLowerCase() === city.toLowerCase())) {
      setLoading(false);
      return;
    }

    try {
      const weatherRes = await searchWeather(city, country, token);
      if (!weatherRes.success) throw new Error(weatherRes.message);
      const w = weatherRes.data;
      setSelectedPlace(w);

      const imgUrl = await fetchCityImage(city);
      setCityImage(imgUrl);

      dispatch(
        addWeatherCard({
          city,
          country,
          temp: w.main.temp,
          feels_like: w.main.feels_like,
          humidity: w.main.humidity,
          wind: w.wind.speed,
          condition: w.weather[0].main,
          description: w.weather[0].description,
          pressure: w.main.pressure,
          visibility: w.visibility,
          sunrise: w.sys.sunrise,
          sunset: w.sys.sunset,
          timezone: w.timezone,
          lat: w.coord.lat,
          lng: w.coord.lon,
        })
      );

      if (!isAuthenticated && !usedOnce) {
        localStorage.setItem("usedOnce", "true");
        setUsedOnce(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const chartData = selectedPlace
    ? {
        labels: [
          "Temp (°C)",
          "Feels Like (°C)",
          "Humidity (%)",
          "Wind Speed (km/h)",
          "Pressure (hPa)",
          "Visibility (%)",
        ],
        datasets: [
          {
            label: `Metrics: ${search}`,
            data: [
              +toCelsius(selectedPlace.main.temp),
              +toCelsius(selectedPlace.main.feels_like),
              selectedPlace.main.humidity,
              +(selectedPlace.wind.speed * 3.6).toFixed(1),
              selectedPlace.main.pressure / 10,
              (selectedPlace.visibility / 10000) * 100,
            ],
            backgroundColor: "rgba(220,145,255,0.2)",
            borderColor: "rgb(220,145,255)",
            pointBackgroundColor: "rgb(220,145,255)",
          },
        ],
      }
    : {};

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "cyan" } },
      title: { display: true, text: `Weather Metrics for ${search}`, color: "cyan" },
      tooltip: {
        callbacks: {
          label: ({ label, parsed }) => {
            let unit = "";
            if (label.includes("Temp")) unit = "°C";
            else if (label.includes("Humidity")) unit = "%";
            else if (label.includes("Wind")) unit = " km/h";
            else if (label.includes("Pressure")) unit = " hPa";
            else if (label.includes("Visibility")) unit = " km";
            return `${label}: ${parsed.r.toFixed(1)}${unit}`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: "rgba(255,255,255,0.3)" },
        grid: { color: "rgba(255,255,255,0.3)" },
        pointLabels: { color: "cyan" },
        ticks: { color: "cyan" },
      },
    },
  };

  const canUseFeature = isAuthenticated || !usedOnce;

  if (!mapsLoaded) {
    return <div className="text-white text-center mt-20">Loading map services...</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white flex flex-col items-center py-10 px-4">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mb-6">
        <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
        <GooglePlacesAutocompleteInput
          onPlaceSelected={canUseFeature ? handleSelect : () => {}}
          disabled={!canUseFeature}
          className="w-full pl-12 pr-4 py-4 text-lg rounded-full bg-gray-900/60 placeholder-gray-400 text-white focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all duration-300 shadow-xl backdrop-blur-lg"
          placeholder="Search for a city, e.g. Paris"
        />
      </div>

      {/* Weather Card */}
      {selectedPlace && (
        <div className="group w-full max-w-4xl bg-gray-900/70 backdrop-blur-md border border-purple-800/40 rounded-2xl overflow-hidden shadow-2xl transition-transform transform hover:scale-[1.01] duration-300">
          <div
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${cityImage || FALLBACK_IMAGE})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold text-purple-300 tracking-tight drop-shadow-md">{search}</h3>
                <p className="text-lg">Temperature: {toCelsius(selectedPlace.main.temp)}°C</p>
                <p className="text-lg">Feels Like: {toCelsius(selectedPlace.main.feels_like)}°C</p>
                <p className="text-lg">Humidity: {selectedPlace.main.humidity}%</p>
                <p className="text-lg">Wind: {(selectedPlace.wind.speed * 3.6).toFixed(1)} km/h</p>
                <p className="text-lg">Pressure: {selectedPlace.main.pressure} hPa</p>
                <p className="text-lg">Visibility: {(selectedPlace.visibility / 1000).toFixed(1)} km</p>
                <p className="text-lg">Sunrise: {formatUnixTime(selectedPlace.sys.sunrise, selectedPlace.timezone)}</p>
                <p className="text-lg">Sunset: {formatUnixTime(selectedPlace.sys.sunset, selectedPlace.timezone)}</p>
                <p className="text-lg">Local Time: {getLocalTime(selectedPlace.timezone)}</p>
              </div>
              <div className="mt-4">
                {selectedPlace.weather[0].main.toLowerCase().includes("rain") ? (
                  <FaCloudRain size={64} className="text-blue-400 animate-pulse" />
                ) : (
                  <FaSun size={64} className="text-yellow-400 animate-spin-slow" />
                )}
              </div>
            </div>
            {cityImage !== FALLBACK_IMAGE && (
              <p className="text-xs text-gray-400">
                Photo via <a href="https://www.pexels.com" className="underline">Pexels</a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Radar Chart */}
      {selectedPlace && (
        <div className="w-full max-w-4xl bg-gray-900/70 backdrop-blur-md border border-purple-800/40 rounded-2xl p-6 shadow-2xl mt-8">
          <Radar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}



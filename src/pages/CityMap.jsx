// import { useState, useRef } from "react";
// import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
// import { useSelector } from "react-redux";
// import { FaCloudRain, FaSun, FaCloud } from "react-icons/fa";

// const containerStyle = {
//   width: "100vw",
//   height: "90vh"
// };

// const defaultCenter = {
//   lat: 20.5937,
//   lng: 78.9629
// };

// const toCelsius = (k) => k ? (k - 273.15).toFixed(1) : "--";

// export default function CityMap() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
//     libraries: ["places"]
//   });

//   const searchedCities = useSelector(state => state.weather.cards || []);
//   const [selected, setSelected] = useState(null);
//   const mapRef = useRef();

//   const onLoad = map => {
//     mapRef.current = map;
//   };

//   // Center map on selected marker
//   if (selected && mapRef.current) {
//     mapRef.current.panTo({ lat: selected.lat, lng: selected.lng });
//     mapRef.current.setZoom(8);
//   }

//   const getWeatherIcon = (condition) => {
//     if (!condition) return <FaCloud size={32} />;
//     if (condition.toLowerCase().includes("rain")) return <FaCloudRain size={32} />;
//     if (condition.toLowerCase().includes("sun")) return <FaSun size={32} />;
//     return <FaCloud size={32} />;
//   };

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={selected ? { lat: selected.lat, lng: selected.lng } : defaultCenter}
//       zoom={selected ? 8 : 3}
//       onLoad={onLoad}
//     >
//       {searchedCities.map((city, idx) => (
//         <Marker
//           key={city.city + idx}
//           position={{ lat: city.lat, lng: city.lng }}
//           onClick={() => setSelected(city)}
//         />
//       ))}
//       {selected && (
//         <InfoWindow
//           position={{ lat: selected.lat, lng: selected.lng }}
//           onCloseClick={() => setSelected(null)}
//         >
//           <div className="bg-gray-800 text-white p-4 rounded-lg min-w-[200px] flex flex-col items-start">
//             <div className="font-bold mb-2 text-lg">{selected.city}, {selected.country}</div>
//             <div className="flex items-center mb-2">
//               {getWeatherIcon(selected.condition)}
//               <span className="ml-2">Temperature: {toCelsius(selected.temp)}°C</span>
//             </div>
//             <div>Condition: {selected.condition || "--"}</div>
//             <div>Humidity: {selected.humidity ? selected.humidity + "%" : "--"}</div>
//             <div>Wind: {selected.wind ? selected.wind + " m/s" : "--"}</div>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   ) : (
//     <div className="text-white text-center mt-10">Loading Map...</div>
//   );
// }

// import { useState, useRef } from "react";
// import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from "@react-google-maps/api";
// import { useSelector } from "react-redux";
// import { FaCloudRain, FaSun, FaCloud } from "react-icons/fa";

// const containerStyle = {
//   width: "100vw",
//   height: "90vh",
// };

// const defaultCenter = {
//   lat: 20.5937,
//   lng: 78.9629,
// };

// const toCelsius = (k) => (k ? (k - 273.15).toFixed(1) : "--");

// export default function CityMap() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
//     libraries: ["places"],
//   });

//   const searchedCities = useSelector((state) => state.weather.cards || []);
//   const [selected, setSelected] = useState(null);
//   const mapRef = useRef();

//   const onLoad = (map) => {
//     mapRef.current = map;
//   };

//   // Center map on selected marker
//   if (selected && mapRef.current) {
//     mapRef.current.panTo({ lat: selected.lat, lng: selected.lng });
//     mapRef.current.setZoom(8);
//   }

//   const getWeatherIcon = (condition) => {
//     if (!condition) return <FaCloud size={32} />;
//     const cond = condition.toLowerCase();
//     if (cond.includes("rain")) return <FaCloudRain size={32} />;
//     if (cond.includes("sun") || cond.includes("clear")) return <FaSun size={32} />;
//     return <FaCloud size={32} />;
//   };

//   // Custom weather effect (simplified as marker icon for now)
//   const getMarkerIcon = (condition) => {
//     const cond = condition?.toLowerCase();
//     if (cond?.includes("rain")) {
//       return {
//         url: "https://img.icons8.com/emoji/48/rain-emoji.png", // Rain icon
//         scaledSize: new window.google.maps.Size(40, 40),
//       };
//     } else if (cond?.includes("sun") || cond?.includes("clear")) {
//       return {
//         url: "https://img.icons8.com/emoji/48/sun-emoji.png", // Sun icon
//         scaledSize: new window.google.maps.Size(40, 40),
//       };
//     } else if (cond?.includes("cloud")) {
//       return {
//         url: "https://img.icons8.com/emoji/48/cloud-emoji.png", // Cloud icon
//         scaledSize: new window.google.maps.Size(40, 40),
//       };
//     } else if (cond?.includes("dust")) {
//       return {
//         url: "https://img.icons8.com/emoji/48/wind-emoji.png", // Dust/wind icon
//         scaledSize: new window.google.maps.Size(40, 40),
//       };
//     }
//     return null; // Default marker
//   };

//   return isLoaded ? (
//     <div className="relative">
//       {/* Dropdown for selecting a city */}
//       <div className="absolute top-4 left-4 z-10">
//         <select
//           className="bg-gray-800 text-white p-2 rounded-lg"
//           value={selected ? `${selected.city}, ${selected.country}` : ""}
//           onChange={(e) => {
//             const [city, country] = e.target.value.split(", ");
//             const cityData = searchedCities.find(
//               (c) => c.city === city && c.country === country
//             );
//             setSelected(cityData);
//           }}
//         >
//           <option value="" disabled>
//             Select a city
//           </option>
//           {searchedCities.map((city) => (
//             <option key={`${city.city}-${city.country}`} value={`${city.city}, ${city.country}`}>
//               {city.city}, {city.country}
//             </option>
//           ))}
//         </select>
//       </div>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={selected ? { lat: selected.lat, lng: selected.lng } : defaultCenter}
//         zoom={selected ? 8 : 3}
//         onLoad={onLoad}
//       >
//         {searchedCities.map((city, idx) => (
//           <Marker
//             key={city.city + idx}
//             position={{ lat: city.lat, lng: city.lng }}
//             onClick={() => setSelected(city)}
//             icon={getMarkerIcon(city.condition)}
//           />
//         ))}
//         {selected && (
//           <InfoWindow
//             position={{ lat: selected.lat, lng: selected.lng }}
//             onCloseClick={() => setSelected(null)}
//           >
//             <div className="bg-gray-800 text-white p-4 rounded-lg min-w-[200px] flex flex-col items-start">
//               <div className="font-bold mb-2 text-lg">
//                 {selected.city}, {selected.country}
//               </div>
//               <div className="flex items-center mb-2">
//                 {getWeatherIcon(selected.condition)}
//                 <span className="ml-2">Temperature: {toCelsius(selected.temp)}°C</span>
//               </div>
//               <div>Condition: {selected.condition || "--"}</div>
//               <div>Humidity: {selected.humidity ? selected.humidity + "%" : "--"}</div>
//               <div>Wind: {selected.wind ? selected.wind + " m/s" : "--"}</div>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   ) : (
//     <div className="text-white text-center mt-10">Loading Map...</div>
//   );
// }

import { useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { FaCloudRain, FaSun, FaCloud } from "react-icons/fa";

const containerStyle = {
  width: "100vw",
  height: "90vh",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const toCelsius = (k) => (k ? (k - 273.15).toFixed(1) : "--");

export default function CityMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
    libraries: ["places"],
  });

  const searchedCities = useSelector((state) => state.weather.cards || []);
  const [selected, setSelected] = useState(null);
  const mapRef = useRef();

  const onLoad = (map) => {
    mapRef.current = map;
  };

  // Center map on selected marker
  if (selected && mapRef.current) {
    mapRef.current.panTo({ lat: selected.lat, lng: selected.lng });
    mapRef.current.setZoom(8);
  }

  const getWeatherIcon = (condition) => {
    if (!condition) return <FaCloud size={32} />;
    const cond = condition.toLowerCase();
    if (cond.includes("rain")) return <FaCloudRain size={32} />;
    if (cond.includes("sun") || cond.includes("clear"))
      return <FaSun size={32} />;
    return <FaCloud size={32} />;
  };

  const getMarkerIcon = (condition) => {
    const cond = condition?.toLowerCase();
    if (cond?.includes("rain")) {
      return {
        url: "https://img.icons8.com/emoji/48/rain-emoji.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    } else if (cond?.includes("sun") || cond?.includes("clear")) {
      return {
        url: "https://img.icons8.com/emoji/48/sun-emoji.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    } else if (cond?.includes("cloud")) {
      return {
        url: "https://img.icons8.com/emoji/48/cloud-emoji.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    } else if (cond?.includes("dust")) {
      return {
        url: "https://img.icons8.com/emoji/48/wind-emoji.png",
        scaledSize: new window.google.maps.Size(40, 40),
      };
    }
    return null;
  };

  if (loadError) {
    return (
      <div className="text-red-500 text-center mt-10">
        Error loading Google Maps: {loadError.message}
      </div>
    );
  }

  return isLoaded ? (
    <div className="relative ">
      {/* Debugging: Show the number of searched cities */}

      
        <div className="absolute  mt-16 top-4 left-4 z-10 bg-gray-800 text-white p-2 rounded-lg">
          Searched Cities: {searchedCities.length}
        </div>

        {/* Dropdown for selecting a city */}
        <div className="absolute mt-32 -ml-36 top-4 left-40 z-10">
          <select
            className="bg-gray-800 text-white p-2 rounded-lg"
            value={selected ? `${selected.city}, ${selected.country}` : ""}
            onChange={(e) => {
              const [city, country] = e.target.value.split(", ");
              const cityData = searchedCities.find(
                (c) => c.city === city && c.country === country
              );
              setSelected(cityData);
            }}
          >
            <option value="" disabled>
              Select a city
            </option>
            {searchedCities.map((city) => (
              <option
                key={`${city.city}-${city.country}`}
                value={`${city.city}, ${city.country}`}
              >
                {city.city}, {city.country}
              </option>
            ))}
          </select>
        </div>
      

     

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          selected ? { lat: selected.lat, lng: selected.lng } : defaultCenter
        }
        zoom={selected ? 8 : 3}
        onLoad={onLoad}
      >
        {searchedCities.length === 0 ? (
          <div className="text-white text-center mt-10">
            No cities to display on the map.
          </div>
        ) : (
          searchedCities.map((city, idx) => (
            <Marker
              key={city.city + idx}
              position={{ lat: city.lat, lng: city.lng }}
              onClick={() => setSelected(city)}
              icon={getMarkerIcon(city.condition)}
            />
          ))
        )}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div className="bg-gray-800 text-white p-4 rounded-lg min-w-[200px] flex flex-col items-start">
              <div className="font-bold mb-2 text-lg">
                {selected.city}, {selected.country}
              </div>
              <div className="flex items-center mb-2">
                {getWeatherIcon(selected.condition)}
                <span className="ml-2">
                  Temperature: {toCelsius(selected.temp)}°C
                </span>
              </div>
              <div>Condition: {selected.condition || "--"}</div>
              <div>
                Humidity: {selected.humidity ? selected.humidity + "%" : "--"}
              </div>
              <div>Wind: {selected.wind ? selected.wind + " m/s" : "--"}</div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="text-white text-center mt-10">Loading Map...</div>
  );
}

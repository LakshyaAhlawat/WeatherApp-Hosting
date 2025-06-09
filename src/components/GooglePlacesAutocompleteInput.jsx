import { useEffect, useRef } from "react";

export default function GooglePlacesAutocompleteInput({ onPlaceSelected, disabled }) {
  const inputRef = useRef();

  useEffect(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) return;
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"]
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        onPlaceSelected(place.formatted_address);
      } else if (place && place.name) {
        onPlaceSelected(place.name);
      }
    });
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search city weather..."
      className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
      disabled={disabled}
    />
  );
}
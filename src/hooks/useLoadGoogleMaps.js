import { useEffect } from "react";

export default function useLoadGoogleMaps(apiKey) {
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) return;
    if (document.getElementById("google-maps-script")) return;

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    document.body.appendChild(script);

    // Don't remove the script on unmount, as it may break Google Maps usage elsewhere
    // return () => { document.body.removeChild(script); };
  }, [apiKey]);
}
import { useEffect, useState } from "react";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { MapApiLoad } from "../store/atoms/MapDirectionState";

export const useGeocodeLatLng = (
  location: string,
  mapLoadState: MapApiLoad
) => {
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (!mapLoadState.isLoaded || mapLoadState.loadError || !location) return;
    getGeocode({ address: location })
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error: ", error));
  }, [location, mapLoadState]);

  return latLng;
};

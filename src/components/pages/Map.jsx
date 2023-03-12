import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export const Map = () => {
  const mapStyle = {
    width: "800px",
    height: "800px",
  };
  const defaultCenter = {
    lat: 35.69575,
    lng: 139.77521,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={13}
        center={defaultCenter}
      ></GoogleMap>
    </LoadScript>
  );
};

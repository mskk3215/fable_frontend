import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapDrawer } from "../organisms/MapDrawer";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import styled from "styled-components";

export const Map = () => {
  const { searchResults } = useContext(SearchParkContext);
  const [mapStyle, setMapStyle] = useState({});
  const defaultCenter = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const locations = searchResults.map((result) => {
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    console.log(result);
    return { title, latLng };
  });

  const mapOptions = {
    mapTypeControl: false,
  };

  //mapのサイズを動的に合わせる
  useEffect(() => {
    const handleResize = () => {
      setMapStyle({
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <MapDrawer />

      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={13}
        center={defaultCenter}
        options={mapOptions}
      >
        {locations?.map((item) => {
          return (
            <Marker
              key={item.title}
              position={item.latLng}
              options={{
                icon: {
                  url: process.env.PUBLIC_URL + "/images/park_icon.png",
                },
                scaledSize: new window.google.maps.Size(1, 1),
              }}
            />
          );
        })}
      </GoogleMap>
    </>
  );
};

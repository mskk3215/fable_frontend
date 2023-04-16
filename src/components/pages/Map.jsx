import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapDrawer } from "../organisms/MapDrawer";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import styled from "styled-components";

export const Map = () => {
  const { searchResults } = useContext(SearchParkContext);
  const [mapStyle, setMapStyle] = useState({});
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({
    lat: 35.69575,
    lng: 139.77521,
  });

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

  const icon = {
    url: process.env.PUBLIC_URL + "/images/park_icon.png",
    size: new window.google.maps.Size(50, 50),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(25, 25),
  };

  return (
    <>
      <MapDrawer
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        setSelectedCenter={setSelectedCenter}
      />

      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={13}
        center={selectedCenter}
        options={mapOptions}
      >
        {locations?.map(({ title, latLng }) => (
          <Marker key={title} position={latLng} icon={icon} />
        ))}
      </GoogleMap>
    </>
  );
};

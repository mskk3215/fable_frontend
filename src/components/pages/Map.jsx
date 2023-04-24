import React, { useEffect, useState, useContext } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapDrawer } from "../organisms/MapDrawer";
import { SearchParkContext } from "../../providers/SearchParkProvider";
import styled from "styled-components";
import { DirectionDrawer } from "../organisms/DirectionDrawer";

export const Map = () => {
  const { searchResults } = useContext(SearchParkContext);
  const [mapStyle, setMapStyle] = useState({});
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState({
    lat: 35.69575,
    lng: 139.77521,
  });
  const [open, setOpen] = useState(true);
  const [switchDrawer, setSwitchDrawer] = useState(true);
  const [listItem, setListItem] = useState([]);

  const locations = searchResults.map((result) => {
    const id = result.id;
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    console.log(result);
    return { id, title, latLng };
  });

  const mapOptions = {
    fullscreenControl: false,
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

  const renderIcon = (id) => {
    return id === selectedItemId
      ? undefined
      : {
          url: process.env.PUBLIC_URL + "/images/park_icon.png",
          size: new window.google.maps.Size(50, 50),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(25, 25),
        };
  };

  //label option
  const markerLabel = (title) => ({
    text: title,
    color: "red",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
    labelOrigin: new window.google.maps.Point(0, -30),
  });

  return (
    <>
      {switchDrawer ? (
        <MapDrawer
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          setSelectedCenter={setSelectedCenter}
          setSwitchDrawer={setSwitchDrawer}
          setListItem={setListItem}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <DirectionDrawer />
      )}

      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={13}
        center={selectedCenter}
        options={mapOptions}
      >
        {locations?.map(({ id, title, latLng }) => (
          <Marker
            key={title}
            position={latLng}
            icon={renderIcon(id)}
            animation={
              id === selectedItemId
                ? window.google.maps.Animation.DROP
                : undefined
            }
            label={markerLabel(title)}
          />
        ))}
      </GoogleMap>
    </>
  );
};

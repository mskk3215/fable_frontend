import { memo, useContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
// @ts-expect-error TS(6142): Module '../../providers/SearchParkProvider' was re... Remove this comment to see the full error message
import { SearchParkContext } from "../../providers/SearchParkProvider";
import {
  mapApiLoadState,
  selectedCenterState,
  selectedItemState,
} from "../../store/atoms/MapDirectionState";

// @ts-expect-error TS(2769): No overload matches this call.
export const MapView = memo((props) => {
  // @ts-expect-error TS(2339): Property 'directions' does not exist on type '{}'.
  const { directions, handleMapClick, onLoadHook } = props;
  // @ts-expect-error TS(2339): Property 'searchResults' does not exist on type 'u... Remove this comment to see the full error message
  const { searchResults } = useContext(SearchParkContext);
  const [selectedCenter, setSelectedCenter] =
    useRecoilState(selectedCenterState);
  const [selectedItemId, setSelectedItemId] = useRecoilState(selectedItemState);
  const [mapLoadState, setMapLoadState] = useRecoilState(mapApiLoadState);

  const mapOptions = {
    fullscreenControl: false,
    mapTypeControl: false,
  };

  const locations = searchResults.map((result: any) => {
    const id = result.id;
    const title = result.name;
    const latLng = { lat: result.latitude, lng: result.longitude };
    return { id, title, latLng };
  });

  //Google Maps APIの読み込み状態を管理する
  const { isLoaded, loadError } = useLoadScript({
    // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: ["places"],
  });
  useEffect(() => {
    // @ts-expect-error TS(2322): Type 'Error | undefined' is not assignable to type... Remove this comment to see the full error message
    setMapLoadState({ isLoaded, loadError });
  }, [isLoaded, loadError, setMapLoadState]);

  if (mapLoadState.loadError) return "Error loading maps";
  if (!mapLoadState.isLoaded) return "Loading Maps";

  //Iconの設定
  const renderIcon = (id: any) => {
    const selectedIconUrl = process.env.PUBLIC_URL + "/images/selectedIcon.png";
    const parkIconUrl = process.env.PUBLIC_URL + "/images/park_icon.png";

    return {
      url: id === selectedItemId ? selectedIconUrl : parkIconUrl,
      size: new window.google.maps.Size(50, 50),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(25, 25),
    };
  };

  //label option
  const markerLabel = (title: any) => ({
    text: title,
    color: "blue",
    fontFamily: "sans-serif",
    fontSize: "15px",
    fontWeight: "bold",
    labelOrigin: new window.google.maps.Point(0, -30)
  });

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <GoogleMap
      mapContainerStyle={{
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      }}
      zoom={10}
      center={selectedCenter}
      options={mapOptions}
      onClick={(e) => handleMapClick(e)}
    >
      {locations?.map(({
        id,
        title,
        latLng
      }: any) => (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MarkerF
          key={id}
          position={latLng}
          options={{
            icon: renderIcon(id),
            animation:
              id === selectedItemId
                ? window.google.maps.Animation.BOUNCE
                : undefined,
          }}
          label={markerLabel(title)}
          onClick={() => {
            setSelectedItemId(id);
            setSelectedCenter(latLng);
          }}
        />
      ))}
      {directions && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#F87171",
              strokeOpacity: 1,
              strokeWeight: 6,
            },
            suppressMarkers: true,
          }}
          onLoad={onLoadHook}
        />
      )}
      {directions?.routes[0]?.legs[0]?.start_location && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <MarkerF
          position={directions.routes[0].legs[0].start_location}
          title="出発地点"
        ></MarkerF>
      )}
    </GoogleMap>
  );
});

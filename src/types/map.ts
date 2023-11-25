export type TravelMode = "BICYCLING" | "DRIVING" | "TRANSIT" | "WALKING";
export type Anchor = "left" | "right" | "top" | "bottom";
export type LatLng = {
  lat: number;
  lng: number;
};
export type Location = {
  id: number;
  title: string;
  latLng: LatLng;
};

export type Steps = {
  instruction: string;
  distance: string;
  duration: string;
  latLng: LatLng;
};

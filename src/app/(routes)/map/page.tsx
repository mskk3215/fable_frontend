import { Metadata } from "next";
import { Map } from "../../_components/map/Map";

export const metadata: Metadata = {
  title: "マップ",
  description: "マップページ",
};

export default function MapPage() {
  return (
    <>
      <Map />
    </>
  );
}

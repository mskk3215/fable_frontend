import { Metadata } from "next";
import { Direction } from "../../_components/direction/Direction";

export const metadata: Metadata = {
  title: "行き方",
  description: "道順ページ",
};

export default function DirectionPage() {
  return (
    <>
      <Direction />
    </>
  );
}

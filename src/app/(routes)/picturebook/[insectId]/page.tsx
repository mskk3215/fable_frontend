import React from "react";
import { Metadata } from "next";
import RouteAuthGuard from "../../../_components/auth/RouteAuthGurad";
import { PictureBook } from "../../../_components/picturebook/PictureBook";

type Props = {
  params: {
    insectId: number;
  };
};
export const metadata: Metadata = {
  title: "図鑑",
  description: "図鑑ページ",
};

export default function PictureBookPage({ params }: Props) {
  const insectId = params.insectId;
  return (
    <main>
      <RouteAuthGuard>
        <PictureBook insectId={insectId} />
      </RouteAuthGuard>
    </main>
  );
}

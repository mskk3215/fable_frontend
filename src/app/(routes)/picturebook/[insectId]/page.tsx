import React from "react";
import { Metadata } from "next";
import RouteAuthGuard from "../../../_components/auth/RouteAuthGurad";
import PictureBook from "../../../_components/picturebook/PictureBook";

type Props = {
  params: {
    insectId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.insectId;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/insects/${id}`,
    {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
  return {
    title: `${data.insect.name}`,
    description: `${data.insect.name}の図鑑ページ`,
  };
}
async function fetchPictureBookInfo(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/insects/${id}`,
    {
      cache: "no-store",
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
}

export default async function PictureBookPage({ params }: Props) {
  const { pictureBookInfo } = await fetchPictureBookInfo(params.insectId);

  return (
    <main>
      <RouteAuthGuard>
        <PictureBook pictureBookInfo={pictureBookInfo} />
      </RouteAuthGuard>
    </main>
  );
}

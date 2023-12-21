import React from "react";
import PublicImages from "../../../_components/userpage/PublicImages";
import PublicProfile from "../../../_components/userpage/PublicProfile";

type Props = {
  params: {
    userId: string;
  };
};

async function fetchProfileInfo(id: string) {
  const res = await fetch(`${process.env.url}/api/v1/users?user_id=${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data.user;
}

async function fetchLatestImages(id: string) {
  const res = await fetch(`${process.env.url}/api/v1/images?user_id=${id}`, {
    cache: "no-store",
  });

  const data = await res.json();
  return data;
}

export default async function UserPagePage({ params }: Props) {
  const profileInfo = await fetchProfileInfo(params.userId);
  const { images: latestImages, total_images_count: totalImagesCount } =
    await fetchLatestImages(params.userId);

  const numUserId =
    typeof params.userId === "string" ? parseInt(params.userId, 10) : undefined;

  return (
    <main>
      <PublicProfile
        profileInfo={profileInfo}
        numUserId={numUserId}
        totalImagesCount={totalImagesCount}
      />
    </main>
  );
}

import React from "react";
import PublicImages from "../../../_components/userpage/PublicImages";
import PublicProfile from "../../../_components/userpage/PublicProfile";
import { Metadata } from "next";

type Props = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.userId;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`
  ).then((res) => res.json());

  return {
    title: `${data.user.nickname}`,
    description: `${data.user.nickname}の昆虫採集画像一覧のページ`,
  };
}

async function fetchProfileInfo(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.user;
}

async function fetchLatestImages(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/images?user_id=${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data;
}

export default async function UserPagePage({ params }: Props) {
  const profileInfo = await fetchProfileInfo(params.userId);
  const { images: latestImages, total_images_count: totalImagesCount } =
    await fetchLatestImages(params.userId);

  const numUserId = parseInt(params.userId, 10);

  return (
    <main>
      <PublicProfile
        profileInfo={profileInfo}
        numUserId={numUserId}
        totalImagesCount={totalImagesCount}
      />
      <PublicImages latestImages={latestImages} numUserId={numUserId} />
    </main>
  );
}

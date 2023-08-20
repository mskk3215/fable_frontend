//特定のユーザーの全画像を取得するカスタムフック
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedCountState, likedImageState } from "../store/atoms/imageAtom";
import { loginUserState } from "../store/atoms/userAtom";
import { getImages, getUserImages } from "../urls";
import { Image, UseImages } from "../types/images";
import { User } from "../types/user";

export const useImages = (userId?: number): UseImages => {
  const loginUser = useRecoilValue<User | null>(loginUserState);

  // 画像情報
  const [images, setImages] = useState<Image[]>([]);
  // いいね情報
  const setLikedImage = useSetRecoilState(likedImageState);
  const setLikedCount = useSetRecoilState(likedCountState);

  // ユーザーの全画像を取得する
  const handleGetImages = async (userId?: number) => {
    const { data } = userId ? await getUserImages(userId) : await getImages();
    setImages(data);
    // いいね情報を取得する
    updateLikedImage(data);
    updatedLikedCount(data);
  };
  useEffect(() => {
    handleGetImages(userId);
  }, []);

  // いいね状態がtrueの画像を取得する
  const updateLikedImage = (allImageData: Image[] | undefined) => {
    if (!allImageData || !loginUser) return;

    const updatedLikedImage = allImageData.reduce<{ [key: number]: boolean }>(
      (acc, image) => {
        acc[image.id] = !!image.liked_user_ids?.includes(loginUser?.id);
        return acc;
      },
      {}
    );
    setLikedImage(updatedLikedImage);
  };
  // いいね数を取得する
  const updatedLikedCount = (allImageData: Image[] | undefined) => {
    if (!allImageData) return;
    const updatedLikedCount = allImageData.reduce<{ [key: number]: number }>(
      (acc, image) => {
        acc[image.id] = image.likes_count || 0;
        return acc;
      },
      {}
    );
    setLikedCount(updatedLikedCount);
  };

  return { images, handleGetImages };
};

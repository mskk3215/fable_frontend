//特定のユーザーの全画像を取得するカスタムフック
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedCountState, likedImageState } from "../store/atoms/imageAtom";
import { loginUserState } from "../store/atoms/userAtom";
import { getImages, getUserImages } from "../urls";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import { Image, UseImages } from "../types/images";
import { User } from "../types/user";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";

export const useImages = (userId?: number): UseImages => {
  const [isImagesLoading, setIsImagesLoading] = useState<boolean>(false);
  const loginUser = useRecoilValue<User | null>(loginUserState);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 画像情報
  const [images, setImages] = useState<Image[]>([]);
  // いいね情報
  const setLikedImage = useSetRecoilState(likedImageState);
  const setLikedCount = useSetRecoilState(likedCountState);

  // ユーザーの全画像を取得する
  const handleGetImages = async (userId?: number) => {
    setIsImagesLoading(true);
    const { data } = userId ? await getUserImages(userId) : await getImages();
    setImages(data);
    setIsImagesLoading(false);
    // いいね情報を取得する
    updateLikedImage(data);
    updatedLikedCount(data);
  };

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

  // 撮影日時をフォーマットする
  const createdTime = (image: Image) => {
    if (image.taken_at) {
      const date = new Date(image.taken_at);
      const formattedDate = format(date, "yyyy/M/d/(E)", { locale: ja });
      return formattedDate;
    }
    return null;
  };

  return {
    images,
    setImages,
    handleGetImages,
    updateLikedImage,
    updatedLikedCount,
    createdTime,
    isImagesLoading,
  };
};

//特定のユーザーの全画像を取得するカスタムフック
import { useEffect, useState } from "react";
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
  const loginUser = useRecoilValue<User | null>(loginUserState);
  const [isImagesInitialLoading, setIsImagesInitialLoading] =
    useState<boolean>(true);
  const [isImagesLoading, setIsImagesLoading] = useState<boolean>(false);
  const [imagePage, setImagePage] = useState(1);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [totalImagesCount, setTotalImagesCount] = useState<number>(0);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 画像情報
  const [images, setImages] = useState<Image[]>([]);
  // いいね情報
  const setLikedImage = useSetRecoilState(likedImageState);
  const setLikedCount = useSetRecoilState(likedCountState);

  // ページ初期読み込み時の画像取得
  const handleGetImages = async (userId?: number) => {
    setHasMoreImages(true);
    setIsImagesLoading(true);

    setImagePage(1);
    const { data } = userId
      ? await getUserImages(userId, 1)
      : await getImages(1);
    setImages(data.images);

    setIsImagesInitialLoading(false);
    setIsImagesLoading(false);

    // 画像の総数を取得する
    setTotalImagesCount(data.total_images_count);

    // いいね情報を取得する
    updateLikedImage(data.images);
    updatedLikedCount(data.images);
  };

  // スクロールした時の画像を取得する
  const handleGetMoreImages = async (userId?: number) => {
    if (!hasMoreImages) return;
    setIsImagesLoading(true);

    const { data } = userId
      ? await getUserImages(userId, imagePage)
      : await getImages(imagePage);
    setImages((prevImages) => {
      const newData = data.images.filter(
        (image: Image) =>
          !prevImages.some((prevItem) => prevItem.id === image.id)
      );
      return [...prevImages, ...newData];
    });

    if (data.images.length === 0) setHasMoreImages(false);
    setIsImagesLoading(false);

    // いいね情報を取得する
    updateLikedImage(data.images);
    updatedLikedCount(data.images);
  };

  useEffect(() => {
    handleGetMoreImages(userId);
  }, [imagePage]);

  // いいね状態がtrueの画像を取得する
  const updateLikedImage = (allImageData: Image[] | undefined) => {
    if (!allImageData || !loginUser) return;

    setLikedImage((prevLikedImage) => {
      return allImageData.reduce<{ [key: number]: boolean }>(
        (acc, image) => {
          acc[image.id] = !!image.liked_user_ids?.includes(loginUser?.id);
          return acc;
        },
        { ...prevLikedImage }
      );
    });
  };
  // いいね数を取得する
  const updatedLikedCount = (allImageData: Image[] | undefined) => {
    if (!allImageData) return;
    setLikedCount((prevLikedCount) => {
      return allImageData.reduce<{ [key: number]: number }>(
        (acc, image) => {
          acc[image.id] = image.likes_count || 0;
          return acc;
        },
        { ...prevLikedCount }
      );
    });
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
    handleGetMoreImages,
    updateLikedImage,
    updatedLikedCount,
    createdTime,
    isImagesLoading,
    isImagesInitialLoading,
    setImagePage,
    totalImagesCount,
  };
};

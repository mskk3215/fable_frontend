//特定のユーザーの全画像を取得するカスタムフック
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { likedCountState, likedImageState } from "../store/atoms/imageAtom";
import { loginUserState } from "../store/atoms/userAtom";
import { getImages, getUserImages } from "../urls";
import format from "date-fns/format";
import ja from "date-fns/locale/ja";
import { HandleGetImages, Image, UseImages } from "../types/images";
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
  // ソートオプション
  const [sortOption, setSortOption] = useState<number>(0);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 画像情報
  const [images, setImages] = useState<Image[]>([]);
  // いいね情報
  const setLikedImage = useSetRecoilState(likedImageState);
  const setLikedCount = useSetRecoilState(likedCountState);

  // UserPage初期読み込み時の画像取得
  const handleGetImages = async (pageSize: number, userId?: number) => {
    setHasMoreImages(true);
    setIsImagesLoading(true);

    setImagePage(1);
    const { data } = userId
      ? await getUserImages({ userId, page: 1, pageSize, sortOption })
      : await getImages({ page: 1, pageSize, sortOption });
    setImages(data.images);

    setIsImagesInitialLoading(false);
    setIsImagesLoading(false);

    // 画像の総数を取得する
    setTotalImagesCount(data.totalImagesCount);

    // いいね情報を取得する
    updateLikedImage(data.images);
    updatedLikedCount(data.images);
  };

  // UserPageでスクロールした時.ImageEditでページを切り替えた時の画像を取得する
  const handleGetMoreImages: HandleGetImages = async (
    pageSize,
    userId,
    context
  ) => {
    if (!hasMoreImages) return;
    setIsImagesLoading(true);

    const { data } = userId
      ? await getUserImages({ userId, page: imagePage, pageSize, sortOption })
      : await getImages({ page: imagePage, pageSize, sortOption });
    // UserPageとImageEdtで画像取得方法を変える
    if (context === "addToImages") {
      setImages((prevImages) => {
        const newData = data.images.filter(
          (image: Image) =>
            !prevImages.some((prevItem) => prevItem.id === image.id)
        );
        return [...prevImages, ...newData];
      });
    } else {
      setImages(data.images);
    }

    if (data.images.length === 0) setHasMoreImages(false);
    setIsImagesLoading(false);

    // いいね情報を取得する
    updateLikedImage(data.images);
    updatedLikedCount(data.images);
  };

  // いいね状態がtrueの画像を取得する
  const updateLikedImage = (allImageData: Image[] | undefined) => {
    if (!allImageData || !loginUser) return;

    setLikedImage((prevLikedImage) => {
      return allImageData.reduce<{ [key: number]: boolean }>(
        (acc, image) => {
          acc[image.id] = !!image.likedUserIds?.includes(loginUser?.id);
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
          acc[image.id] = image.likesCount || 0;
          return acc;
        },
        { ...prevLikedCount }
      );
    });
  };

  // 撮影日時をフォーマットする
  const createdTime = (image: Image) => {
    if (image.takenAt) {
      const date = new Date(image.takenAt);
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
    imagePage,
    setImagePage,
    totalImagesCount,
    sortOption,
    setSortOption,
  };
};

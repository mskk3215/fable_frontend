//昆虫図鑑データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { getPictureBookInfo } from "../urls";
import { PictureBookInfo } from "../types/picturebooks";

export const usePictureBook = (insectId: number) => {
  const [pictureBookInfo, setPictureBookInfo] = useState<PictureBookInfo>();

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  const handleGetPictureBook = async (insectId: number) => {
    const { data } = await getPictureBookInfo(insectId);
    setPictureBookInfo(data.insect);
  };

  useEffect(() => {
    handleGetPictureBook(insectId);
  }, []);

  return { pictureBookInfo };
};

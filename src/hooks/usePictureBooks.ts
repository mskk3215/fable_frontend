//昆虫図鑑データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { messageState } from "../store/atoms/errorAtom";
import { useErrorAction } from "./error/useErrorAction";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { getPictureBookInfo, getPictureBookList } from "../urls";
import { PictureBookInfo } from "../types/picturebooks";
import { Insect } from "../types/insects";
import { ApiError } from "../types/api";

export const usePictureBook = (insectId?: number) => {
  const { handleGeneralErrorAction } = useErrorAction();
  const setMessage = useSetRecoilState(messageState);

  const [pictureBookInfo, setPictureBookInfo] = useState<PictureBookInfo>();
  const [pictureBookList, setPictureBookList] = useState<Insect[]>([]);
  const [isPictureBookListInitialLoading, setIsPictureBookListInitialLoading] =
    useState<boolean>(false);
  const [isPictureBookListLoading, setIsPictureBookListLoading] =
    useState(false);
  const [hasMorePictureBookList, setHasMorePictureBookList] = useState(true);
  const [pictureBookListPage, setPictureBookListPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 昆虫毎の図鑑詳細情報を取得する
  const handleGetPictureBook = async (insectId: number) => {
    await getPictureBookInfo(insectId)
      .then((response) => {
        if (response?.data?.insect) {
          setPictureBookInfo(response.data.insect);
        } else {
          console.log("Error: Response is not OK or no data received.");
        }
      })
      .catch((error: ApiError) => handleGeneralErrorAction(error, setMessage));
  };
  useEffect(() => {
    if (!insectId) return;
    handleGetPictureBook(insectId);
  }, [insectId]);

  // 昆虫図鑑一覧情報を取得する
  // 初回読み込み
  const handleGetPictureBookList = async () => {
    setHasMorePictureBookList(true);
    setIsPictureBookListInitialLoading(true);
    setPictureBookListPage(1);

    const { data } = await getPictureBookList(1);
    setPictureBookList(data);
    setIsPictureBookListInitialLoading(false);
  };
  useEffect(() => {
    handleGetPictureBookList();
  }, []);

  // 検索欄でフィルタリング
  const handleGetFilteredPictureBookList = async () => {
    if (!searchTerm) return;
    setHasMorePictureBookList(false);
    setPictureBookListPage(1);

    const { data } = await getPictureBookList(1, searchTerm);
    setPictureBookList(data);
  };

  // 追加読み込み
  const handleGetMorePictureBookList = async () => {
    if (!hasMorePictureBookList) return;
    setIsPictureBookListLoading(true);
    setTimeout(async () => {
      const { data } = await getPictureBookList(
        pictureBookListPage,
        searchTerm
      );
      setPictureBookList((prevList) => {
        const newData = data.filter(
          (insect: Insect) =>
            !prevList.some((prevItem) => prevItem.insectId === insect.insectId)
        );
        return [...prevList, ...newData];
      });
      if (data.length === 0) setHasMorePictureBookList(false);
      setIsPictureBookListLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleGetMorePictureBookList();
  }, [pictureBookListPage]);

  return {
    pictureBookInfo,
    pictureBookList,
    isPictureBookListInitialLoading,
    isPictureBookListLoading,
    setPictureBookListPage,
    handleGetPictureBookList,
    handleGetFilteredPictureBookList,
    searchTerm,
    setSearchTerm,
  };
};

//昆虫目撃通知データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { useSetRecoilState } from "recoil";
import { getSightingNotifications } from "../urls";
import {
  notificationSettingState,
  sightingNotificationState,
} from "../store/atoms/notificationAtom";
import { Insect } from "../types/insects";
import { SightingNotifications } from "../types/sightingnotifications";

export const useInsectSightingNotifications = (insectId?: number) => {
  // 通知設定
  const setSightingNotifications = useSetRecoilState(sightingNotificationState);
  const setNotificationSetting = useSetRecoilState(notificationSettingState);
  // ユーザーの通知データ
  const [userSightingNotifications, setUserSightingNotifications] = useState<
    SightingNotifications[]
  >([]);
  const [
    pictureBookSightingInsectNotifications,
    setPictureBookSightingInsectNotifications,
  ] = useState<SightingNotifications[]>([]);
  // loading関連の関数
  const [
    isSightingNotificationInitialLoading,
    setIsSightingNotificationInitialLoading,
  ] = useState<boolean>(false);
  const [isNotificationLoading, setIsNotificationLoading] = useState<
    boolean | undefined
  >(undefined);
  const [isSightingNotificationLoading, setIsSightingNotificationLoading] =
    useState<boolean>(false);
  const [sightingNotificationPage, setSightingNotificationPage] = useState(1);
  const [hasMoreSightingNotification, setHasMoreSightingNotification] =
    useState(true);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 通知情報を取得する
  // 初回読み込み
  const handleGetSightingNotifications = async (
    insectId?: number,
    includeNotificationButton?: boolean
  ) => {
    setHasMoreSightingNotification(true);
    setSightingNotificationPage(1);

    if (includeNotificationButton) {
      setIsNotificationLoading(true);
      // 昆虫ごとの通知有無設定を取得
      const { data } = await getSightingNotifications(
        sightingNotificationPage,
        insectId,
        includeNotificationButton
      );
      // insectIdでソート
      const sortedData = data.sort(
        (a: SightingNotifications, b: SightingNotifications) => {
          return a.insectId - b.insectId;
        }
      );
      setSightingNotifications(sortedData);
      setNotificationSetting(convertNotificationData(data)); //セット
      setIsNotificationLoading(false);
    } else {
      setIsSightingNotificationInitialLoading(true);
      if (insectId) {
        // picturebookの昆虫の通知情報を取得
        const { data } = await getSightingNotifications(
          sightingNotificationPage,
          insectId
        );
        setPictureBookSightingInsectNotifications(data);
      } else {
        // notification listの通知情報一覧を取得
        const { data } = await getSightingNotifications(
          sightingNotificationPage
        );
        setUserSightingNotifications(data);
      }
      setIsSightingNotificationInitialLoading(false);
    }
  };
  useEffect(() => {
    // picturebook下部の昆虫の通知情報一覧
    handleGetSightingNotifications(insectId);
    // 通知設定リスト
    handleGetSightingNotifications(undefined, true);
  }, [insectId]);

  // 追加読み込み
  const handleGetMoreSightingNotification = async () => {
    if (!hasMoreSightingNotification) return;
    setIsSightingNotificationLoading(true);
    setTimeout(async () => {
      const { data } = await getSightingNotifications(sightingNotificationPage);
      setUserSightingNotifications((prevList) => {
        const newData = data.filter(
          (notifications: SightingNotifications) =>
            !prevList.some(
              (prevItem) =>
                prevItem.collectedInsectId === notifications.collectedInsectId
            )
        );
        return [...prevList, ...newData];
      });
      if (data.length === 0) setHasMoreSightingNotification(false);
      setIsSightingNotificationLoading(false);
    }, 500);
  };

  useEffect(() => {
    handleGetMoreSightingNotification();
  }, [sightingNotificationPage]);

  // 通知ボタン処理用に通知データをobjectに変換
  const convertNotificationData = (
    insectArray: Insect[]
  ): { [key: number]: boolean } => {
    const result: { [key: number]: boolean } = {};
    insectArray.forEach((insect: Insect) => {
      result[insect.insectId] = true;
    });
    return result;
  };

  return {
    userSightingNotifications,
    pictureBookSightingInsectNotifications,
    isSightingNotificationLoading,
    setSightingNotificationPage,
    isSightingNotificationInitialLoading,
    isNotificationLoading,
    handleGetSightingNotifications,
  };
};

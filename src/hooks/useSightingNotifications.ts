//昆虫目撃通知データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
import { getSightingNotifications } from "../urls";
import { SightingNotifications } from "../types/sightingnotifications";

export const useInsectSightingNotifications = (insectId?: number) => {
  const [insectNotificationSetting, setInsectNotificationSetting] = useState<
    SightingNotifications[]
  >([]);
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
    setIsSightingNotificationInitialLoading(true);
    setSightingNotificationPage(1);

    if (includeNotificationButton) {
      setIsNotificationLoading(true);
      // 昆虫ごとの通知有無設定を取得
      const { data } = await getSightingNotifications(
        sightingNotificationPage,
        insectId,
        includeNotificationButton
      );
      setInsectNotificationSetting(data);
      setIsNotificationLoading(false);
    } else {
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
    }
    setIsSightingNotificationInitialLoading(false);
  };
  useEffect(() => {
    handleGetSightingNotifications(insectId);
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

  return {
    userSightingNotifications,
    insectNotificationSetting,
    setInsectNotificationSetting,
    pictureBookSightingInsectNotifications,
    isSightingNotificationLoading,
    setSightingNotificationPage,
    isSightingNotificationInitialLoading,
    isNotificationLoading,
    handleGetSightingNotifications,
  };
};

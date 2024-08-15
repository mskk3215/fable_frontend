//昆虫目撃通知データを取得するカスタムフック
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  getIsNotification,
  getSightingNotifications,
  getSightingNotificationSettings,
} from "../urls";
import {
  isNotificationIconState,
  notificationSettingState,
  sightingNotificationState,
} from "../store/atoms/notificationAtom";
import { useGetRequestErrorAction } from "./error/useGetRequestErrorAction";
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
  // PictureBook下部の通知データ
  const [
    pictureBookSightingInsectNotifications,
    setPictureBookSightingInsectNotifications,
  ] = useState<SightingNotifications[]>([]);
  const [isNotificationIcon, setIsNotificationIcon] = useRecoilState(
    isNotificationIconState
  );

  // loading関連の関数
  // notification listのloading
  const [
    isSightingNotificationInitialLoading,
    setIsSightingNotificationInitialLoading,
  ] = useState<boolean>(false);
  // notification list 追加読み込みのloading
  const [isSightingNotificationLoading, setIsSightingNotificationLoading] =
    useState<boolean>(false);
  /// notification pagination page
  const [sightingNotificationPage, setSightingNotificationPage] = useState(1);
  /// 通知情報の追加読み込みがあるか
  const [hasMoreSightingNotification, setHasMoreSightingNotification] =
    useState(true);
  // buttonのloading
  const [isNotificationLoading, setIsNotificationLoading] = useState<
    boolean | undefined
  >(undefined);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // 通知アイコンの切り替え
  const handleGetIsNotification = async () => {
    const { data } = await getIsNotification(true);
    if (data.length > 0) {
      setIsNotificationIcon(true);
    } else {
      setIsNotificationIcon(false);
    }
  };

  // 通知設定を取得する
  const handleGetSightingNotificationSettings = async () => {
    setIsNotificationLoading(true);
    // 通知有無リストを取得
    const { data } = await getSightingNotificationSettings();
    // insectIdでソート
    const sortedData = data.sort(
      (a: SightingNotifications, b: SightingNotifications) => {
        return a.insectId - b.insectId;
      }
    );
    setSightingNotifications(sortedData);
    setNotificationSetting(convertNotificationData(data)); //セット
    setIsNotificationLoading(false);
  };

  // 通知情報を取得する
  // 初回読み込み
  const handleGetSightingNotifications = async (insectId?: number) => {
    setHasMoreSightingNotification(true);
    setSightingNotificationPage(1);

    setIsSightingNotificationInitialLoading(true);
    if (insectId) {
      // picturebook下部の昆虫の通知情報一覧を取得
      const { data } = await getSightingNotifications(
        sightingNotificationPage,
        insectId
      );
      setPictureBookSightingInsectNotifications(data); //セット
    } else {
      // notification listの通知情報一覧を取得
      const { data } = await getSightingNotifications(sightingNotificationPage);
      setUserSightingNotifications(data); //セット
      // 通知アイコンの切り替え
      handleGetIsNotification();
    }
    setIsSightingNotificationInitialLoading(false);
  };

  useEffect(() => {
    // picturebook下部の昆虫の通知情報一覧
    handleGetSightingNotifications(insectId);
    // 通知設定リスト
    handleGetSightingNotificationSettings();
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
  // 通知アイコンの切り替え
  useEffect(() => {
    handleGetIsNotification();
  }, []);

  // 通知リストの追加読み込み
  useEffect(() => {
    if (sightingNotificationPage < 2) return;
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
    isNotificationIcon,
    handleGetIsNotification,
    handleGetSightingNotifications,
    handleGetSightingNotificationSettings,
  };
};

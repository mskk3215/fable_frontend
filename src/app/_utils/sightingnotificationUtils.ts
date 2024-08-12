import { SightingNotifications } from "../../types/sightingnotifications";
import {
  createUserSightingNotificationSetting,
  deleteUserSightingNotificationSetting,
} from "../../urls";

// // 通知ボタンのon/offの状態をサーバーへ送信する
export const createHandleNotificationSetting = (
  sightingNotifications: SightingNotifications[],
  handleGetSightingNotifications: (arg1: any, arg2: boolean) => void
) => {
  return async (insectId: number) => {
    const notification = sightingNotifications.find(
      (notification) => notification.insectId === Number(insectId)
    );

    if (notification) {
      await deleteUserSightingNotificationSetting(notification.id);
    } else {
      await createUserSightingNotificationSetting(insectId);
    }

    handleGetSightingNotifications(undefined, true);
  };
};

import { SightingNotifications } from "../../types/sightingnotifications";
import {
  createUserSightingNotification,
  deleteUserSightingNotification,
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
      await deleteUserSightingNotification(notification.id);
    } else {
      await createUserSightingNotification(insectId);
    }

    handleGetSightingNotifications(undefined, true);
  };
};

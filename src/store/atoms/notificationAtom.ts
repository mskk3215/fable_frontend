import { atom } from "recoil";
import { SightingNotifications } from "../../types/sightingnotifications";

export const sightingNotificationState = atom<SightingNotifications[]>({
  key: "sightingNotificationState",
  default: [],
});

export const notificationSettingState = atom<{ [key: number]: boolean }>({
  key: "notificationSettingState",
  default: {},
});

export const isNotificationIconState = atom<boolean>({
  key: "isNotificationIconState",
  default: false,
});

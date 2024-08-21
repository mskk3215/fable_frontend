export type SightingNotifications = {
  id: number;
  collectedInsectId: number;
  insectId: number;
  insectName: string;
  takenDateTime?: string;
  parkName?: string;
  isRead?: boolean;
};

export type SightingNotificationSetting = {
  [key: number]: boolean;
};

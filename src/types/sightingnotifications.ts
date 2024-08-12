export type SightingNotifications = {
  id: number;
  collectedInsectId: number;
  insectId: number;
  insectName: string;
  takenDateTime?: string;
  parkName?: string;
};

export type SightingNotificationSetting = {
  [key: number]: boolean;
};

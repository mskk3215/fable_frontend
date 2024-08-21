import format from "date-fns/format";
import ja from "date-fns/locale/ja";

// 撮影日時をフォーマットする関数
export const formatDateTime = (takenDateTime: string | Date): string => {
  if (takenDateTime) {
    const date = new Date(takenDateTime);
    return format(date, "yyyy/M/d(E) HH:mm", { locale: ja });
  }
  return "";
};

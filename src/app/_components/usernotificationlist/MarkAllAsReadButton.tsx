import { useRecoilValue } from "recoil";
import { isNotificationIconState } from "../../../store/atoms/notificationAtom";
import { Button } from "@mui/material";

type Props = {
  handleMarkAllAsRead: () => void;
  isLoading: boolean;
};
export const MarkAllAsReadButton = (props: Props) => {
  const { handleMarkAllAsRead, isLoading } = props;
  const isNotificationIcon = useRecoilValue(isNotificationIconState);
  return (
    <Button
      variant={isNotificationIcon ? "contained" : "outlined"}
      color="success"
      onClick={handleMarkAllAsRead}
      sx={{ mb: 2 }}
      disabled={!isNotificationIcon || isLoading}
    >
      全て既読にする
    </Button>
  );
};

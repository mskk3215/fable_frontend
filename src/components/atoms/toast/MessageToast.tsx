import { useRecoilState } from "recoil";
import { messageState } from "../../../store/atoms/errorAtom";
import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";

export const MessageToast = () => {
  const [message, setMessage] = useRecoilState(messageState);

  const onClose = () => {
    setMessage("");
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={
        <>
          <IconButton size="small" color="inherit" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

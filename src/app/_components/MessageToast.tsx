"use client";

import { useRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";

export const MessageToast = () => {
  const [message, setMessage] = useRecoilState(messageState);

  const onClose = () => {
    setMessage({ message: "", type: "info" });
  };

  const snackBarColor = () => {
    switch (message.type) {
      case "error":
        return "error";
      case "success":
        return "success";
      default:
        return "info";
    }
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!!message.message}
      autoHideDuration={6000}
      onClose={onClose}
      style={{ whiteSpace: "pre-line" }}
      action={
        <>
          <IconButton size="small" color="inherit" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </>
      }
    >
      <Alert severity={snackBarColor()}>{message.message}</Alert>
    </Snackbar>
  );
};

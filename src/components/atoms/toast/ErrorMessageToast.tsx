import { useRecoilState } from "recoil";
import { getRequestErrorMessageState } from "../../../store/atoms/errorAtom";
import { Close } from "@mui/icons-material";
import { IconButton, Snackbar } from "@mui/material";

export const ErrorMessageToast = () => {
  const [getRequestErrorMessage, setRequestErrorMessage] = useRecoilState(
    getRequestErrorMessageState
  );

  const onClose = () => {
    setRequestErrorMessage("");
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={!!getRequestErrorMessage}
      autoHideDuration={6000}
      onClose={onClose}
      message={getRequestErrorMessage}
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

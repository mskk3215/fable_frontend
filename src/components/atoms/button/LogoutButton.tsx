import { useSetRecoilState } from "recoil";
import {
  loggedInStatusState,
  loginUserState,
} from "../../../store/atoms/userAtom";
import { messageState } from "../../../store/atoms/errorAtom";
import { useErrorAction } from "../../../hooks/error/useErrorAction";
import { ApiError } from "../../../types/api";
import { userLogout } from "../../../urls";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const { handleGeneralErrorAction } = useErrorAction();
  const setLoggedInStatus = useSetRecoilState(loggedInStatusState);
  const setLoginUser = useSetRecoilState(loginUserState);
  const setMessage = useSetRecoilState(messageState);

  const handleLogoutClick = () => {
    userLogout()
      .then((response) => {
        if (response.data.logged_out) {
          setLoggedInStatus(false);
          setLoginUser(null);
          setMessage({ message: "ログアウトしました", type: "success" });
        }
      })
      .catch((error: ApiError) => {
        handleGeneralErrorAction(error, setMessage);
      });
  };

  return (
    <>
      <Button
        onClick={handleLogoutClick}
        sx={{
          fontSize: "1rem",
          color: "#fff",
          textDecoration: "underline",
          "&:hover": { textDecoration: "underline" },
          margin: 0,
          padding: 0,
        }}
      >
        ログアウト
      </Button>
    </>
  );
};

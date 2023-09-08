import { useSetRecoilState } from "recoil";
import {
  loggedInStatusState,
  loginUserState,
} from "../../../store/atoms/userAtom";
import { messageState } from "../../../store/atoms/errorAtom";
import { userLogout } from "../../../urls";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const setLoggedInStatus = useSetRecoilState(loggedInStatusState);
  const setLoginUser = useSetRecoilState(loginUserState);
  const setMessage = useSetRecoilState(messageState);

  const handleLogoutClick = () => {
    userLogout()
      .then((response) => {
        if (response.data.logged_out) {
          setLoggedInStatus(false);
          setLoginUser(null);
          setMessage("ログアウトしました");
        }
      })
      .catch((error) => {
        setMessage(
          "ログアウトに失敗しました。問題が続く場合はサポートにお問い合わせください。"
        );
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
        }}
      >
        ログアウト
      </Button>
    </>
  );
};

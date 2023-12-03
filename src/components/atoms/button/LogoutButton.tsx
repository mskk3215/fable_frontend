import { useSetRecoilState } from "recoil";
import { loginUserState } from "../../../store/atoms/userAtom";
import { messageState } from "../../../store/atoms/errorAtom";
import { useErrorAction } from "../../../hooks/error/useErrorAction";
import { ApiError } from "../../../types/api";
import { userLogout } from "../../../urls";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { handleGeneralErrorAction } = useErrorAction();
  const setLoginUser = useSetRecoilState(loginUserState);
  const setMessage = useSetRecoilState(messageState);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    userLogout()
      .then((response) => {
        if (response.data.loggedOut) {
          setLoginUser(undefined);
          navigate("/");
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
          color: "#ffffff",
          padding: "0px 12px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        ログアウト
      </Button>
    </>
  );
};

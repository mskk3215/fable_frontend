import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { userLogin } from "../../urls";
import { useUsers } from "./useUsers";
import { LoginAuthAction } from "../../types/user";

export const useLoginAuthAction = () => {
  const { handleSuccessfulAuthentication } = useUsers();
  const setMessage = useSetRecoilState(messageState);

  const navigate = useNavigate();

  const handleLoginAction = ({
    email,
    password,
    setErrors,
    setIsLoading,
  }: LoginAuthAction) => {
    userLogin({ session: { email: email, password: password } })
      .then((response) => {
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
          setMessage("ログインしました。");
        }
      })
      .catch((error) => {
        if (!error.response || error.response.status >= 500) {
          setErrors?.([
            "ネットワークエラーが発生しました。しばらくしてから再試行してください。",
          ]);
        } else {
          setErrors?.(error.response.data.errors);
        }
      })
      .finally(() => {
        setIsLoading?.(false);
      });
  };
  return { handleLoginAction };
};

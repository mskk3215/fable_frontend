import { useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import { loginUserState } from "../../store/atoms/userAtom";
import { messageState } from "../../store/atoms/errorAtom";
import { createUser, userLogin } from "../../urls";
import { useUsers } from "./useUsers";
import { useErrorAction } from "../error/useErrorAction";
import {
  LoginAuthAction,
  RegistrationAuthAction,
  User,
} from "../../types/user";
import { ApiError, AuthResponse } from "../../types/api";

export const useAuthActions = () => {
  const { updateFollowState } = useUsers();
  const { handleAuthErrorAction } = useErrorAction();

  const setLoginUser = useSetRecoilState<User | undefined>(loginUserState);
  const setMessage = useSetRecoilState(messageState);

  const router = useRouter();

  // 新規登録
  const handleUserRegistrationAction = ({
    nickname,
    email,
    password,
    passwordConfirmation,
    setErrors,
    setIsLoading,
  }: RegistrationAuthAction) => {
    const payload = {
      user: {
        nickname: nickname,
        email: email,
        password: password,
        passwordConfirmation: passwordConfirmation,
      },
    };

    setIsLoading?.(true);
    createUser(payload)
      .then((response: AuthResponse) => {
        if (response?.data?.registered) {
          handleSuccessfulAuthentication(response.data);
          router.push("/");
          setMessage({
            message: "登録が完了しました。",
            type: "success",
          });
        }
      })
      .catch((error: ApiError) => {
        handleAuthErrorAction(error, setErrors);
      })
      .finally(() => {
        setIsLoading?.(false);
      });
  };

  // ログイン
  const handleLoginAction = ({
    email,
    password,
    setErrors,
    setIsLoading,
  }: LoginAuthAction) => {
    const payload = { session: { email: email, password: password } };

    setIsLoading?.(true);
    userLogin(payload)
      .then((response: AuthResponse) => {
        if (response?.data?.loggedIn) {
          handleSuccessfulAuthentication(response.data);
          router.push("/postlist");
          setMessage({ message: "ログインしました。", type: "success" });
        }
      })
      .catch((error: ApiError) => {
        handleAuthErrorAction(error, setErrors);
      })
      .finally(() => {
        setIsLoading?.(false);
      });
  };

  // 成功時の処理
  const handleSuccessfulAuthentication = (data: { user: User }) => {
    setLoginUser(data.user);
    updateFollowState(data.user.following);
  };

  return {
    handleUserRegistrationAction,
    handleLoginAction,
    handleSuccessfulAuthentication,
  };
};

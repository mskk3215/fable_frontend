import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  loggedInStatusState,
  loginUserState,
} from "../../store/atoms/userAtom";
import { messageState } from "../../store/atoms/errorAtom";
import { createUser, userLogin } from "../../urls";
import { useUsers } from "./useUsers";
import {
  LoginAuthAction,
  RegistrationAuthAction,
  User,
} from "../../types/user";
import { ApiError, ApiResponse } from "../../types/api";

export const useAuthActions = () => {
  const { updateFollowState } = useUsers();

  const setLoginUser = useSetRecoilState<User | null>(loginUserState);
  const setLoggedInStatus = useSetRecoilState<boolean>(loggedInStatusState);
  const setMessage = useSetRecoilState(messageState);

  const navigate = useNavigate();

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
        password_confirmation: passwordConfirmation,
      },
    };
    handleApiCall(
      createUser,
      payload,
      "登録が完了しました。",
      setErrors,
      setIsLoading
    );
  };

  // ログイン
  const handleLoginAction = ({
    email,
    password,
    setErrors,
    setIsLoading,
  }: LoginAuthAction) => {
    const payload = { session: { email: email, password: password } };
    handleApiCall(
      userLogin,
      payload,
      "ログインしました。",
      setErrors,
      setIsLoading
    );
  };

  // APIコール
  const handleApiCall = (
    apiFunc: (payload: any) => Promise<ApiResponse>,
    apiPayload: any,
    successMessage: string,
    setErrors?: (errors: string[]) => void,
    setIsLoading?: (loading: boolean) => void
  ) => {
    setIsLoading?.(true);
    apiFunc(apiPayload)
      .then((response: ApiResponse) => {
        if (response.data.registered || response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
          navigate("/");
          setMessage(successMessage);
        }
      })
      .catch((error: ApiError) => handleAuthError(error, setErrors))
      .finally(() => {
        setIsLoading?.(false);
      });
  };

  // 成功時の処理
  const handleSuccessfulAuthentication = (data: { user: User }) => {
    setLoggedInStatus(true);
    setLoginUser(data.user);
    updateFollowState(data.user.following);
  };

  // エラー処理
  const handleAuthError = (
    error: ApiError,
    setErrors?: (errors: string[]) => void
  ) => {
    if (!setErrors) return;

    if (!error.response || error.response.status >= 500) {
      setErrors([
        "ネットワークエラーが発生しました。しばらくしてから再試行してください。",
      ]);
    } else {
      setErrors(error.response.data.errors);
    }
  };

  return {
    handleUserRegistrationAction,
    handleLoginAction,
    handleSuccessfulAuthentication,
  };
};

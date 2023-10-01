import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { updateUserPassword, updateUserProfile } from "../../urls";
import { userProfile } from "../../types/user";
import { ApiError } from "../../types/api";
import { useErrorAction } from "../error/useErrorAction";

export const useProfileChangeAction = () => {
  const setMessage = useSetRecoilState(messageState);
  const { handleAuthErrorAction } = useErrorAction();

  const handleProfileChangeAction = ({
    loginUser,
    setLoginUser,
    profileData,
    setErrors,
    isPasswordChange,
    setIsLoading,
    setUploadProfileProgress,
  }: userProfile) => {
    // パスワード変更かプロフィール変更かで分岐
    const updateFunction = isPasswordChange
      ? updateUserPassword
      : updateUserProfile;
    const successMessage = isPasswordChange
      ? "パスワードを変更しました"
      : "プロフィールを更新しました";
    // パスワード変更とプロフィール変更の処理
    updateFunction(loginUser.id, profileData, (progressEvent) => {
      const { loaded, total } = progressEvent;
      if (total === undefined) return;
      const percentage = Math.floor((loaded * 100) / total);
      setUploadProfileProgress(percentage);
    })
      .then((response) => {
        if (response.data.updated) {
          setLoginUser(response.data.user);
          setErrors([]);
          setMessage({
            message: successMessage,
            type: "success",
          });
        }
      })
      .catch((error: ApiError) => handleAuthErrorAction(error, setErrors))
      .finally(() => {
        setIsLoading(false);
        setUploadProfileProgress(0);
      });
  };
  return { handleProfileChangeAction };
};

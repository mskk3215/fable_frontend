import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { updateUser } from "../../urls";
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
  }: userProfile) => {
    updateUser(loginUser.id, profileData)
      .then((response) => {
        if (response.data.updated) {
          setLoginUser(response.data.user);
          setErrors([]);
          if (isPasswordChange) {
            setMessage({
              message: "パスワードを変更しました",
              type: "success",
            });
          } else
            setMessage({
              message: "プロフィールを更新しました",
              type: "success",
            });
        }
      })
      .catch((error: ApiError) => handleAuthErrorAction(error, setErrors));
  };
  return { handleProfileChangeAction };
};

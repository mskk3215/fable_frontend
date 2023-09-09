import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { updateUser } from "../../urls";
import { userProfile } from "../../types/user";

export const useProfileChangeAction = () => {
  const setMessage = useSetRecoilState(messageState);

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
            setMessage("パスワードを変更しました");
          } else setMessage("プロフィールを更新しました");
        }
      })
      .catch((error) => {
        if (!error.response || error.response.status >= 500) {
          setErrors([
            "ネットワークエラーが発生しました。しばらくしてから再試行してください。",
          ]);
        } else {
          setErrors(error.response.data.errors);
        }
      });
  };
  return { handleProfileChangeAction };
};

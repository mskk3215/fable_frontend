import { useSetRecoilState } from "recoil";
import { messageState } from "../../store/atoms/errorAtom";
import { userProfile } from "../../types/user";
import { updateUser } from "../../urls";

export const useProfileChangeAction = () => {
  const setMessage = useSetRecoilState(messageState);

  const handleProfileChangeAction = ({
    loginUser,
    setLoginUser,
    profileData,
    setErrors,
  }: userProfile) => {
    updateUser(loginUser.id, profileData)
      .then((response) => {
        if (response.data.updated) {
          setLoginUser(response.data.user);
          setErrors([]);
          setMessage("プロフィールを更新しました");
        }
      })
      .catch((error) => {
        console.log(error.response);
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

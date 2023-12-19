import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { authCheckedState } from "../../store/atoms/userAtom";
import { useUsers } from "./useUsers";

export const useAuthCheck = () => {
  const setAuthChecked = useSetRecoilState(authCheckedState);
  const { checkLoginStatus } = useUsers();

  // ログイン状態をチェック
  useEffect(() => {
    const init = async () => {
      await checkLoginStatus();
      setAuthChecked(true);
    };
    init();
  }, []);
};

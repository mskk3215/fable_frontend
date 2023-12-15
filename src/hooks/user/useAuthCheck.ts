import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { loginUserState } from "../../store/atoms/userAtom";

// ログインしていなければログイン画面へ遷移
export const useAuthCheck = () => {
  const router = useRouter();
  const loginUser = useRecoilValue(loginUserState);
  if (!loginUser) {
    return router.replace("/login");
  }
};

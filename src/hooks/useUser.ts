import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginUserState,
  viewedUserState,
  loggedInStatusState,
  isFollowedState,
} from "../store/atoms/userAtom";
import { getUser, logged_inUrl } from "../urls";
import { User } from "../types/user";

export const useUser = () => {
  const [loginUser, setLoginUser] = useRecoilState<User | null>(loginUserState);
  const setLoggedInStatus = useSetRecoilState<boolean>(loggedInStatusState);
  const [viewedUser, setViewedUser] = useRecoilState<User | null>(
    viewedUserState
  );
  const setIsFollowed = useSetRecoilState<boolean>(isFollowedState);

  // 新規登録、ログイン成功時の処理
  const handleSuccessfulAuthentication = (data: { user: User }) => {
    setLoggedInStatus(true);
    setLoginUser(data.user);
  };

  // ログイン状態チェック
  const checkLoginStatus = (): Promise<boolean> => {
    return axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setLoginUser(response.data.user);
          return true;
        } else {
          setLoggedInStatus(false);
          setLoginUser(null);
          return false;
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
        return false;
      });
  };

  // ユーザー情報を取得する
  const handleGetUser = async (userId: number | undefined) => {
    const { data } = await getUser(userId);
    if (JSON.stringify(viewedUser) !== JSON.stringify(data.user)) {
      setViewedUser(data.user);
    }

    // フォロー状態を取得する
    const isUserFollowed =
      data.user.followers &&
      data.user.followers.some((follower: User) => follower.id === user?.id);
    setIsFollowed(isUserFollowed);
  };

  return { handleSuccessfulAuthentication, checkLoginStatus, handleGetUser };
};
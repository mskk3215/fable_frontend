import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginUserState,
  viewedUserState,
  loggedInStatusState,
  followUserState,
} from "../store/atoms/userAtom";
import { getUser, logged_inUrl } from "../urls";
import { User } from "../types/user";

export const useUser = () => {
  const [loginUser, setLoginUser] = useRecoilState<User | null>(loginUserState);
  const setLoggedInStatus = useSetRecoilState<boolean>(loggedInStatusState);
  const [viewedUser, setViewedUser] = useRecoilState<User | null>(
    viewedUserState
  );
  const [followUser, setFollowUser] = useRecoilState(followUserState);

  // 新規登録、ログイン成功時の処理
  const handleSuccessfulAuthentication = (data: { user: User }) => {
    setLoggedInStatus(true);
    setLoginUser(data.user);
    updateFollowState(data.user.following);
  };

  // ログイン状態チェック
  const checkLoginStatus = (): Promise<boolean> => {
    return axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setLoginUser(response.data.user);
          updateFollowState(response.data.user.following);
          return true;
        } else {
          setLoggedInStatus(false);
          setLoginUser(null);
          // フォロー状態をfalseに初期化する
          if (response.data.user && response.data.user.following) {
            let newFollowState: { [key: number]: boolean } = { ...followUser };
            response.data.user.following.forEach((user: User) => {
              newFollowState[user.id] = false;
            });
            setFollowUser(newFollowState);
          }
          return false;
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
        return false;
      });
  };

  // ユーザー情報を取得する
  const handleGetUser = async (userId?: number) => {
    // ログインユーザー情報を更新する。
    const loginUserData = await getUser(undefined);
    // 現在のユーザー情報と取得したユーザーが異なる場合のみ更新する
    if (JSON.stringify(loginUser) !== JSON.stringify(loginUserData.data.user)) {
      setLoginUser(loginUserData.data.user);
    }
    // 閲覧ユーザー情報を更新する
    const viewedUserData = await getUser(userId);
    if (
      JSON.stringify(viewedUser) !== JSON.stringify(viewedUserData.data.user)
    ) {
      setViewedUser(viewedUserData.data.user);
    }
  };

  // フォロー状態がtrueのユーザーを更新する
  const updateFollowState = (followingUsers: User[] | undefined) => {
    if (followingUsers === undefined) return;
    const updatedFollowState = followingUsers?.reduce<{
      [key: number]: boolean;
    }>((acc, user) => {
      acc[user.id] = true;
      return acc;
    }, {});
    // 現在のfollowUserとupdatedFollowStateが異なる場合のみ更新する
    if (JSON.stringify(followUser) !== JSON.stringify(updatedFollowState)) {
      setFollowUser(updatedFollowState);
    }
  };

  return {
    handleSuccessfulAuthentication,
    checkLoginStatus,
    handleGetUser,
  };
};

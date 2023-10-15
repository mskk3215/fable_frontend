import { useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState, followUserState } from "../../store/atoms/userAtom";
import { getUser, getUserLogin } from "../../urls";
import { useGetRequestErrorAction } from "../error/useGetRequestErrorAction";
import { User } from "../../types/user";

export const useUsers = () => {
  // ログインユーザー情報
  const [loginUser, setLoginUser] = useRecoilState<User | undefined>(
    loginUserState
  );
  // 表示ユーザー情報
  const [viewedUser, setViewedUser] = useState<User | undefined>(undefined);
  // フォローユーザー情報
  const [followUser, setFollowUser] = useRecoilState(followUserState);

  // エラーハンドリング呼び出し
  useGetRequestErrorAction();

  // ログイン状態チェック
  const checkLoginStatus = async () => {
    const response = await getUserLogin();

    if (response.data.loggedIn) {
      setLoginUser(response.data.user);
      updateFollowState(response.data.user.following);
    } else {
      setLoginUser(undefined);
      // フォロー状態をfalseに初期化する
      if (response.data.user && response.data.user.following) {
        let newFollowState: { [key: number]: boolean } = { ...followUser };
        response.data.user.following.forEach((user: User) => {
          newFollowState[user.id] = false;
        });
        setFollowUser(newFollowState);
      }
    }
  };

  // ユーザー情報を取得する
  const handleGetUser = async (userId?: number) => {
    // ログインユーザー情報を更新する。
    const loginUserData = await getUser(undefined);
    // 現在のユーザー情報と取得したユーザーが異なる場合のみ更新する
    if (JSON.stringify(loginUser) !== JSON.stringify(loginUserData.data.user)) {
      setLoginUser(loginUserData.data.user);
    }
    // 表示ユーザー情報を更新する
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

  // フォロー状態の取得
  const isFollowed = (followedUserId: number) => {
    return followedUserId ? followUser[followedUserId] ?? false : false;
  };

  return {
    checkLoginStatus,
    handleGetUser,
    isFollowed,
    updateFollowState,
    viewedUser,
  };
};

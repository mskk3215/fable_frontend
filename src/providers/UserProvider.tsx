import React, { createContext, useState } from "react";
import axios from "axios";
import { getUser, logged_inUrl } from "../urls";
import { User, UserContextType, UserProviderProps } from "../types/user";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  viewedUser: null,
  loggedInStatus: false,
  setLoggedInStatus: () => {},
  handleSuccessfulAuthentication: () => {},
  checkLoginStatus: () => Promise.resolve(false),
  handleGetUser: () => {},
  isFollowed: false,
  setIsFollowed: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);

  // 新規登録、ログイン成功時の処理
  const handleSuccessfulAuthentication = (data: { user: User }) => {
    setLoggedInStatus(true);
    setUser(data.user);
  };

  // ログイン状態チェック
  const checkLoginStatus = (): Promise<boolean> => {
    return axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setUser(response.data.user);
          return true;
        } else {
          setLoggedInStatus(false);
          setUser(null);
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedInStatus,
        setLoggedInStatus,
        handleSuccessfulAuthentication,
        checkLoginStatus,
        handleGetUser,
        viewedUser,
        isFollowed,
        setIsFollowed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

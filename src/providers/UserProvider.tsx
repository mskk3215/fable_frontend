import React, { createContext, useState } from "react";
import axios from "axios";
import { logged_inUrl } from "../urls";
import { UserContextType, UserProviderProps } from "../types/user";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedInStatus: false,
  setLoggedInStatus: () => {},
  handleSuccessfulAuthentication: () => {},
  checkLoginStatus: () => Promise.resolve(false),
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState("");
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  const handleSuccessfulAuthentication = (data: {
    user: { nickname: string };
  }) => {
    setLoggedInStatus(true);
    setUser(data.user.nickname);
  };

  const checkLoginStatus = (): Promise<boolean> => {
    return axios
      .get(logged_inUrl, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          setLoggedInStatus(true);
          setUser(response.data.user.nickname);
          return true;
        } else {
          setLoggedInStatus(false);
          setUser("");
          return false;
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
        return false;
      });
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

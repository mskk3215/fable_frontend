import React, { createContext, useEffect, useState } from "react";
import { UserContextType, UserProviderProps } from "../types/user";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedInStatus: false,
  setLoggedInStatus: () => {},
  handleSuccessfulAuthentication: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState("");
  const [loggedInStatus, setLoggedInStatus] = useState(() => {
    const savedStatus = localStorage.getItem("loggedInStatus");
    return savedStatus ? JSON.parse(savedStatus) : false;
  });

  useEffect(() => {
    localStorage.setItem("loggedInStatus", JSON.stringify(loggedInStatus));
  }, [loggedInStatus]);

  const handleSuccessfulAuthentication = (data: {
    user: { nickname: string };
  }) => {
    setLoggedInStatus(true);
    setUser(data.user.nickname);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loggedInStatus,
        setLoggedInStatus,
        handleSuccessfulAuthentication,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

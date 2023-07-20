import React, { createContext, useState } from "react";
import { UserContextType, UserProviderProps } from "../types/user";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  loggedInStatus: false,
  setLoggedInStatus: () => {},
  handleSuccessfulAuthentication: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState("");

  const handleSuccessfulAuthentication = (data: any) => {
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

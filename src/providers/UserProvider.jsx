import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;

  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState("");

  const handleSuccessfulAuthentication = (data) => {
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

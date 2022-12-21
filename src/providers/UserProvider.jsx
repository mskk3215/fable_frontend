import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;
  // const [userInfo, setUserInfo] = useState(null);

  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");

  return (
    <UserContext.Provider value={{ loggedInStatus, setLoggedInStatus }}>
      {children}
    </UserContext.Provider>
  );
};

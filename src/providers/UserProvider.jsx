import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children } = props;

  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, loggedInStatus, setLoggedInStatus }}
    >
      {children}
    </UserContext.Provider>
  );
};

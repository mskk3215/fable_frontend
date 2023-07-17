import React, { createContext, useState } from "react";

export const UserContext = createContext({});

export const UserProvider = (props: any) => {
  const { children } = props;

  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState("");

  const handleSuccessfulAuthentication = (data: any) => {
    setLoggedInStatus(true);
    setUser(data.user.nickname);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

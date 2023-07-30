import { ReactNode } from "react";

export type UserContextType = {
  user: string | null;
  setUser: (user: string) => void;
  loggedInStatus: boolean;
  setLoggedInStatus: (loggedInStatus: boolean) => void;
  handleSuccessfulAuthentication: (data: {
    user: { nickname: string };
  }) => void;
  checkLoginStatus: () => void;
};
export type UserProviderProps = {
  children: ReactNode;
};

export type LoginAuthAction = {
  email: string;
  password: string;
  setErrors?: (errors: string[]) => void | undefined;
};

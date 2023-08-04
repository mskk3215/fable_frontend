import { ReactNode } from "react";

export type User = {
  id: number;
  nickname: string;
  email: string;
  avatar: File | null;
};

export type UserPasswordForm = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loggedInStatus: boolean;
  setLoggedInStatus: (loggedInStatus: boolean) => void;
  handleSuccessfulAuthentication: (data: { user: User }) => void;
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

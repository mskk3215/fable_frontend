import { ReactNode } from "react";

export type User = {
  id: number;
  nickname: string;
  email: string;
  avatar: File | null;
  following: User[];
};

export type UserProfileForm = Omit<User, "id" | "following"> & {};

export type UserPasswordForm = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  viewedUser: User | null;
  loggedInStatus: boolean;
  setLoggedInStatus: (loggedInStatus: boolean) => void;
  handleSuccessfulAuthentication: (data: { user: User }) => void;
  checkLoginStatus: () => void;
  handleGetUser: (userId: number | undefined) => void;
  isFollowed: boolean;
  setIsFollowed: (isFollowed: boolean) => void;
};
export type UserProviderProps = {
  children: ReactNode;
};

export type LoginAuthAction = {
  email: string;
  password: string;
  setErrors?: (errors: string[]) => void | undefined;
};

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

export type UserRegistrationForm = {
  user: {
    nickname: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
};

export type LoginAuthAction = {
  email: string;
  password: string;
  setErrors?: (errors: string[]) => void | undefined;
};

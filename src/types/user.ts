export type User = {
  id: number;
  nickname: string;
  email?: string;
  avatar?: File;
  following: User[];
};

export type UserProfileForm = Omit<User, "id" | "following">;

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
    passwordConfirmation: string;
  };
};

export type UserLoginForm = {
  session: {
    email: string;
    password: string;
  };
};

export type RegistrationAuthAction = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  setErrors: (errors: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export type LoginAuthAction = {
  email: string;
  password: string;
  setErrors: (errors: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isGuest?: boolean;
};

export type userProfile = {
  loginUser: User;
  setLoginUser: (user: User) => void;
  profileData: FormData;
  setErrors: (errors: string[]) => void;
  isPasswordChange: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setUploadProfileProgress: (progress: number) => void;
};

import { User } from "./user";

export type AuthResponse = {
  data: {
    registered?: boolean;
    loggedIn?: boolean;
    user: User;
  };
};

export type ApiError = {
  message: string;
  code?: string;
  response?: {
    status: number;
    data: {
      error: string[];
      errorMessages: string;
    };
  };
  errorMessage: string | string[];
};

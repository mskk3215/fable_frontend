import { User } from "./user";

export type AuthResponse = {
  data: {
    registered?: boolean;
    loggedIn?: boolean;
    user: User;
  };
};

export type ApiError = {
  response?: {
    status: number;
    data: {
      errors: string[];
      errorMessages: string;
    };
  };
};

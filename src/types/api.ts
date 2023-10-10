import { User } from "./user";

export type ApiResponse = {
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

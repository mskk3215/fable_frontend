import { User } from "./user";

export type ApiResponse = {
  data: {
    registered?: boolean;
    logged_in?: boolean;
    user: User;
  };
};

export type ApiError = {
  response?: {
    status: number;
    data: {
      errors: string[];
    };
  };
};

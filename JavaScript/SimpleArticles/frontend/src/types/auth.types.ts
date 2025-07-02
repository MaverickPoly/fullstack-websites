import type { ArticleType } from "./article.types.ts";

export interface AuthContextType {
  accessToken: string | null;
  user: UserType | null;
  loading: boolean;

  login: (params: LoginType) => Promise<ReturnType>;
  register: (params: RegisterType) => Promise<ReturnType>;
  fetchMe: () => Promise<ReturnType>;
  logout: () => Promise<ReturnType>;
  fetchUserProfile: (userId: string) => Promise<UserReturnType>;
}

export interface UserType {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  articles: ArticleType[];
}

export interface ReturnType {
  success: boolean;
  message: string;
}

export interface UserReturnType {
  data?: UserType;
  success: boolean;
  message: string;
}

// Function Interfaces
export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  username: string;
  email: string;
  password: string;
}

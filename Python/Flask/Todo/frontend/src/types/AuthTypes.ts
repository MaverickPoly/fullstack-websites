export interface UserType {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface BaseReturnType {
    success: boolean;
    message: string;
}

export interface AuthContextType {
    user: UserType | null;
    accessToken: string | null;
    login: (username: string, password: string) => Promise<BaseReturnType>;
    signup: (username: string, email: string, password: string) => Promise<BaseReturnType>;
    logout: () => Promise<BaseReturnType>;
}
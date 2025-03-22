import { ApiReturnPayload, UserType } from "./general.types";

export interface LoginPayload {
    username: string,
    password: string,
}

export interface RegisterPayload {
    username: string,
    email: string,
    password: string
}

export interface ProfileFetchReturnPayload {
    success: boolean,
    message: string,
    user?: UserType
}

export interface AuthContextType {
    accessToken: string,
    userId: string,
    login: ({username, password}: LoginPayload) => Promise<ApiReturnPayload>,
    register: ({username, email, password}: RegisterPayload) => Promise<ApiReturnPayload>,
    logout: () => void,
    fetchProfile: () => Promise<ProfileFetchReturnPayload>,
}

import * as React from "react";

export interface User {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReturnPayload {
    success: boolean;
    message: string;
}

export interface AuthContextPayload {
    user: User | null;
    accessToken: string | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (username: string, password: string) => Promise<ReturnPayload>;
    register: (username: string, email: string, password: string) => Promise<ReturnPayload>;
    logout: () => Promise<ReturnPayload>;
}

import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextType, LoginPayload, RegisterPayload } from "../types";
import { accessTokenName, API_URL, refreshTokenName, userIdName } from "../constants";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/*
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0MzE3NDA3MSwiaWF0IjoxNzQyNTY5MjcxLCJqdGkiOiIxMDYyMTIwYmU5YWM0MGFiYmY5ZTU4ZGFmOWQ3MjFkYiIsInVzZXJfaWQiOjJ9.LuPUGRoMWQjX4wAxrl1V7mB7Hqwb0Vs0sztWMuanGlw
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQyNTcyODcxLCJpYXQiOjE3NDI1NjkyNzEsImp0aSI6ImQ5MzBiNTM0YjU2NDQ4NjJiNDE1MGZhZTE4YjFmNDU4IiwidXNlcl9pZCI6Mn0.3Dny164G3rCEC6GAajYcOXylM06glUOrGfajCJ8iF-c
*/


export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [accessToken, setAccessToken]= useState(localStorage.getItem(accessTokenName) || "");
    const [userId, setUserId] = useState(localStorage.getItem(userIdName) || "");

    const login = async ({username, password}: LoginPayload) => {
        try {
            const response = await axios.post(`${API_URL}/token/`, {
                username, password
            });

            // Tokens
            const {access, refresh}: {access: string, refresh: string} = response.data;

            localStorage.setItem(accessTokenName, access);
            localStorage.setItem(refreshTokenName, refresh);
            setAccessToken(access);

            const responseUser = await axios.get(`${API_URL}/user/profile/`, {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            });

            // User ID
            const {id} = responseUser.data;
            localStorage.setItem(userIdName, id);
            setUserId(id);

            return {success: true, message: "Logged in successfully!"};
        } catch (error) {
            console.error(`Error logging in: ${error}`);
            return {success: false, message: "Login failed!"};
        }
    }

    const register = async ({username, email, password}: RegisterPayload)  => {
        try {
            const response = await axios.post(`${API_URL}/register/`, {
                username, email, password
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const user = response.data;
            console.log(`User Registered:`);
            console.log(user)

            return {success: true, message: "Registered successfully!"};
        } catch (error: any) {
            console.error(`Error Registering: ${error}`);
            if (error.response) {
                console.error("Error details:", error.response.data);
                return {
                    success: false, 
                    message: JSON.stringify(error.response.data)
                };
            }
            return {success: false, message: "Error Registering"};
        }
    }

    const logout = () => {
        localStorage.removeItem(accessTokenName);
        localStorage.removeItem(refreshTokenName);
        localStorage.removeItem(userIdName);
        setAccessToken("");
        setUserId("");
    }

    const fetchProfile = async () => {
        try {
        const response = await axiosInstance.get(`${API_URL}/user/profile/`);
        const user = response.data;
        return {success: true, message: "Fetched profile successfully!", user: user};
        } catch (error) {
            console.error(`Error fetching profile: ${error}`);
            return {success: false, message: "Error fetching profile!"};
        }
    }

    return <AuthContext.Provider value={{accessToken, userId, login, register, logout, fetchProfile}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("You have to wrap your app with AuthProvider!");
    }
    return context;
}
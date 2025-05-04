import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AuthContextType, UserType} from "../types/AuthTypes.ts";
import {api} from "../util/axios.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken") || null);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get("/auth/me");
            setUser(res.data.data);
        } catch (error: any) {
            setUser(null);
            setAccessToken(null);
            localStorage.removeItem("accessToken");
            console.error(`Error fetching user profile: ${error.response.data.message || error} `);
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const res = await api.post("/auth/login", {
                username, password
            });
            localStorage.setItem("accessToken", res.data.access_token);
            setAccessToken(res.data.access_token);
            await fetchUser();
            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Login failed!"}
        }
    }

    const signup = async (username: string, email: string, password: string) => {
        try {
            const res = await api.post("/auth/register", {
                username, email, password
            });
            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Login failed!"}
        }
    }

    const logout = async () => {
        try {
            const res = await api.post("/auth/logout");

            setUser(null);
            setAccessToken(null);
            localStorage.removeItem("accessToken");

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Login failed!"}
        }
    }


    return <AuthContext.Provider value={{user, accessToken, login, signup, logout}}>{children}</AuthContext.Provider>;
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within useAuth");
    }
    return context;
}

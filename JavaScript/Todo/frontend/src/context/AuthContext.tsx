import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AuthContextPayload, User} from "../types/auth.types.ts";
import {api} from "../lib/axios.ts";

const AuthContext = createContext<AuthContextPayload | undefined>(undefined);


export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken") || null);

    useEffect(() => {
        const fetch = async () => {
            await fetchUser();
        }
        fetch();
    }, []);

// Fetch User Data
const fetchUser = async () => {
    try {
        const res = await api.get("/auth/me");
        setUser(res.data);
    } catch (error: any) {
        localStorage.removeItem("accessToken");
        setUser(null);
        setAccessToken(null);
        console.error(`Error fetching user data: ${error}`);
    }
}

// Login
const login = async (username: string, password: string) => {
    try {
        const res = await api.post("/auth/login", {
            username, password,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        setAccessToken(res.data.accessToken);
        await fetchUser();

        return {success: true, message: res.data.message};
    } catch (error: any) {
        return {success: false, message: error?.response?.data?.message || "Login failed!"};
    }
}

// Register
const register = async (username: string, email: string, password: string) => {
    try {
        const res = await api.post("/auth/register", {
            username, email, password,
        });

        return {success: true, message: res.data.message};
    } catch (error: any) {
        return {success: false, message: error?.response?.data?.message || "Registration failed!"};
    }
}

// Logout
const logout = async () => {
    try {
        const res = await api.get("/auth/logout");

        setUser(null);
        setAccessToken(null);

        return {success: true, message: res.data.message};
    } catch (error: any) {
        return {success: false, message: error?.response?.data?.message || "Failed to Logout!"};
    }
}


return <AuthContext.Provider
    value={{user, setUser, accessToken, login, register, logout}}>{children}</AuthContext.Provider>
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be within AuthProvider!");
    }
    return context;
}
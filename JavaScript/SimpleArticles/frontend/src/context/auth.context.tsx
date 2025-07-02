import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type {
  AuthContextType,
  LoginType,
  RegisterType,
  UserType,
} from "../types";
import { api } from "../util/axios.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken") || null,
  );
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { success } = await fetchMe();
      if (!success) {
        localStorage.removeItem("accessToken");
        setUser(null);
        setAccessToken(null);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const login = async (params: LoginType) => {
    try {
      const res = await api.post("/auth/login", params);
      setAccessToken(res.data.accessToken);
      localStorage.setItem("accessToken", res.data.accessToken);

      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error logging in..",
      };
    }
  };

  const register = async (params: RegisterType) => {
    try {
      const res = await api.post("/auth/register", params);
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error registering!",
      };
    }
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      console.log(res.data.data);
      setUser(res.data.data);
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error fetching my profile!",
      };
    }
  };

  const logout = async () => {
    try {
      const res = await api.get("/auth/logout");
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("accessToken");
      return { success: true, message: res.data.message };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error logging out!",
      };
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      const res = await api.get(`/auth/users/${userId}`);
      return { success: true, message: res.data.message, data: res.data.data };
    } catch (e: any) {
      return {
        success: false,
        message: e?.response?.data.message || "Error fetching user profile!",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        loading,
        login,
        register,
        fetchMe,
        logout,
        fetchUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within useAuth");
  }
  return context;
};

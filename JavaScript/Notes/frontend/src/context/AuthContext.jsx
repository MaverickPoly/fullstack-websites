import { createContext, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import { useToast } from "./ToastContext";
console.log("BACKEND_ULR: " + BACKEND_URL);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || ""
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const { errorToast } = useToast();

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.token);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setAccessToken(response.data.token);
      setUser(response.data.user);
      return { success: true, message: response.data.message };
    } catch (error) {
      errorToast("Invalid credentials!");
      return { success: false, message: "Invalid credentials!" };
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log(`${BACKEND_URL}/api/auth/register`);
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        username,
        email,
        password,
      });
      console.log("Registered");
      return {
        success: true,
        message: response.data.message,
        user: response.data.data,
      };
    } catch (error) {
      console.log(error.message);
      return { success: false, message: error.response.data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setAccessToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

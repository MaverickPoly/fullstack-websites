import { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/backend";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("access_token") || ""
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setToken(response.data.access_token);
      setUser(response.data.user);
      return { success: true, message: response.data.message };
    } catch (error) {
      alert("Invalid credentials!");
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setToken("");
    setUser("");
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
          },
        }
      );
      localStorage.setItem("access_token", response.data.access_token);
      setToken(response.data.access_token);
      return response.data.access_token;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

import axios from "axios";
import { API_URL } from "../constants/backend";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

const refreshAccessToken = async () => {
    try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) throw new Error("No refresh token available");

        const response = await axios.post(`${API_URL}/refresh`, {}, {
            headers: { Authorization: `Bearer ${refresh_token}` }
        });

        const newAccessToken = response.data.access_token;
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh access token", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect to login on failure
        return null;
    }
};

axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        } else {
            console.warn("No access token found in localstorage!");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(error.config);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

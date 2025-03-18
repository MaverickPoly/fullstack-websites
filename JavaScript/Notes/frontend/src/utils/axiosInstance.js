import axios from "axios";
import { BACKEND_URL } from "../constants";


const refreshAccessToken = async () => {
    try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) throw new Error("No reefresh token available!");

        const response = await axios.post(`${BACKEND_URL}/auth/token/refresh`, {}, { headers: { Authorization: `Bearer ${refresh_token}` } });

        const newAccessToken = response.data.token;
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Failed to refresh Access Token", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return null;
    }
};


const axiosInstace = axios.create({
    baseURL: `${BACKEND_URL}/`,
    headers: {
        "Content-Type": "application/json",
    }
});


axiosInstace.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn("No access token found in local storage!");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstace.interceptors.response.use(
    (response) => (response),
    async (error) => {
        if (error.response.status === 403) {
            const newToken = await refreshAccessToken();
            if (newToken) {
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstace(error.config);
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstace;

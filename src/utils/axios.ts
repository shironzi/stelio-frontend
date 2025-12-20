
/**
 * Axios Instance Configuration
 * -----------------------------
 * This file creates a pre-configured Axios instance (`api`) that automatically:
 *
 * 1. Sets a base URL for all requests (from environment variables).
 * 2. Attaches the JWT token (if present in localStorage) to every request.
 * 3. Handles common API errors globally (e.g., 401 Unauthorized).
 *
 * Usage:
 *   import api from "./axios";
 *
 *   // Example request
 *   const res = await api.get("/users");
 *
 * Environment:
 *   - Requires REACT_APP_BASE_URL in `.env`
 *     Example: REACT_APP_BASE_URL=http://localhost:8080/api
 */

import axios, { AxiosError } from 'axios'

// Create axios instance with the base url
const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

/**
 * Request Interceptors
 * ------------------------
 * Runs before every request.
 * - Get token from the localstorage
 * - if token exists, setting the headers authorization with the bearer and token
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const currentPage = window.location.pathname;

        if (token && (currentPage === "/login" || currentPage === "/register")) {
            window.location.href = "/";
        }

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        if (!config.headers['Content-Type']) {
            if (config.data instanceof FormData) {
                config.headers['Content-Type'] = "multipart/form-data";
            } else {
                config.headers['Content-Type'] = "application/json";
            }
        }

        console.log(config)

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptions
 * ----------------------------
 * Runs on every response.
 * - if the response is successful -> just pass through.
 * - if the response is 401 (unanthorized):
 *  - Removes the token from the local storage (invalid/expired).
 *  - Redirect to login page.
 */

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {

        if (!error.response) {
            console.error("🌐 No internet connection or server not reachable.");
        } else if (error.response?.status === 401) {
            const currentPage = window.location.pathname;

            if (currentPage !== "/" && currentPage !== "/login") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            };
        } else if (error.response?.status === 404) {
            window.location.href = "/404";
        } else if (error.response?.status >= 500) {
            console.error("Something went wrong. Please try again later.");
        }
        return Promise.reject(error);
    }
);

export default api;
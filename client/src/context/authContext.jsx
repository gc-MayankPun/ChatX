import {
  createContext,
  use,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useMemo } from "react";
import { axiosInstance } from "../api/axiosInstance";
import axios from "axios"; 

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [token, setToken] = useState(null);

  const verifyAuth = async () => {
    try {
      // First try refreshing the token
      const refreshedToken = await getRefreshToken();

      if (!refreshedToken) {
        setToken(null);
        return;
      }

      // Save the token
      setToken(refreshedToken);

      // Now verify auth
      await axiosInstance({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_BASE_URL}/`,
        headers: {
          Authorization: `Bearer ${refreshedToken}`,
        },
      });
    } catch (error) {
      setToken(null);
    } finally {
      setAuthLoading(false); // Always stop loading
    }
  };

  const getRefreshToken = async () => {
    try {
      const data = await axiosInstance({
        method: "get",
        url: `${import.meta.env.VITE_SERVER_BASE_URL}/refresh-token`,
      });

      return data.accessToken;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && token
          ? `Bearer ${token}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error?.response &&
          ((error.response.status === 403 &&
            error.response.data.message === "Unauthorized") ||
            (error.response.status === 401 &&
              error.response.data.message === "Token not provided"))
        ) {
          try {
            const { accessToken } = await axiosInstance({
              method: "get",
              url: `${import.meta.env.VITE_SERVER_BASE_URL}/refresh-token`,
            });

            setToken(accessToken);

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  const value = useMemo(
    () => ({ token, setToken, authLoading }),
    [token, setToken, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => use(AuthContext);

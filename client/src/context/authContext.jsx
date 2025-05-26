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

  useEffect(() => {
    const verifyAuth = async () => {
      console.log("Verify Auth Function");
      try {
        const response = await axiosInstance({
          method: "get",
          url: `${import.meta.env.VITE_SERVER_BASE_URL}/`,
        });
        if (response.data?.accessToken) {
          setToken(response.data.accessToken);
        } else {
          setToken(null);
        }
      } catch (error) {
        setToken(null);
      } finally {
        setAuthLoading(false);
      }
    };
    verifyAuth();
  }, []);

  useLayoutEffect(() => {
    console.log("Auth Interceptor");
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
    console.log("Refresh Interceptor");
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          (error.response.status === 401 || error.response.status === 403) &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const data = await axiosInstance({
              method: "get",
              url: `${import.meta.env.VITE_SERVER_BASE_URL}/refresh-token`,
            });

            setToken(data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
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
    [token, authLoading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => use(AuthContext);

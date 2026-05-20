import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { useAuthStore } from "@/stores/auth.store";
import type { AuthSession } from "@/features/auth/types/auth.types";

type AuthRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export const apiRawClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;

type QueuedRequest = {
  config: AuthRequestConfig;
  reject: (reason?: unknown) => void;
  resolve: (value: unknown) => void;
};

let failedQueue: QueuedRequest[] = [];

function isAuthRefreshBypass(url?: string) {
  if (!url) {
    return false;
  }

  return [
    API_ENDPOINTS.auth.login,
    API_ENDPOINTS.auth.signup,
    API_ENDPOINTS.auth.logout,
    API_ENDPOINTS.auth.refreshSession,
  ].some((endpoint) => url.endsWith(endpoint));
}

function processQueue(error: unknown | null) {
  failedQueue.forEach(({ config, reject, resolve }) => {
    if (error) {
      reject(error);
      return;
    }

    resolve(apiClient(config));
  });

  failedQueue = [];
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as AuthRequestConfig | undefined;

    if (!originalConfig || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (originalConfig._retry || isAuthRefreshBypass(originalConfig.url)) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ config: originalConfig, reject, resolve });
      });
    }

    isRefreshing = true;

    try {
      const response = await apiRawClient.post<ApiEnvelope<AuthSession>>(
        API_ENDPOINTS.auth.refreshSession,
      );
      const session = response.data.data;

      if (!session?.accessToken || !session.user) {
        throw new Error("Invalid refresh response");
      }

      useAuthStore.getState().setAuth(session);
      processQueue(null);

      return apiClient(originalConfig);
    } catch (refreshError) {
      processQueue(refreshError);
      useAuthStore.getState().clearAuth();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

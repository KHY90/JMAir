import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import authStore from './authStore';

axios.defaults.withCredentials = true;

let isRefreshing = false;

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { config, response } = error;
    if (!response || !config) {
      return Promise.reject(error);
    }
    const retryConfig = config as RetryConfig;
    if (response.status === 401 && !retryConfig._retry && !isRefreshing) {
      retryConfig._retry = true;
      try {
        isRefreshing = true;
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/current`,
          { withCredentials: true }
        );
        isRefreshing = false;
        if (res.data && res.data.user) {
          authStore.setUser(res.data.user);
          return axios(config);
        }
        authStore.logout();
      } catch (refreshError) {
        isRefreshing = false;
        authStore.logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
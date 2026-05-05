import axios, {
  AxiosError,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from "axios";

const URL = import.meta.env.DEV ? 'http://localhost:80/api': import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL: 'http://76.13.169.52/api',
});

api.interceptors.request.use((config) => {
  console.log(config.baseURL);

  return config;
});

export { api };

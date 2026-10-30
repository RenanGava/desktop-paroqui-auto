import axios, {
  AxiosError,
  AxiosInterceptorManager,
  InternalAxiosRequestConfig,
} from "axios";

const URL = import.meta.env.DEV ? 'http://localhost:1337/api': import.meta.env.API_URL

console.log(import.meta.env.DEV);
console.log(import.meta.env.API_URL);
console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: URL,
});

const publicURLs = [
  '/auth/local',
  '/auth/local/register'
]

api.interceptors.request.use((config) => {

  if(publicURLs.includes(config.url!)){
    return config
  }
  

  const jwt = window.localStorage.getItem('@jwt')
  config.headers.Authorization = `Bearer ${jwt}`
  
  return config;
})

api.interceptors.response.use( response => {
  response

  return response
}, (err: AxiosError) => {

  if(err.status === 401){
    console.log(err.status);
    
  }
  
  return Promise.reject(err)

})

export { api };

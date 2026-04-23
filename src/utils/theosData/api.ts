import axios, { AxiosError } from "axios";
import { getKey, setKey, clearKeys } from "../storage";

interface FailedRequestQueue {
  resolve: (token: string) => void;
  rejects: (error: AxiosError) => void;
}

let jwt = getKey("@jwtTheos");
let isRefreshing = false;
let failedQueue = Array<FailedRequestQueue>();

const theosApi = axios.create({
  baseURL: "http://producao4.theos.com.br",
  headers: {
    codigomenuweb: "1015",
    Authorization: `Bearer ${jwt}`,
  },
});

theosApi.interceptors.response.use(
  (config) => {
    console.log(config.config.url);
    
    return config;
  },
  async (error: AxiosError) => {
    
    if (error.response?.status === 401 || error.response?.status === 500) {
      const originalConfig = error.config;
      const theosData = new FormData();

      if (!isRefreshing) {
        isRefreshing = true;

        theosData.append("Email", "pvaguadalupe@gmail.com");
        theosData.append("Senha", "9882");
        axios
          .post(
            "http://eclesial.theos.com.br/EclesialIdentityHub/api/v1/Authentication",
            theosData,
          )
          .then((res) => {
            setKey("@jwtTheos", res.data.access_token);
            theosApi.defaults.headers.autorization = `Bearer ${res.data.access_token}`;
          })
          .catch((err) => {
            failedQueue.forEach((request) => {
              request.rejects(err);
            });

            failedQueue = [];
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise( (resolve, reject) => {

        failedQueue.push({
          resolve: (token: string) => {
            originalConfig!.headers.Authorization = `Bearer ${token}`

            resolve(theosApi(originalConfig!))
          },
          rejects: (err) =>{
            reject(err)
          }
        })
      })
    } else {
      return error
    }
  },
);

export { theosApi };

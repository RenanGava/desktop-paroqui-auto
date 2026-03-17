import axios from "axios";
import "dotenv/config";

const URL =
  process.env.NODE_ENV === "development"
    ? process.env.API_LOCAL_URL
    : process.env.API_URL;

const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use( config => {

    

    return config
})

export { api };

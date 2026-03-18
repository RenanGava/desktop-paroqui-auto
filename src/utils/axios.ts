import axios from "axios";


const URL = window.env.API_URL

const api = axios.create({
  baseURL: URL,
});

api.interceptors.request.use( config => {

    console.log(config.baseURL);
    
    return config
})

export { api };

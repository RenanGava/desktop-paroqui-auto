import axios, { AxiosError } from "axios";

const theosApi = axios.create({
  baseURL: "http://producao4.theos.com.br",
  headers:{
    "codigomenuweb": '1015'
  }
});

theosApi.interceptors.request.use(
  async (request) => {
    const theosData = new FormData()

    theosData.append('Email', 'pvaguadalupe@gmail.com')
    theosData.append('Senha', '1109')
    const theosLogin = await axios.post(
      "http://eclesial.theos.com.br/EclesialIdentityHub/api/v1/Authentication",
      theosData
    );
    console.log(theosLogin.data.access_token);
    request.headers.Authorization = `Bearer ${theosLogin.data.access_token}`
    
    return request;
  },
  (err: AxiosError) => {
    return err;
  },
);

export { theosApi }
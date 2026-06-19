import { theosApi } from "../../../utils/theosData/api";
import dayjs from "dayjs";






async function getDizimistaId() {

    const dizimistaId = await theosApi.get('/EclesialFieisCadastros/api/v1/Fiel/obtercodigodizimista/2919')

    const isValid = await theosApi.get(`https://producao4.theos.com.br/EclesialFieisCadastros/api/v1/Fiel/validarcodigodizimista/${dizimistaId.data}/0/2919`)


    return dizimistaId.data as number
    
}


async function createFieis(data: FielProps) {
    const dizId = await getDizimistaId()
    const dataCadastro = dayjs(new Date()).format('YYYY-M-DD')
    
    console.log(data);
    


    const fieis = await theosApi.post('/EclesialFieisCadastros/api/v1/Fiel',
        {
            "id": 0,
            "organismo": null,
            "nome": data.nome,
            "sexo": data.sexo,
            "cpf": data.cpf,
            "rg": null,
            "comunidade": {
                "id": data.comunidade.theosId,
                "nome": data.comunidade.nome
            },
            "ehDizimista": true,
            "dizimistaId": dizId,
            "dataCadastro": dataCadastro
        }
    )

    return {...data, dizimistaId: dizId.toString()} as FielProps
    
}




export { createFieis }
import { theosApi } from "../../../utils/theosData/api";





async function createFieis(data: FielProps) {


    const fieis = await theosApi.post('/EclesialFieisCadastros/api/v1/Fiel',
        {
            "id": 0,
            "organismo": null,
            "nome": data.nome,
            "sexo": data.sexo,
            "cpf": data.cpf,
            "rg": null,
            "dataNascimento": "2001-10-26",
            "comunidade": {
                "id": data.comunidade.theosId,
                "nome": data.comunidade.nome
            },
            "ehDizimista": true,
            "dizimistaId": 456,
            "dataCadastro": "2025-7-17"
        }
    )
}




export { createFieis }
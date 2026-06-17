import { theosApi } from "../../../utils/theosData/api";





async function createFieis(data: any) {


    const fieis = await theosApi.post('/EclesialFieisCadastros/api/v1/Fiel',
        {
            "id": 0,
            "organismo": null,
            "nome": "Gabriela Servo",
            "sexo": "F",
            "cpf": "17680108706",
            "rg": null,
            "dataNascimento": "2001-10-26",
            "comunidade": {
                "id": 46141,
                "nome": "MATRIZ"
            },
            "ehDizimista": true,
            "dizimistaId": 456,
            "dataCadastro": "2025-7-17"
        }
    )
}




export { createFieis }
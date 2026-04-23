import { theosApi } from "../../../utils/theosData/api";

async function calcNumberPages(itensPerPage: number) {
  const { data } = await theosApi.post(
    "/EclesialParoquia/api/v1/fiel/searchPaged",
    {
      filters: [
        {
          property: "Nome",
          condition: 1,
          value: null,
        },

        {
          condition: 0,
          property: "OrganismoId",
          value: "2919",
        },
      ],
      sortParameters: [
        {
          fieldName: "NOME",
          reverse: false,
        },
      ],
      showInactives: false,
      pageSize: itensPerPage,
      pageNumber: 1,
    },
  )

  return Math.ceil(data.totalRows / itensPerPage)
}

async function reqTheosFieis(itensPerPage: number, page: number) {
  const { data } = await theosApi.post(
    "/EclesialParoquia/api/v1/fiel/searchPaged",
    {
      filters: [
        {
          property: "Nome",
          condition: 1,
          value: null,
        },

        {
          condition: 0,
          property: "OrganismoId",
          value: "2919",
        },
      ],
      sortParameters: [
        {
          fieldName: "NOME",
          reverse: false,
        },
      ],
      showInactives: false,
      pageSize: itensPerPage,
      pageNumber: page,
    },
  )

  return data.data as Array<any>
}

export async function requestFieis() {

    const totalPages = await calcNumberPages(50)

    const listAllFieis:IListFiel[] = []


    for(let i = 1; i <= totalPages; i++){
        const fieisTheos = await reqTheosFieis(50, i)

        fieisTheos.map( (fiel, index) => {

            
            if(fiel.dizimistaId !== null && fiel.dataNascimento !== null){
                const date = fiel.dataNascimento.split('/')
    
                const formatedDate = `${date[2]}-${date[1]}-${date[0]}`
                listAllFieis.push({
                dizimistaId: fiel.dizimistaId,
                cpf: fiel.cnpjCpf,
                nome: fiel.nome,
                data_nascimento: formatedDate,
                comunidadeTheosId: fiel.comunidadeId.toString()
            })}
        })
        
    }
    


  return listAllFieis
}
